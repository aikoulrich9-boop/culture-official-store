import fs from 'fs';

// Setup minimal browser globals in Node
global.window = global;
global.window.addEventListener = function(event, fn) { if (event === 'DOMContentLoaded') fn(); };
global.localStorage = {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; },
    clear() { this._data = {}; }
};
global.sessionStorage = {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; },
    clear() { this._data = {}; }
};

// Mock payment service
global.PaymentService = {
    activeProvider: "WHATSAPP_BRIDGE",
    setActiveProvider(code) { this.activeProvider = code; },
    getActiveProvider() { return { code: this.activeProvider }; }
};

// Load supabase-config.js and test-suite.js
eval(fs.readFileSync('./supabase-config.js', 'utf8'));
eval(fs.readFileSync('./tests/test-suite.js', 'utf8'));

async function test() {
    console.log("Running automated tests...");
    const res = await window.TestRunner.runAllTests();
    console.log(`Summary: ${res.passed}/${res.total} passed`);
    if (res.passed !== res.total) {
        process.exit(1);
    }
}

test();
