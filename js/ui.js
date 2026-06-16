/**
 * UI Utilities (Theme, DOM helpers)
 */
import { store } from './store.js';
import { i18n } from './i18n.js';
import { finance } from './finance.js';

export const ui = {
    expenseChart: null,
    incomeChart: null,
    necessityChart: null,

    init() {
        this.applyTheme(store.getTheme());
        this.setupThemeToggle();
        this.setupModals();
        this.setupFab();
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
    
    setupFab() {
        const fabToggle = document.querySelector('.js-fab-toggle');
        const fabContainer = document.querySelector('.js-fab-container');
        
        if (fabToggle && fabContainer) {
            fabToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // prevent document click
                fabContainer.classList.toggle('active');
            });
            
            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!fabContainer.contains(e.target)) {
                    fabContainer.classList.remove('active');
                }
            });
            
            // Close when clicking an option
            const options = fabContainer.querySelectorAll('.fab-menu__item');
            options.forEach(opt => {
                opt.addEventListener('click', () => {
                    fabContainer.classList.remove('active');
                });
            });
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
        if (currency === 'GTQ') sym = 'Q';
        
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

        const values = Object.values(data);
        const total = values.reduce((sum, val) => sum + val, 0);

        const labels = Object.keys(data).map((k, index) => {
            let name = k.charAt(0).toUpperCase() + k.slice(1);
            const translated = i18n.t(`cat.${k}`);
            if (translated !== `cat.${k}`) {
                name = translated.replace(/[\u1000-\uFFFF]+/g, '').trim();
            }
            const val = values[index];
            const percent = total > 0 ? Math.round((val / total) * 100) : 0;
            const formattedVal = finance.formatCurrency(val);
            return `${name} - ${percent}% (${formattedVal})`;
        });

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
    },

    renderNecessityChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.necessityChart) {
            this.necessityChart.destroy();
        }

        const values = Object.values(data);
        const total = values.reduce((sum, val) => sum + val, 0);

        const labels = Object.keys(data).map((k, index) => {
            const translated = i18n.t(`nec.${k}`);
            const val = values[index];
            const percent = total > 0 ? Math.round((val / total) * 100) : 0;
            const formattedVal = finance.formatCurrency(val);
            return `${translated} - ${percent}% (${formattedVal})`;
        });

        const isDark = store.getTheme() === 'dark';
        const textColor = isDark ? '#D1D5DB' : '#4B5563';

        const colorMap = {
            necessary: '#3B82F6',     // Blue
            indispensable: '#10B981', // Green
            important: '#F59E0B',     // Yellow
            non_essential: '#F97316', // Orange
            trivial: '#8B4513',       // Brown
            impulse: '#EF4444'        // Red
        };

        const colors = Object.keys(data).map(k => colorMap[k] || '#3B82F6');

        this.necessityChart = new Chart(ctx, {
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
    },
    
    renderTimelineChart(canvasId, timelineData) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (this.timelineChart) {
            this.timelineChart.destroy();
        }

        const isDark = store.getTheme() === 'dark';
        const textColor = isDark ? '#D1D5DB' : '#4B5563';
        const gridColor = isDark ? '#374151' : '#E5E7EB';

        this.timelineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timelineData.labels,
                datasets: [
                    {
                        label: i18n.t('hist.expenses'),
                        data: timelineData.expenses,
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: i18n.t('hist.incomes'),
                        data: timelineData.incomes,
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: textColor, padding: 20, font: { family: "'Inter', sans-serif" } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += finance.formatCurrency(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: gridColor, display: false },
                        ticks: { color: textColor, font: { family: "'Inter', sans-serif" } }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { 
                            color: textColor, 
                            font: { family: "'Inter', sans-serif" },
                            callback: function(value) {
                                const currency = store.getProfile().currency;
                                const symbol = currency === 'USD' ? '$' : 'Q';
                                return symbol + value;
                            }
                        }
                    }
                }
            }
        });
    }
};
