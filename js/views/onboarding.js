/**
 * Onboarding View
 */
import { store } from '../store.js';

export const onboardingView = {
    init(routerNavigate) {
        this.form = document.getElementById('form-onboarding');
        this.navigate = routerNavigate;
        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('onboarding-name').value;
            const salary = document.getElementById('onboarding-salary').value;
            
            store.setProfile(name, salary);
            this.navigate('dashboard');
        });
    },

    render() {
        // Clear inputs on render
        document.getElementById('onboarding-name').value = '';
        document.getElementById('onboarding-salary').value = '';
    }
};
