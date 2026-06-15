/**
 * Data Management (LocalStorage)
 */

const STORAGE_KEY = 'fintrack_data';

const defaultData = {
    profile: {
        name: '',
        salary: 0,
        isConfigured: false
    },
    settings: {
        theme: 'light'
    },
    transactions: [], // { id, type (expense|income), amount, desc, date, category }
    reflections: [] // { id, title, content, mood, date }
};

export const store = {
    data: null,

    init() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                this.data = JSON.parse(stored);
                // Ensure backward compatibility if new fields are added
                this.data = { ...defaultData, ...this.data };
            } catch (e) {
                console.error('Error parsing localStorage data:', e);
                this.data = { ...defaultData };
            }
        } else {
            this.data = { ...defaultData };
            this.save();
        }
    },

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    },

    getProfile() {
        return this.data.profile;
    },

    setProfile(name, salary) {
        this.data.profile.name = name;
        this.data.profile.salary = parseFloat(salary);
        this.data.profile.isConfigured = true;
        this.save();
    },

    getTheme() {
        return this.data.settings.theme;
    },

    setTheme(theme) {
        this.data.settings.theme = theme;
        this.save();
    },

    getTransactions() {
        // Return sorted by date descending
        return [...this.data.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    addTransaction(transaction) {
        const newTx = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            ...transaction,
            amount: parseFloat(transaction.amount)
        };
        this.data.transactions.push(newTx);
        this.save();
        return newTx;
    },

    deleteTransaction(id) {
        this.data.transactions = this.data.transactions.filter(t => t.id !== id);
        this.save();
    },

    getReflections() {
        return [...this.data.reflections].sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    addReflection(reflection) {
        const newRef = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            ...reflection,
            date: new Date().toISOString()
        };
        this.data.reflections.push(newRef);
        this.save();
        return newRef;
    },

    deleteReflection(id) {
        this.data.reflections = this.data.reflections.filter(r => r.id !== id);
        this.save();
    },

    exportData() {
        return JSON.stringify(this.data, null, 2);
    },

    importData(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (parsed && parsed.profile && parsed.transactions) {
                if (!parsed.reflections) parsed.reflections = []; // Ensure backwards compatibility
                this.data = parsed;
                this.save();
                return true;
            }
            return false;
        } catch (e) {
            console.error('Invalid JSON file', e);
            return false;
        }
    },
    
    resetData() {
        this.data = { ...defaultData };
        this.save();
    }
};
