/* ==========================================================================
   ENVIRONMENT & PLATFORM CONFIGURATION MODULE
   ========================================================================== */

window.ENV_CONFIG = {
    // API Supabase Credentials
    SUPABASE_URL: "https://eodlhorzehhhssyduxpf.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZGxob3J6ZWhoaHNzeWR1eHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNTk3MDUsImV4cCI6MjA5NzYzNTcwNX0.pzWRXbz-k3TuCN3KquHlHzQTqA7MMebceOkxXLzPXGg",
    
    // Store Defaults
    STORE_NAME: "CULTURE Streetwear Official",
    DEFAULT_CURRENCY: "FCFA",
    DEFAULT_COUNTRY: "Bénin",
    DEFAULT_MIN_PAYOUT: 10000,
    
    // Gateways Configurations
    ACTIVE_PAYMENT_GATEWAY: "WHATSAPP_BRIDGE", // "WHATSAPP_BRIDGE" | "BENIN_MOBILE_MONEY" | "CI_WAVE_ORANGE" | "CARD"
    WHATSAPP_NUMBER: "2290165173634",
    
    // Feature Flags
    ENABLE_GUEST_CHECKOUT: true,
    ENABLE_RESELLER_COMMISSIONS: true,
    ENABLE_AUTO_REFERRAL_TRACKING: true
};
