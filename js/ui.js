/**
 * UI Utilities (Theme, DOM helpers)
 */
import { store } from './store.js';

export const ui = {
    chartInstance: null,

    init() {
        this.applyTheme(store.getTheme());
        this.setupThemeToggle();
        this.setupModals();
    },

    // --- Theming ---
    applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.remove('theme-light');
            document.body.classList.add('theme-dark');
            this.updateThemeIcon('moon');
        } else {
            document.body.classList.remove('theme-dark');
            document.body.classList.add('theme-light');
            this.updateThemeIcon('sun');
        }
    },

    setupThemeToggle() {
        const btns = document.querySelectorAll('.js-theme-toggle');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentTheme = store.getTheme();
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                store.setTheme(newTheme);
                this.applyTheme(newTheme);
                
                // Re-render chart if it exists to update colors
                if (this.chartInstance) {
                    this.chartInstance.update();
                }
            });
        });
    },

    updateThemeIcon(mode) {
        const icons = document.querySelectorAll('.js-theme-toggle i');
        icons.forEach(icon => {
            icon.className = mode === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        });
    },

    // --- Navigation UI ---
    updateNavSelection(viewName) {
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.view === viewName) {
                link.classList.add('active');
            }
        });
    },

    toggleNavVisibility(show) {
        const nav = document.querySelector('.js-nav');
        if (show) {
            nav.classList.remove('hidden');
        } else {
            nav.classList.add('hidden');
        }
    },

    // --- Modals ---
    setupModals() {
        const openBtns = document.querySelectorAll('.js-open-add-modal');
        const closeBtns = document.querySelectorAll('.js-close-modal');
        const modal = document.getElementById('modal-add');

        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.getElementById('trans-date').valueAsDate = new Date(); // set default date
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('active');
            });
        });
    },

    closeAddModal() {
        document.getElementById('modal-add').classList.remove('active');
    },

    // --- Chart.js Wrapper ---
    renderCategoryChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Destroy previous instance
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        const labels = Object.keys(data).map(k => k.charAt(0).toUpperCase() + k.slice(1));
        const values = Object.values(data);

        const isDark = store.getTheme() === 'dark';
        const textColor = isDark ? '#D1D5DB' : '#4B5563';

        // Colors palette
        const colors = [
            '#3EB489', // Mint
            '#3B82F6', // Blue
            '#F59E0B', // Yellow
            '#EF4444', // Red
            '#8B5CF6', // Purple
            '#10B981'  // Green
        ];

        this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor }
                    }
                }
            }
        });
    }
};
