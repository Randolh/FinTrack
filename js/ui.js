/**
 * UI Utilities (Theme, DOM helpers)
 */
import { store } from './store.js';

export const ui = {
    expenseChart: null,
    incomeChart: null,

    init() {
        this.applyTheme(store.getTheme());
        this.setupThemeToggle();
        this.setupModals();
        this.updateCurrencySymbols();
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
                if (this.expenseChart) this.expenseChart.update();
                if (this.incomeChart) this.incomeChart.update();
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
        // Transaction Modal
        const openBtnsTx = document.querySelectorAll('.js-open-add-modal');
        const closeBtnsTx = document.querySelectorAll('.js-close-modal');
        const modalTx = document.getElementById('modal-add');

        openBtnsTx.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalTx.classList.add('active');
                const dateInput = document.getElementById('trans-date');
                if (dateInput) dateInput.valueAsDate = new Date();
            });
        });

        closeBtnsTx.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalTx.classList.remove('active');
            });
        });

        // Reflection Modal
        const openBtnsRef = document.querySelectorAll('.js-open-add-reflection-modal');
        const closeBtnsRef = document.querySelectorAll('.js-close-reflection-modal');
        const modalRef = document.getElementById('modal-add-reflection');

        openBtnsRef.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalRef.classList.add('active');
            });
        });

        closeBtnsRef.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalRef.classList.remove('active');
            });
        });
    },

    closeAddModal() {
        document.getElementById('modal-add').classList.remove('active');
    },

    closeAddReflectionModal() {
        document.getElementById('modal-add-reflection').classList.remove('active');
    },

    updateCurrencySymbols() {
        const currency = store.getCurrency();
        let sym = '$';
        if (currency === 'EUR') sym = '€';
        if (currency === 'GBP') sym = '£';
        
        const prefixes = document.querySelectorAll('.form__input-prefix');
        prefixes.forEach(el => {
            el.textContent = sym;
        });
    },

    // --- Chart.js Wrapper ---
    renderCategoryChart(canvasId, data, isIncome = false) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Destroy previous instance
        if (!isIncome && this.expenseChart) {
            this.expenseChart.destroy();
        } else if (isIncome && this.incomeChart) {
            this.incomeChart.destroy();
        }

        const labels = Object.keys(data).map(k => k.charAt(0).toUpperCase() + k.slice(1));
        const values = Object.values(data);

        const isDark = store.getTheme() === 'dark';
        const textColor = isDark ? '#D1D5DB' : '#4B5563';

        // Colors palette
        let colors = [
            '#3EB489', // Mint
            '#3B82F6', // Blue
            '#F59E0B', // Yellow
            '#EF4444', // Red
            '#8B5CF6', // Purple
            '#10B981'  // Green
        ];
        
        if (isIncome) {
            colors = [
                '#10B981', // Green
                '#059669', // Darker Green
                '#34D399', // Light Green
                '#6EE7B7'  // Lighter Green
            ];
        }

        const newChart = new Chart(ctx, {
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
        
        if (!isIncome) {
            this.expenseChart = newChart;
        } else {
            this.incomeChart = newChart;
        }
    }
};
