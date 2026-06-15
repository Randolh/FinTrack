/**
 * Main Application Entry Point & Router
 */
import { store } from './store.js';
import { ui } from './ui.js';
import { onboardingView } from './views/onboarding.js';
import { dashboardView } from './views/dashboard.js';
import { transactionsView } from './views/transactions.js';
import { settingsView } from './views/settings.js';

const app = {
    currentView: null,
    
    init() {
        // Initialize Store
        store.init();
        
        // Initialize UI (Theme, Modals)
        ui.init();
        
        // Initialize Views
        onboardingView.init((v) => this.navigate(v));
        dashboardView.init();
        transactionsView.init();
        settingsView.init((v) => this.navigate(v));
        
        this.setupRouter();
        
        // Initial Route
        const profile = store.getProfile();
        if (!profile.isConfigured) {
            this.navigate('onboarding');
        } else {
            // Check hash or default to dashboard
            const hash = window.location.hash.replace('#', '');
            if (['dashboard', 'transactions', 'settings'].includes(hash)) {
                this.navigate(hash);
            } else {
                this.navigate('dashboard');
            }
        }
    },
    
    setupRouter() {
        // Handle nav links
        document.querySelectorAll('.nav__link[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.dataset.view;
                this.navigate(view);
            });
        });
        
        // Handle back/forward buttons
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#', '');
            const profile = store.getProfile();
            
            if (!profile.isConfigured && hash !== 'onboarding') {
                this.navigate('onboarding');
                return;
            }
            
            if (['dashboard', 'transactions', 'settings'].includes(hash)) {
                this.navigate(hash, false);
            }
        });
    },
    
    navigate(viewName, pushState = true) {
        if (this.currentView === viewName) return;
        
        // Hide all views
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('view--active');
        });
        
        // Show target view
        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) {
            targetView.classList.add('view--active');
        }
        
        this.currentView = viewName;
        
        // Update URL hash
        if (pushState) {
            window.history.pushState(null, null, `#${viewName}`);
        }
        
        // Update Navigation UI
        if (viewName === 'onboarding') {
            ui.toggleNavVisibility(false);
        } else {
            ui.toggleNavVisibility(true);
            ui.updateNavSelection(viewName);
        }
        
        // Render View specific logic
        this.renderView(viewName);
    },
    
    renderView(viewName) {
        switch (viewName) {
            case 'onboarding':
                onboardingView.render();
                break;
            case 'dashboard':
                dashboardView.render();
                break;
            case 'transactions':
                transactionsView.render();
                break;
            case 'settings':
                settingsView.render();
                break;
        }
    }
};

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
