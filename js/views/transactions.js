/**
 * Transactions View
 */
import { store } from '../store.js';
import { finance } from '../finance.js';
import { ui } from '../ui.js';
import { i18n } from '../i18n.js';

export const transactionsView = {
    currentFilter: 'all',

    init() {
        this.listEl = document.getElementById('transaction-list');
        this.form = document.getElementById('form-transaction');
        
        this.bindEvents();
    },

    bindEvents() {
        // Form submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const type = document.querySelector('input[name="trans_type"]:checked').value;
            const amount = document.getElementById('trans-amount').value;
            const desc = document.getElementById('trans-desc').value;
            const date = document.getElementById('trans-date').value;
            const category = document.getElementById('trans-category').value;
            const isDaily = document.getElementById('trans-is-daily').checked;
            const necessity = document.getElementById('trans-necessity').value;

            store.addTransaction({ 
                type, amount, desc, date, category, isDaily, 
                necessity: type === 'expense' ? necessity : null 
            });
            
            // Reset form and close modal
            this.form.reset();
            ui.closeAddModal();
            
            // Refresh view
            this.render();
            
            // If we are actually on dashboard, this event might be fired globally. 
            // The router could handle broadcasting an update, but for simplicity, 
            // since this is a SPA, we just re-render current view or ensure dashboard gets updated when visited.
        });

        const updateCategoryOptions = (type) => {
            const select = document.getElementById('trans-category');
            if (!select) return;
            select.innerHTML = '';
            
            let cats = [];
            if (type === 'income') {
                cats = [
                    { value: 'salary', i18n: 'cat.salary', text: '💼 Salary' },
                    { value: 'business', i18n: 'cat.business', text: '📈 Business / Sales' },
                    { value: 'freelance', i18n: 'cat.freelance', text: '🛠️ Freelance / Services' },
                    { value: 'investments', i18n: 'cat.investments', text: '💹 Investments' },
                    { value: 'gifts', i18n: 'cat.gifts', text: '🎁 Gifts' },
                    { value: 'refunds', i18n: 'cat.refunds', text: '↩️ Refunds' },
                    { value: 'other', i18n: 'cat.other', text: '📦 Other' }
                ];
            } else {
                cats = [
                    { value: 'food', i18n: 'cat.food', text: '🍔 Food' },
                    { value: 'transport', i18n: 'cat.transport', text: '🚗 Transport' },
                    { value: 'utilities', i18n: 'cat.utilities', text: '⚡ Utilities' },
                    { value: 'entertainment', i18n: 'cat.entertainment', text: '🍿 Entertainment' },
                    { value: 'shopping', i18n: 'cat.shopping', text: '🛍️ Shopping' },
                    { value: 'education', i18n: 'cat.education', text: '🎓 Education' },
                    { value: 'savings', i18n: 'cat.savings', text: '💰 Savings' },
                    { value: 'emergency', i18n: 'cat.emergency', text: '🚨 Emergency' },
                    { value: 'health', i18n: 'cat.health', text: '🏥 Health' },
                    { value: 'payments', i18n: 'cat.payments', text: '💳 Payments' },
                    { value: 'other', i18n: 'cat.other', text: '📦 Other' }
                ];
            }
            
            cats.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.value;
                opt.setAttribute('data-i18n', c.i18n);
                opt.textContent = c.text;
                select.appendChild(opt);
            });
            
            i18n.translateDOM();
        };

        // Hide daily toggle and necessity if income is selected
        const typeRadios = document.querySelectorAll('input[name="trans_type"]');
        const dailyWrapper = document.getElementById('trans-daily-wrapper');
        const necessityWrapper = document.getElementById('trans-necessity-wrapper');
        
        const initialType = document.querySelector('input[name="trans_type"]:checked')?.value || 'expense';
        updateCategoryOptions(initialType);
        if (necessityWrapper) necessityWrapper.style.display = initialType === 'income' ? 'none' : 'block';
        
        typeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const type = e.target.value;
                if (type === 'income') {
                    if (dailyWrapper) dailyWrapper.style.display = 'none';
                    if (necessityWrapper) necessityWrapper.style.display = 'none';
                    updateCategoryOptions('income');
                } else {
                    if (dailyWrapper) dailyWrapper.style.display = 'block';
                    if (necessityWrapper) necessityWrapper.style.display = 'block';
                    updateCategoryOptions('expense');
                }
            });
        });

        // Filters
        const filters = document.querySelectorAll('.filter-chip');
        filters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filters.forEach(f => f.classList.remove('filter-chip--active'));
                e.target.classList.add('filter-chip--active');
                this.currentFilter = e.target.dataset.filter;
                this.renderList();
            });
        });

        // Delete delegation
        this.listEl.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.js-delete-tx');
            if (deleteBtn) {
                const id = deleteBtn.dataset.id;
                if(confirm(i18n.t('alert.delete_tx'))) {
                    store.deleteTransaction(id);
                    this.renderList();
                }
            }
        });
    },

    render() {
        this.renderList();
    },

    renderList() {
        let txs = store.getTransactions();

        if (this.currentFilter !== 'all') {
            txs = txs.filter(t => t.type === this.currentFilter);
        }

        if (txs.length === 0) {
            this.listEl.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-receipt empty-state__icon"></i>
                    <p class="empty-state__text">${i18n.t('hist.empty')}</p>
                </div>
            `;
            return;
        }

        const categoryIcons = {
            food: 'fa-burger',
            transport: 'fa-car',
            utilities: 'fa-bolt',
            entertainment: 'fa-film',
            shopping: 'fa-bag-shopping',
            education: 'fa-graduation-cap',
            savings: 'fa-piggy-bank',
            emergency: 'fa-truck-medical',
            health: 'fa-house-medical',
            payments: 'fa-credit-card',
            salary: 'fa-briefcase',
            business: 'fa-chart-line',
            freelance: 'fa-laptop-code',
            investments: 'fa-arrow-trend-up',
            gifts: 'fa-gift',
            refunds: 'fa-rotate-left',
            other: 'fa-box'
        };

        this.listEl.innerHTML = txs.map(tx => {
            const iconClass = categoryIcons[tx.category] || 'fa-box';
            const amountClass = tx.type === 'income' ? 'income' : 'expense';
            const sign = tx.type === 'income' ? '+' : '-';
            const formattedDate = new Date(tx.date + 'T12:00:00').toLocaleDateString();
            let translatedCat = i18n.t(`cat.${tx.category}`);
            if (translatedCat === `cat.${tx.category}`) {
                translatedCat = tx.category.charAt(0).toUpperCase() + tx.category.slice(1);
            } else {
                // Remove emoji
                translatedCat = translatedCat.replace(/[\u1000-\uFFFF]+/g, '').trim();
            }

            let necessityHtml = '';
            if (tx.type === 'expense' && tx.necessity) {
                const necIcons = {
                    indispensable: '🟢',
                    important: '🟡',
                    non_essential: '🟠',
                    trivial: '🟤',
                    impulse: '🔴'
                };
                const necText = i18n.t(`nec.${tx.necessity}`);
                necessityHtml = `<span style="font-size: 0.8rem; margin-left: 6px; cursor: help;" title="${necText}">${necIcons[tx.necessity] || ''}</span>`;
            }

            return `
                <div class="transaction-item">
                    <div class="transaction-item__left">
                        <div class="transaction-item__icon ${tx.type}">
                            <i class="fa-solid ${iconClass}"></i>
                        </div>
                        <div class="transaction-item__details">
                            <span class="transaction-item__title">${tx.desc}${necessityHtml}</span>
                            <span class="transaction-item__date">${formattedDate} &bull; <span style="text-transform:capitalize">${translatedCat}</span></span>
                        </div>
                    </div>
                    <div class="transaction-item__right" style="display:flex; align-items:center; gap: 10px;">
                        <span class="transaction-item__amount ${amountClass}">
                            ${sign}${finance.formatCurrency(tx.amount)}
                        </span>
                        <button class="btn-icon js-delete-tx" data-id="${tx.id}" aria-label="Delete" style="width:30px; height:30px; font-size:0.8rem; color:var(--color-danger)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
};
