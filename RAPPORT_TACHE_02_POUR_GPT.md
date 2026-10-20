# RAPPORT POUR GPT / CLAUDE — TÂCHE 02 : HARMONISATION DU SCHÉMA SUPABASE & IDENTIFIANTS UUID

> **Comment utiliser ce fichier :**  
> Tu peux copier directement le texte ci-dessous et le coller dans ChatGPT ou Claude. Il contient le contexte complet, les modifications apportées, le code SQL, le code JavaScript et les résultats de tests pour qu'il puisse auditer et valider le travail.

---

```markdown
Bonjour GPT,

Voici le travail technique complet réalisé pour la TÂCHE 02 sur le projet e-commerce "CULTURE Streetwear Co." (HTML5, Vanilla CSS, JavaScript ES6+, Supabase PostgreSQL, localStorage).

Peux-tu analyser ce travail, me donner ton avis sur la conformité de l'architecture, la robustesse de la migration SQL et la cohérence avec les futures tâches (Auth Supabase et RLS strictes) ?

---

### 1. CONTEXTE & OBJECTIF DE LA TÂCHE 02
Harmoniser le modèle de données JavaScript avec le schéma PostgreSQL de Supabase.
- Résoudre le conflit critique entre les colonnes `UUID` de PostgreSQL et les identifiants textuels générés côté JS (`res-marie01`, `RES-123456`, `COMM-123456`), qui déclenchaient l'erreur PostgreSQL `22P02: invalid input syntax for type uuid`.
- Conserver les identifiants commerciaux lisibles (`orders.id` type `CMD-XXXXXX`, `resellers.referral_code` type `MARIE01`).
- Mettre en place des clés primaires techniques `UUID`, des clés étrangères formelles (`REFERENCES`), des index de performance et des contraintes d'unicité anti-double virement.
- Assurer une rétrocompatibilité à 100% avec les tests automatisés existants sans modifier le code métier.

---

### 2. TRAVAIL RÉALISÉ

#### A. Migration SQL versionnée : `supabase/migrations/20261020_harmonize_uuids_and_schema.sql`
- **Idempotence complète :** Utilisation de `CREATE EXTENSION IF NOT EXISTS "pgcrypto"`, `CREATE TABLE IF NOT EXISTS`, et de blocs `DO $$ ... $$` pour convertir en toute sécurité les colonnes existantes de `TEXT` vers `UUID`.
- **Conversion de données historiques :** Les identifiants démo (`res-marie01`, `res-koffi02`, `res-daniel03`) sont remappés vers des UUIDs déterministes avant l'altération de type :
  - `res-marie01` ➔ `11111111-1111-1111-1111-111111111111`
  - `res-koffi02` ➔ `22222222-2222-2222-2222-222222222222`
  - `res-daniel03` ➔ `33333333-3333-3333-3333-333333333333`
- **Clés Étrangères ajoutées :**
  - `orders.reseller_id UUID REFERENCES public.resellers(id) ON DELETE SET NULL`
  - `commissions.order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE`
  - `commissions.reseller_id UUID REFERENCES public.resellers(id) ON DELETE CASCADE`
  - `payout_requests.reseller_id UUID REFERENCES public.resellers(id) ON DELETE CASCADE`
  - `payout_items.commission_id UUID UNIQUE REFERENCES public.commissions(id) ON DELETE CASCADE` (contrainte anti-double paiement)
  - `payments.order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE`
- **Politiques RLS de transition :** RLS activée sur les 11 tables avec politiques de développement ouvertes en lecture/écriture, prêtes pour le durcissement en TÂCHE 03.

#### B. Harmonisation JavaScript : `supabase-config.js`
- **Générateur et Validateur UUID RFC 4122 v4 :**
  - `isValidUUID(str)` : regex de validation RFC 4122.
  - `generateUUID()` : utilise `crypto.randomUUID()` avec repli algorithmique v4.
  - `resolveResellerUUID(identifier)` : résout de façon bidirectionnelle les codes démo et les UUIDs réels.
- **Création d'entités avec UUIDs natifs :**
  - `createReseller()` génère un UUID valide pour la PK `resellers.id`.
  - `createOrder()` résout `reseller_id` en UUID avant insertion Supabase, et génère un UUID pour la table `commissions`.
  - `createWithdrawalRequest()`, `createCommissionAdjustment()`, `logAuditEvent()`, `subscribeNewsletter()`, `subscribeVip()` utilisent des UUIDs.
- **Sécurité et propriété des données (Data Ownership) :**
  - `AuthService.authorize('ROLE_RESELLER', targetResellerId)` compare les identifiants résolus en UUIDs, bloquant toute tentative de consultation croisée non autorisée (403 Forbidden).

---

### 3. RÉSULTATS DES TESTS AUTOMATISÉS (`npm test`)

18/18 scénarios réussis (100% de conformité) :
1. ✅ SCÉNARIO 1: Commande client sans code revendeur
2. ✅ SCÉNARIO 2: Commande avec code valide MARIE01 (Commission PENDING)
3. ✅ SCÉNARIO 3: Règle de non-réduction du tarif client (Prix plein maintenu)
4. ✅ SCÉNARIO 4: Rejet code invalide & Accès non authentifié (401)
5. ✅ SCÉNARIO 5: Session revendeur & déduction automatique reseller_id UUID (11111111-1111-1111-1111-111111111111)
6. ✅ SCÉNARIO 6: Contrôle d'accès ROLE_ADMIN vs ROLE_RESELLER (403 vs 200)
7. ✅ SCÉNARIO 7: Isolation des données RBAC
8. ✅ SCÉNARIO 8: Commande Livrée ➔ Commission AVAILABLE
9. ✅ SCÉNARIO 9: Commande Annulée ➔ Commission CANCELLED
10. ✅ SCÉNARIO 10: Rejet sous le seuil minimum de retrait (10 000 FCFA)
11. ✅ SCÉNARIO 11: Validation et Paiement de Payout (PAID)
12. ✅ SCÉNARIO 12: Basculement modulaire des passerelles de paiement
13. ✅ SCÉNARIO 16: Journalisation d'audit (audit_log) des actions Admin
14. ✅ SCÉNARIO 18: Violation de propriété des données (403 Data Ownership Violation)
15. ✅ SCÉNARIO 20: Auto-commission interdite (Avenant F)
16. ✅ SCÉNARIO 21: Limitation de Débit / Rate Limiting (Avenant F)
17. ✅ SCÉNARIO 23: Base de calcul et Arrondi au FCFA (Avenant F)
18. ✅ SCÉNARIO 24: Cycle de vie complet de l'authentification unifiée

---

### 4. QUESTIONS POUR TON AUDIT
1. Le choix de conserver `orders.id` en `TEXT` (`CMD-XXXXXX`) tout en passant les clés étrangères `reseller_id` en `UUID` te semble-t-il la meilleure approche pour un site e-commerce ?
2. La contrainte `commission_id UUID UNIQUE` dans `payout_items` est-elle suffisante pour empêcher mathématiquement tout double retrait de commission ?
3. Quelles sont tes recommandations pour la TÂCHE 03 (mise en place de Supabase Auth réel `auth.users` et RLS stricte avec `auth.uid() = user_id`) ?
```
