/* ==========================================================================
   MODULAR PAYMENT PROVIDER ARCHITECTURE
   ========================================================================== */

/**
 * Base Abstract Class for Payment Providers
 */
class PaymentProvider {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }

    async processPayment(orderData) {
        throw new Error("processPayment must be implemented by concrete payment provider adapter");
    }

    async verifyPaymentStatus(transactionId) {
        return { status: "SUCCESS", transactionId };
    }
}

/**
 * Adapter 1: WhatsApp Direct Bridge (Default Active Gateway)
 */
class WhatsAppBridgeAdapter extends PaymentProvider {
    constructor() {
        super("WhatsApp Direct Bridge", "WHATSAPP_BRIDGE");
    }

    async processPayment(orderData) {
        const phone = window.ENV_CONFIG ? window.ENV_CONFIG.WHATSAPP_NUMBER : "2290165173634";
        const hasPreorder = orderData.hasPreorder;
        const headerTitle = hasPreorder ? "*NOUVELLE COMMANDE EN PRÉ-VENTE - CULTURE STREETWEAR*" : "*NOUVELLE COMMANDE - CULTURE STREETWEAR*";

        let itemsText = "";
        orderData.items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            itemsText += `${index + 1}. *${item.name}*\n   Quantité: ${item.quantity} x ${item.price.toLocaleString('fr-FR')} = *${itemTotal.toLocaleString('fr-FR')} FCFA*\n`;
        });

        const customerInfoBlock = `*INFORMATIONS CLIENT (CHECKOUT INVITÉ)*\n` +
            `👤 Nom: ${orderData.customerName}\n` +
            (orderData.customerPhone ? `📞 Tél/WhatsApp: ${orderData.customerPhone}\n` : "") +
            (orderData.customerEmail ? `📧 Email: ${orderData.customerEmail}\n` : "") +
            `🌍 Pays: ${orderData.country} ${orderData.city ? '(' + orderData.city + ')' : ''}\n` +
            (orderData.address ? `📍 Adresse/Quartier: ${orderData.address}\n` : "") +
            `💳 Mode de Paiement: ${orderData.paymentMethod}\n` +
            (orderData.resellerInfo ? `🏷️ Code Revendeur Associé: ${orderData.resellerInfo.code}\n` : "") +
            `\n`;

        const message = `${headerTitle}\n\n` +
            customerInfoBlock +
            `Bonjour, je souhaite valider ma commande :\n\n` +
            `${itemsText}\n` +
            `*TOTAL COMMANDE : ${orderData.total.toLocaleString('fr-FR')} FCFA*\n\n` +
            `Merci de me confirmer la réservation de mes articles et l'accès au paiement.`;

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");

        return {
            success: true,
            provider: this.code,
            redirectUrl: whatsappUrl,
            message: "Redirection vers la passerelle de confirmation WhatsApp..."
        };
    }
}

/**
 * Adapter 2: Bénin Mobile Money (MTN & Moov Bénin API Ready)
 */
class BeninMobileMoneyAdapter extends PaymentProvider {
    constructor() {
        super("Bénin Mobile Money (MTN / Moov)", "BENIN_MOBILE_MONEY");
    }

    async processPayment(orderData) {
        console.log("⚡ [Paiement Bénin] Initialisation de la transaction Mobile Money pour", orderData.total, "FCFA");
        return {
            success: true,
            provider: this.code,
            status: "PENDING_CUSTOMER_ACTION",
            message: "Veuillez valider le paiement USSD sur votre téléphone portable MTN ou Moov Bénin."
        };
    }
}

/**
 * Adapter 3: Côte d'Ivoire Wave & Orange Money (Wave / Orange CI API Ready)
 */
class IvoryCoastWaveAdapter extends PaymentProvider {
    constructor() {
        super("Côte d'Ivoire Wave / Orange Money", "CI_WAVE_ORANGE");
    }

    async processPayment(orderData) {
        console.log("🌊 [Paiement Côte d'Ivoire] Génération du lien de paiement Wave / Orange pour", orderData.total, "FCFA");
        return {
            success: true,
            provider: this.code,
            status: "PENDING_CUSTOMER_ACTION",
            message: "Scannez le QR Code ou appuyez pour valider le virement Wave / Orange Money CI."
        };
    }
}

/**
 * Adapter 4: Carte Bancaire / Virement International
 */
class CardVirementAdapter extends PaymentProvider {
    constructor() {
        super("Carte Bancaire & Virement", "CARD_VIREMENT");
    }

    async processPayment(orderData) {
        console.log("💳 [Paiement Carte] Redirection sécurisée vers le guichet bancaire pour", orderData.total, "FCFA");
        return {
            success: true,
            provider: this.code,
            status: "PENDING_GATEWAY",
            message: "Redirection vers le système de paiement bancaire sécurisé..."
        };
    }
}

/**
 * Payment Service Manager Singleton
 */
window.PaymentService = {
    providers: {
        "WHATSAPP_BRIDGE": new WhatsAppBridgeAdapter(),
        "BENIN_MOBILE_MONEY": new BeninMobileMoneyAdapter(),
        "CI_WAVE_ORANGE": new IvoryCoastWaveAdapter(),
        "CARD_VIREMENT": new CardVirementAdapter()
    },

    activeProviderCode: "WHATSAPP_BRIDGE",

    setActiveProvider(code) {
        if (this.providers[code]) {
            this.activeProviderCode = code;
            console.log("🔄 Passerelle de paiement active modifiée vers :", this.providers[code].name);
        }
    },

    getActiveProvider() {
        return this.providers[this.activeProviderCode] || this.providers["WHATSAPP_BRIDGE"];
    },

    async processOrderPayment(orderData) {
        const provider = this.getActiveProvider();
        return await provider.processPayment(orderData);
    }
};
