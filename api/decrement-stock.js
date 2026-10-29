const SUPABASE_URL = process.env.SUPABASE_URL || "https://eodlhorzehhhssyduxpf.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZGxob3J6ZWhoaHNzeWR1eHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNTk3MDUsImV4cCI6MjA5NzYzNTcwNX0.pzWRXbz-k3TuCN3KquHlHzQTqA7MMebceOkxXLzPXGg";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@culture.store";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        res.end();
        return;
    }

    if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Method Not Allowed" }));
        return;
    }

    try {
        let body = req.body;
        if (!body || typeof body === "string") {
            const raw = typeof body === "string" ? body : await new Promise((resolve) => {
                let data = "";
                req.on("data", chunk => { data += chunk; });
                req.on("end", () => resolve(data));
            });
            body = raw ? JSON.parse(raw) : {};
        }

        const items = Array.isArray(body.items) ? body.items : [];
        if (items.length === 0) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Aucun article fourni" }));
            return;
        }

        // 1. Obtain privileged token to update public.products under RLS
        const authRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: "POST",
            headers: {
                apikey: SUPABASE_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        });
        const authData = await authRes.json();
        const token = authData.access_token || SUPABASE_KEY;

        const updatedProducts = [];

        for (const item of items) {
            const prodId = String(item.id || "").trim();
            const qty = Math.max(1, Number(item.quantity) || 1);
            if (!prodId) continue;

            // Fetch current stock from Supabase
            const getRes = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(prodId)}&select=id,total_stock,status`, {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${token}`
                }
            });
            const rows = await getRes.json();
            const currentRow = Array.isArray(rows) && rows[0] ? rows[0] : null;
            if (!currentRow) continue;

            const currentStock = (currentRow.total_stock !== undefined && currentRow.total_stock !== null)
                ? Number(currentRow.total_stock)
                : 3;
            const newStock = Math.max(0, currentStock - qty);

            const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(prodId)}`, {
                method: "PATCH",
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Prefer: "return=representation"
                },
                body: JSON.stringify({
                    total_stock: newStock,
                    reserved_stock: 0,
                    updated_at: new Date().toISOString()
                })
            });
            const patched = await patchRes.json();
            updatedProducts.push({
                id: prodId,
                previousStock: currentStock,
                newStock: patched?.[0]?.total_stock ?? newStock
            });
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: true, updatedProducts }));
    } catch (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: err.message || "Erreur serveur" }));
    }
}
