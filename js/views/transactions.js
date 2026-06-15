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

            store.addTransaction({ type, amount, desc, date, category });
            
            // Reset form and close modal
            this.form.reset();
            ui.closeAddModal();
            
            // Refresh view
            this.render();
            
            // If we are actually on dashboard, this event might be fired globally. 
            // The router could handle broadcasting an update, but for simplicity, 
            // since this is a SPA, we just re-render current view or ensure dashboard gets updated when visited.
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
            other: 'fa-box'
        };

        this.listEl.innerHTML = txs.map(tx => {
            const iconClass = categoryIcons[tx.category] || 'fa-box';
            const amountClass = tx.type === 'income' ? 'income' : 'expense';
            const sign = tx.type === 'income' ? '+' : '-';
            const formattedDate = new Date(tx.date + 'T12:00:00').toLocaleDateString();

            return `
                <div class="transaction-item">
                    <div class="transaction-item__left">
                        <div class="transaction-item__icon ${tx.type}">
                            <i class="fa-solid ${iconClass}"></i>
                        </div>
                        <div class="transaction-item__details">
                            <span class="transaction-item__title">${tx.desc}</span>
                            <span class="transaction-item__date">${formattedDate} &bull; <span style="text-transform:capitalize">${tx.category}</span></span>
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
