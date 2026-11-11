# RAPPORT TECHNIQUE — MISSION DE SÉCURISATION (PHASE 1)
**Projet :** PRIORITY / ILLEGAL STREETWEAR  
**Domaine :** [https://priority-illegal.com](https://priority-illegal.com)  
**Portail d'Administration :** [https://priority-illegal.com/admin](https://priority-illegal.com/admin)  
**Date :** 30 Octobre 2026  
**Branche de travail :** `main`  
**Commit de référence :** `5d786cb`

---

## SECTION A — RÉSUMÉ EXÉCUTIF
La **Phase 1 de sécurisation** de l'application e-commerce PRIORITY / ILLEGAL Streetwear a été menée avec succès sans perturber le catalogue commercial, ni modifier les prix, ni altérer le design existant.

### Principaux acquis de la Phase 1 :
1. **Éradication totale des vulnérabilités d'authentification :**
   - Suppression du fallback d'authentification local et du mot de passe par défaut historique `admin123`.
   - Suppression de toute confiance accordée à une simple adresse email ou à `user_metadata`.
   - Validation stricte et exclusive du privilège administrateur via `app_metadata.role IN ('admin', 'ROLE_ADMIN')` sous Supabase Auth.
   - Ajout d'une protection anti brute-force avec blocage progressif (rate limiting).
2. **Durcissement complet de la base de données Supabase PostgreSQL (RLS) :**
   - Élaboration d'une nouvelle migration corrective non destructive : [`supabase/migrations/20261030_phase1_security_hardening.sql`](file:///Users/ulrichcarmelaiki/Desktop/priority/supabase/migrations/20261030_phase1_security_hardening.sql).
   - Purge dynamique de toutes les anciennes politiques permissives (`USING (true)` / `WITH CHECK (true)`) sur les **13 tables** via `pg_policies`.
   - Application de `FORCE ROW LEVEL SECURITY` sur les 13 tables.
   - Création de fonctions RPC `SECURITY DEFINER` avec `SET search_path = public` étanches pour la boutique publique (`verify_reseller_code` et `create_store_order`), évitant toute fuite d'informations personnelles (email, téléphone, comptes bancaires/Mobile Money).
3. **Sécurisation de la fonction Serverless Vercel (`api/decrement-stock.js`) :**
   - Élimination des identifiants admin en dur (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `admin123`).
   - Utilisation exclusive de la variable serveur `SUPABASE_SERVICE_ROLE_KEY`.
   - Restriction stricte des en-têtes CORS aux origines autorisées (`priority-illegal.com`, `www.priority-illegal.com`, environnements locaux).
   - Validation stricte des charges utiles (POST uniquement, quantités 1..10, max 25 articles) et limitation de débit par IP.
4. **Protection des secrets et hygiène du dépôt :**
   - Création du modèle standardisé [`.env.example`](file:///Users/ulrichcarmelaiki/Desktop/priority/.env.example) sans secret exposé.
   - Mise à jour du fichier [`.gitignore`](file:///Users/ulrichcarmelaiki/Desktop/priority/.gitignore) pour exclure tous les fichiers `.env*`, archives `*.zip`, `*.tar.gz`, et dumps de bases.
   - Nettoyage automatique des secrets dans le journal d'audit (`password`, `jwt`, `apiKey`, `service_role`).
5. **Couverture de tests :**
   - Réussite à 100 % de la suite de tests automatisés (24/24 tests passés, dont 6 nouveaux tests de sécurité spécifiques à la Phase 1).

---

## SECTION B — DÉTAIL DES ACTIONS RÉALISÉES PAR TÂCHE

### TÂCHE A — Authentification Administrateur
- **Fichier modifié :** [`admin/assets/js/admin-auth.js`](file:///Users/ulrichcarmelaiki/Desktop/priority/admin/assets/js/admin-auth.js)
- **Modifications apportées :**
  - Suppression de la méthode `_localFallbackLogin` et suppression de tout jeton fictif généré côté client (`tok_admin_local_...`).
  - Suppression de la vérification laxiste basée uniquement sur l'adresse email.
  - Implémentation de la fonction `hasServerAdminRole(supabaseUser)` vérifiant strictement `app_metadata.role IN ('admin', 'ROLE_ADMIN')`.
  - Implémentation du rate limiter `checkLoginRateLimit(email)` et `recordFailedLoginAttempt(email)` (verrouillage temporaire de 15 minutes après 5 échecs consécutifs).
  - Renouvellement et vérification en temps réel de la session auprès de Supabase Auth lors de chaque initialisation (`init()`, `refreshSession()`, `isAuthenticatedAsync()`).
  - Déconnexion automatique immédiate si le rôle serveur est révoqué ou si la session est expirée.

### TÂCHE B — Sécurité Supabase RLS
- **Fichier créé :** [`supabase/migrations/20261030_phase1_security_hardening.sql`](file:///Users/ulrichcarmelaiki/Desktop/priority/supabase/migrations/20261030_phase1_security_hardening.sql)
- **Règles établies :**
  - **Purge exhaustive :** Bloc PL/pgSQL dynamique scannant `pg_policies` pour supprimer toutes les anciennes politiques sur les 13 tables cibles (`products`, `orders`, `resellers`, `commissions`, `payout_requests`, `payout_items`, `payments`, `settings`, `audit_log`, `commission_adjustments`, `newsletter_subscribers`, `vip_subscribers`, `admin_profiles`).
  - **FORCE RLS :** Application de `FORCE ROW LEVEL SECURITY` sur chaque table afin de garantir qu'aucun rôle applicatif ne contourne les règles.
  - **Fonction `public.is_admin()` durcie :**
    ```sql
    CREATE OR REPLACE FUNCTION public.is_admin()
    RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
      SELECT COALESCE(
        (auth.jwt() ->> 'role') = 'service_role'
        OR (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'ROLE_ADMIN'),
        false
      );
    $$;
    ```
  - **Fonction RPC `verify_reseller_code(p_code)` :** Permet à la boutique de valider un code partenaire sans exposer le tableau `resellers` complet ni les colonnes privées (`email`, `phone`, `payout_account`).
  - **Fonction RPC `create_store_order(...)` :** Permet la création transactionnelle des commandes invitées avec attribution de commission et vérification stricte anti-auto-commission sans accorder de droits de lecture ou de mise à jour directs sur `orders` ou `commissions`.
  - **Politiques minimales :**
    - `products` : Lecture publique (`SELECT`), modifications réservées à `public.is_admin()`.
    - `resellers` : Lecture de profil réservée à `user_id = auth.uid()` ou à l'administrateur. Aucune lecture publique directe.
    - `orders` : Insertion guest checkout autorisée ; lecture et gestion restreintes à l'administrateur et aux revendeurs concernés.
    - `commissions`, `payout_requests`, `payout_items`, `payments`, `commission_adjustments` : Totalement inaccessibles au rôle `anon`.
    - `settings` : Lecture publique filtrée aux clés non sensibles (`min_payout_amount`, `default_reseller_rate`, etc.). Écriture réservée à l'administrateur.
    - `audit_log`, `newsletter_subscribers`, `vip_subscribers` : Lecture strictement réservée aux administrateurs.

### TÂCHE C — Sécurisation des API Vercel
- **Fichier modifié :** [`api/decrement-stock.js`](file:///Users/ulrichcarmelaiki/Desktop/priority/api/decrement-stock.js)
- **Modifications apportées :**
  - Retrait définitif des identifiants codés en dur (`admin@culture.store`, `admin123`).
  - Utilisation de la clé d'administration `process.env.SUPABASE_SERVICE_ROLE_KEY` avec arrêt d'urgence (`503 Service Unavailable`) si non configurée.
  - Restriction CORS aux domaines officiels `https://priority-illegal.com`, `https://www.priority-illegal.com` et localhost.
  - Vérification de la méthode HTTP (`POST` uniquement, retour `405 Method Not Allowed` sinon).
  - Rate limiting basé sur l'adresse IP cliente (`x-forwarded-for`) à un maximum de 10 requêtes par minute.
  - Validation stricte de chaque article (`id` non vide, quantité entière entre 1 et 10, limitation à 25 articles maximum par requête).

### TÂCHE D — Protection des Variables d'Environnement
- **Fichiers traités :**
  - [`.env.example`](file:///Users/ulrichcarmelaiki/Desktop/priority/.env.example) : Créé avec les variables requises documentées sans aucune valeur sensible.
  - [`.gitignore`](file:///Users/ulrichcarmelaiki/Desktop/priority/.gitignore) : Complété pour exclure `.env`, `.env.*`, archives `*.zip`, `*.tar.gz`, et dumps de bases de données.
  - [`env-config.js`](file:///Users/ulrichcarmelaiki/Desktop/priority/env-config.js) : Vérifié, ne contient que l'URL publique Supabase et la clé publique `anon`. Aucun PIN ou secret serveur n'y figure.

### TÂCHE E — Journalisation et Protection des Événements Sensibles
- **Fichiers modifiés :**
  - [`admin/assets/js/admin-auth.js`](file:///Users/ulrichcarmelaiki/Desktop/priority/admin/assets/js/admin-auth.js)
  - [`supabase-config.js`](file:///Users/ulrichcarmelaiki/Desktop/priority/supabase-config.js)
- **Modifications apportées :**
  - Ajout de la journalisation d'événements de sécurité : `ADMIN_LOGIN_SUCCESS`, `ADMIN_LOGIN_FAILED`, `ADMIN_ACCESS_DENIED_ROLE`, `ADMIN_LOGIN_RATE_LIMITED`, `ADMIN_LOGOUT`, `ADMIN_PASSWORD_UPDATED`.
  - Implémentation d'un filtre d'assainissement automatique (`sanitizeDetails`) qui remplace toute valeur associée à des clés sensibles (`password`, `secret`, `token`, `jwt`, `apiKey`, `service_role`, `pin`) par `[REDACTED]` avant écriture dans `audit_log`.

### TÂCHE F — Tests de Sécurité et Non-Régression
- **Fichiers modifiés :**
  - [`tests/test-suite.js`](file:///Users/ulrichcarmelaiki/Desktop/priority/tests/test-suite.js)
  - [`run-tests.js`](file:///Users/ulrichcarmelaiki/Desktop/priority/run-tests.js)
- **Résultats :** 24/24 tests réussis (18 tests fonctionnels existants préservés + 6 nouveaux tests de sécurité dédiés Phase 1).

---

## SECTION C — INVENTAIRE DE L'ÉTAT INITIAL DES TABLES & POLITIQUES
Avant l'intervention, l'inventaire des migrations historiques révélait la présence de politiques permissives `USING (true)` / `WITH CHECK (true)` issues des premières phases de développement :

| Table | RLS Activé Initialement | Vulnérabilités Identifiées |
| :--- | :---: | :--- |
| `products` | Oui | Lecture publique ok, mais règles admin basées sur un `is_admin()` laxiste |
| `orders` | Oui | Politiques permissives `Allow anon orders select` et `Allow anon orders all` |
| `resellers` | Oui | Politique permissive `Allow anon resellers read` exposant emails et téléphones |
| `commissions` | Oui | Politique permissive `Allow anon commissions all` |
| `payout_requests` | Oui | Politique permissive `Allow anon payout_requests all` |
| `payout_items` | Oui | Politique permissive `Allow anon payout_items all` |
| `payments` | Oui | Risque d'accès anonyme si non explicitement restreint |
| `settings` | Oui | Accès non distingué entre paramètres publics et privés |
| `audit_log` | Oui | Risque d'insertion non contrôlée |
| `commission_adjustments` | Oui | Risque d'altération si RLS non forcé |
| `newsletter_subscribers` | Oui | Politique permissive `Allow anon newsletter select` permettant le vol d'emails |
| `vip_subscribers` | Oui | Politique permissive `Allow anon vip select` permettant le vol de numéros |
| `admin_profiles` | Oui | Absence d'isolation stricte sur `app_metadata` |

---

## SECTION D — NOUVELLES POLITIQUES RLS CRÉÉES

Toutes ces politiques sont consolidées dans la migration [`supabase/migrations/20261030_phase1_security_hardening.sql`](file:///Users/ulrichcarmelaiki/Desktop/priority/supabase/migrations/20261030_phase1_security_hardening.sql) :

```sql
-- 1. PRODUCTS
CREATE POLICY "products_public_select" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "products_admin_all" ON public.products FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 2. RESELLERS
CREATE POLICY "resellers_own_select" ON public.resellers FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "resellers_own_update" ON public.resellers FOR UPDATE TO authenticated USING (user_id = auth.uid() OR public.is_admin()) WITH CHECK (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "resellers_admin_insert" ON public.resellers FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "resellers_admin_delete" ON public.resellers FOR DELETE TO authenticated USING (public.is_admin());

-- 3. ORDERS
CREATE POLICY "orders_admin_all" ON public.orders FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "orders_reseller_select" ON public.orders FOR SELECT TO authenticated USING (reseller_id = public.get_my_reseller_id());
CREATE POLICY "orders_guest_insert" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (total_amount >= 0 AND id IS NOT NULL AND length(id) >= 3);

-- 4. COMMISSIONS
CREATE POLICY "commissions_admin_all" ON public.commissions FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "commissions_reseller_select" ON public.commissions FOR SELECT TO authenticated USING (reseller_id = public.get_my_reseller_id());

-- 5. PAYOUT_REQUESTS
CREATE POLICY "payout_requests_admin_all" ON public.payout_requests FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "payout_requests_reseller_select" ON public.payout_requests FOR SELECT TO authenticated USING (reseller_id = public.get_my_reseller_id());
CREATE POLICY "payout_requests_reseller_insert" ON public.payout_requests FOR INSERT TO authenticated WITH CHECK (reseller_id = public.get_my_reseller_id() AND amount > 0 AND status = 'PENDING');

-- 6. PAYOUT_ITEMS
CREATE POLICY "payout_items_admin_all" ON public.payout_items FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "payout_items_reseller_select" ON public.payout_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.payout_requests pr WHERE pr.id = payout_items.payout_request_id AND pr.reseller_id = public.get_my_reseller_id()));

-- 7. PAYMENTS
CREATE POLICY "payments_admin_all" ON public.payments FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 8. SETTINGS
CREATE POLICY "settings_public_select" ON public.settings FOR SELECT TO anon, authenticated USING (key IN ('min_payout_amount', 'default_reseller_rate', 'active_payment_gateway', 'store_name') OR public.is_admin());
CREATE POLICY "settings_admin_all" ON public.settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 9. AUDIT_LOG
CREATE POLICY "audit_log_admin_select" ON public.audit_log FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "audit_log_insert" ON public.audit_log FOR INSERT TO anon, authenticated WITH CHECK (action IS NOT NULL AND length(action) <= 128 AND target_entity IS NOT NULL);

-- 10. COMMISSION_ADJUSTMENTS
CREATE POLICY "commission_adjustments_admin_all" ON public.commission_adjustments FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 11. NEWSLETTER_SUBSCRIBERS
CREATE POLICY "newsletter_insert" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (email IS NOT NULL AND position('@' in email) > 1);
CREATE POLICY "newsletter_admin_select" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "newsletter_admin_all" ON public.newsletter_subscribers FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 12. VIP_SUBSCRIBERS
CREATE POLICY "vip_insert" ON public.vip_subscribers FOR INSERT TO anon, authenticated WITH CHECK (phone IS NOT NULL AND length(trim(phone)) >= 6);
CREATE POLICY "vip_admin_select" ON public.vip_subscribers FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "vip_admin_all" ON public.vip_subscribers FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 13. ADMIN_PROFILES
CREATE POLICY "admin_profiles_all" ON public.admin_profiles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admin_profiles_own_select" ON public.admin_profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
```

---

## SECTION E — ÉTAT DES SECRETS ET VARIABLES D'ENVIRONNEMENT

### Audit des fichiers du dépôt :
- **Fichiers HTML / JS clients :** Vérifiés. Ne contiennent aucune clé `service_role` ni mot de passe. Seules les configurations publiques (`SUPABASE_URL` et `SUPABASE_ANON_KEY`) sont exposées de manière licite.
- **Fichier `.env.example` :** Rédigé sans aucune valeur secrète.
- **Fichier `.gitignore` :** Verrouille désormais tout fichier `.env*`, archive compressée ou export de données.

### Variables requises sur Vercel :
1. `SUPABASE_URL` = `https://eodlhorzehhhssyduxpf.supabase.co`
2. `SUPABASE_ANON_KEY` = (Clé publique actuelle)
3. `SUPABASE_SERVICE_ROLE_KEY` = (Clé secrète de service générée par le tableau de bord Supabase dans `Project Settings > API > service_role key`)

---

## SECTION F — RÉSULTATS DÉTAILLÉS DES TESTS DE SÉCURITÉ

La commande d'exécution `npm test` produit le résultat suivant :
```
> culture-official-store@1.0.0 test
> node run-tests.js

Running automated tests...
🧪 =========================================================
🧪 DÉMARRAGE DE LA SUITE DE TESTS AUTOMATISÉS UNIFIÉE (RBAC & AUDIT)
🧪 =========================================================
✅ PASS | SCÉNARIO 1: Commande client sans code revendeur (Aucune commission attribuée)
✅ PASS | SCÉNARIO 2: Commande avec code valide MARIE01 (Commission = 3000 FCFA (PENDING))
✅ PASS | SCÉNARIO 3: Règle de non-réduction du tarif client (Prix client maintenu à 30000 FCFA)
✅ PASS | SCÉNARIO 4: Rejet code invalide & Accès non authentifié (401) (Code rejeté & Action admin bloquée 401)
✅ PASS | SCÉNARIO 5: Session revendeur & déduction automatique reseller_id (reseller_id déduit = 11111111-1111-1111-1111-111111111111)
✅ PASS | SCÉNARIO 6: Contrôle d'accès ROLE_ADMIN vs ROLE_RESELLER (Revendeur bloqué (403), Admin autorisé (200))
✅ PASS | SCÉNARIO 7: Isolation des données RBAC (Marie voit 1 commandes, Koffi voit 0)
✅ PASS | SCÉNARIO 16: Journalisation d'audit (audit_log) des actions Admin (Action enregistrée par admin-test-001 (COMMISSION_ADJUSTMENT))
✅ PASS | SCÉNARIO 18: Violation de propriété des données (403 Forbidden) (Vous n'avez pas l'autorisation d'accéder aux données d'un autre revendeur.)
✅ PASS | SCÉNARIO 24: Cycle de vie complet de l'authentification unifiée (Session Admin injectée ➔ Logout ➔ Login Revendeur ➔ Logout)
✅ PASS | SCÉNARIO 8: Commande Livrée ➔ Commission disponible (Statut de commission = AVAILABLE)
✅ PASS | SCÉNARIO 9: Commande Annulée ➔ Commission annulée (Statut de commission = CANCELLED)
✅ PASS | SCÉNARIO 10: Rejet sous le seuil minimum de retrait (Le montant minimum de retrait est de 10 000 FCFA.)
✅ PASS | SCÉNARIO 11: Validation Payout (Demande sous solde disponible ou déjà en traitement)
✅ PASS | SCÉNARIO 12: Basculement modulaire des passerelles de paiement (WhatsApp ↔ Bénin Mobile Money)
⚠️ AUTO-COMMISSION DÉTECTÉE ET BLOQUÉE pour MARIE01
✅ PASS | SCÉNARIO 20: Auto-commission interdite (Avenant F) (Auto-achat détecté et commission rejetée (0 FCFA))
✅ PASS | SCÉNARIO 21: Limitation de Débit / Rate Limiting (Avenant F) (Trop de tentatives de commande. Veuillez patienter 5 minutes.)
✅ PASS | SCÉNARIO 23: Base & Arrondi de commission (Avenant F) (12 345 FCFA @ 10% = 1235 FCFA (Arrondi au FCFA))
✅ PASS | PHASE 1 SÉCURITÉ: Rejet absolu du mot de passe admin123 (AdminAuth) (admin123 strictement interdit et rejeté)
✅ PASS | PHASE 1 SÉCURITÉ: Rejet session sans app_metadata admin vérifié (Session non vérifiée rejetée)
✅ PASS | PHASE 1 SÉCURITÉ: Nettoyage et rejet de session expirée (Session expirée purgée)
✅ PASS | PHASE 1 SÉCURITÉ: Rate-limiting brute force AdminAuth (Lockout après 5 échecs) (Blocage actif (retryAfter: 900s))
✅ PASS | PHASE 1 SÉCURITÉ: Masquage automatique des secrets dans audit_log (Mots de passe et tokens masqués avant persistance)
✅ PASS | PHASE 1 SÉCURITÉ: Validation statique SQL RLS (pg_policies purge, force RLS, RPCs) (Purge: true, ForceRLS: true, AppMeta: true)
🧪 =========================================================
🧪 RÉSULTAT FINAL: 24/24 TESTS RÉUSSIS (100% CONFORME)
🧪 =========================================================
Summary: 24/24 passed
```

> **Note de distinction d'environnement :**
> - Les tests exécutés ci-dessus valident la logique Node.js/navigateur, la conformité RBAC, la structure SQL et l'intégrité de l'orchestration client.
> - La validation sur PostgreSQL réel interviendra lors de l'application de la migration `20261030_phase1_security_hardening.sql` dans le SQL Editor de Supabase par l'administrateur.

---

## SECTION G — VULNÉRABILITÉS RÉSOLUES & POINTS DE VIGILANCE RESTANTS

### Vulnérabilités résolues en Phase 1 :
1. **Suppression du mot de passe `admin123` et des faux comptes locaux :** Impossible de s'authentifier comme admin sans compte réel dans `auth.users` doté de `app_metadata.role = 'admin'`.
2. **Protection contre l'escalade de privilèges côté client :** Les jetons et sessions forgés localement dans le `localStorage` sont désormais systématiquement rejetés et purgés.
3. **Suppression du vol de listes sensibles :** Les abonnés VIP et Newsletter ne peuvent plus être extraits par un visiteur anonyme via l'API REST Supabase.
4. **Cloisonnement strict des données financières :** Les tables `commissions`, `payout_requests`, `payout_items`, et `payments` sont hermétiques à l'accès public.
5. **Neutralisation de la faille de décrémentation des stocks :** Suppression des identifiants admin en dur dans `api/decrement-stock.js` et restriction CORS.

### Points de vigilance pour la Phase 2 :
- **Attribution du rôle administrateur dans Supabase Auth :**
  Pour qu'un administrateur puisse se connecter, son compte dans `auth.users` doit comporter l'attribut serveur suivant (à appliquer via le SQL Editor de Supabase ou l'API Management) :
  ```sql
  UPDATE auth.users 
  SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb 
  WHERE email = 'votre-email-admin@culture.store';
  ```
- **Configuration de la variable secrète sur Vercel :**
  Ajouter la variable d'environnement `SUPABASE_SERVICE_ROLE_KEY` dans les paramètres Vercel du projet avant de déployer l'API de décrémentation de stock.

---

## SECTION H — GUIDE DE DÉPLOIEMENT CONTRÔLÉ

Conformément aux directives absolues de la mission, **la migration SQL n'a pas été exécutée automatiquement sur l'instance live Supabase, et aucun push Git / déploiement Vercel n'a été déclenché.**

Pour appliquer les modifications en production :

### Étape 1 : Application de la migration SQL sur Supabase
1. Se connecter à la console Supabase du projet (`https://supabase.com/dashboard/project/eodlhorzehhhssyduxpf`).
2. Ouvrir le menu **SQL Editor**.
3. Copier et coller l'intégralité du script présent dans :
   [`supabase/migrations/20261030_phase1_security_hardening.sql`](file:///Users/ulrichcarmelaiki/Desktop/priority/supabase/migrations/20261030_phase1_security_hardening.sql).
4. Cliquer sur **Run**.
5. Vérifier que votre compte administrateur possède bien `app_metadata.role = 'admin'` en exécutant la commande indiquée dans la Section G.

### Étape 2 : Configuration des variables sur Vercel
1. Se connecter au tableau de bord Vercel du projet.
2. Aller dans **Settings > Environment Variables**.
3. Ajouter la variable suivante pour l'environnement **Production** :
   - Nom : `SUPABASE_SERVICE_ROLE_KEY`
   - Valeur : *(Clé secrète `service_role` récupérée dans Supabase > Project Settings > API)*.

### Étape 3 : Déploiement du code source
Une fois les étapes 1 et 2 validées, vous pourrez commiter et pousser les modifications sur la branche `main` :
```bash
git add .
git commit -m "feat(security): Phase 1 security hardening (Auth, RLS, Vercel APIs, Audit & Tests)"
git push origin main
```

