/**
 * Onboarding View
 */
import { store } from '../store.js';
import { i18n } from '../i18n.js';
import { ui } from '../ui.js';

export const onboardingView = {
    init(routerNavigate) {
        this.form = document.getElementById('form-onboarding');
        this.navigate = routerNavigate;
        this.bindEvents();
    },

    bindEvents() {
        // Translate preview instantly
        document.getElementById('onboarding-language').addEventListener('change', (e) => {
            store.setLanguage(e.target.value);
            i18n.translateDOM();
        });

        document.getElementById('onboarding-currency').addEventListener('change', (e) => {
            // Update temporarily to reflect in UI
            const currentName = store.data.profile.name;
            const currentSalary = store.data.profile.salary;
            store.setProfile(currentName, currentSalary, e.target.value);
            ui.updateCurrencySymbols();
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('onboarding-name').value;
            const salary = document.getElementById('onboarding-salary').value;
            const currency = document.getElementById('onboarding-currency').value;
            
            store.setProfile(name, salary, currency);
            this.navigate('dashboard');
        });
    },

    render() {
        // Clear inputs on render
        document.getElementById('onboarding-name').value = '';
        document.getElementById('onboarding-salary').value = '';
    }
};
