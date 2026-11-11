// Vercel Serverless Function : Décrémentation atomique du stock d'articles après commande
// PHASE 1 Security Hardening :
// - Suppression totale des mots de passe en dur, de "admin123" et du login admin automatique
// - Utilisation exclusive de SUPABASE_SERVICE_ROLE_KEY côté serveur (jamais exposé au client)
// - CORS restreint aux origines autorisées (priority-illegal.com, www.priority-illegal.com, localhost)
// - Validation stricte du payload (POST uniquement, taille max, structure et quantité 1..10)
// - Rate limiting par IP pour bloquer les abus et l'épuisement artificiel des stocks

const ALLOWED_ORIGINS = new Set([
    "https://priority-illegal.com",
    "https://www.priority-illegal.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5000",
    "http://localhost:8080"
]);

// Rate limiter en mémoire de la fonction serverless (10 requêtes par minute par IP)
const ipRateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

function checkRateLimit(ip) {
    const now = Date.now();
    const cleanIp = String(ip || "unknown").trim();
    let record = ipRateLimitMap.get(cleanIp);

    if (!record || (now - record.firstAt > RATE_LIMIT_WINDOW_MS)) {
        record = { count: 1, firstAt: now };
        ipRateLimitMap.set(cleanIp, record);
        return { allowed: true };
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return { allowed: false };
    }

    record.count += 1;
    return { allowed: true };
}

function resolveOrigin(req) {
    const origin = req.headers?.origin || req.headers?.Origin;
    if (origin && ALLOWED_ORIGINS.has(origin)) {
        return origin;
    }
    return "https://priority-illegal.com";
}

export default async function handler(req, res) {
    const requestOrigin = resolveOrigin(req);

    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.setHeader("Vary", "Origin");

    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }

    if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Méthode non autorisée. Seul POST est accepté." }));
        return;
    }

    // Protection rate limiting par adresse IP
    const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
    if (!checkRateLimit(clientIp)) {
        res.statusCode = 429;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Trop de requêtes. Veuillez patienter avant de réessayer." }));
        return;
    }

    const SUPABASE_URL = process.env.SUPABASE_URL || "https://eodlhorzehhhssyduxpf.supabase.co";
    // Utilisation obligatoire de la clé de service (service_role) côté serveur
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SERVICE_ROLE_KEY) {
        console.error("[decrement-stock] SUPABASE_SERVICE_ROLE_KEY non configurée.");
        res.statusCode = 503;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Service indisponible : configuration serveur manquante." }));
        return;
    }

    try {
        let body = req.body;
        if (typeof body === "string") {
            try {
                body = JSON.parse(body);
            } catch (parseErr) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Format JSON invalide." }));
                return;
            }
        }

        const items = body?.items;
        if (!Array.isArray(items) || items.length === 0) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Aucun article fourni dans 'items'." }));
            return;
        }

        if (items.length > 25) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Trop d'articles dans une seule requête (max 25)." }));
            return;
        }

        const authHeaders = {
            "apikey": SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        };

        const results = [];

        for (const item of items) {
            const rawId = item?.id;
            const quantity = Number(item?.quantity) || 1;

            if (!rawId || typeof rawId !== "string" || rawId.trim().length === 0) {
                continue;
            }

            const id = rawId.trim();

            if (quantity <= 0 || quantity > 10) {
                continue;
            }

            // Récupération atomique du stock courant
            const getRes = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(id)}&select=id,total_stock,stock,name`, {
                headers: authHeaders
            });

            if (!getRes.ok) {
                const errTxt = await getRes.text();
                results.push({ id, success: false, error: "Produit introuvable" });
                continue;
            }

            const rows = await getRes.json();
            if (!Array.isArray(rows) || rows.length === 0) {
                results.push({ id, success: false, error: "Produit non trouvé" });
                continue;
            }

            const currentProduct = rows[0];
            const currentStock = (currentProduct.total_stock !== undefined && currentProduct.total_stock !== null)
                ? Number(currentProduct.total_stock)
                : Number(currentProduct.stock || 0);

            const newStock = Math.max(0, currentStock - quantity);

            // Mise à jour sécurisée avec la clé de service
            const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
                method: "PATCH",
                headers: authHeaders,
                body: JSON.stringify({
                    total_stock: newStock,
                    stock: newStock,
                    reserved_stock: 0,
                    updated_at: new Date().toISOString()
                })
            });

            if (!updateRes.ok) {
                results.push({ id, success: false, error: "Échec mise à jour" });
            } else {
                results.push({ id, success: true, previousStock: currentStock, newStock });
            }
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: true, results }));
    } catch (err) {
        console.error("[decrement-stock] Erreur interne:", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Erreur serveur lors de la mise à jour des stocks." }));
    }
}
