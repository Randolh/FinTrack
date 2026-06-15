/**
 * Financial Calculations & Dates
 */
import { store } from './store.js';

export const finance = {
    // Utility to parse local date correctly
    parseDate(dateString) {
        // Handle timezone offset so "2023-10-05" doesn't become Oct 4th
        const [year, month, day] = dateString.split('-');
        return new Date(year, month - 1, day);
    },

    getToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    },

    getStartOfWeek() {
        const d = this.getToday();
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    },

    getStartOfMonth() {
        const d = this.getToday();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    },

    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    },

    // Calculate prorated budgets
    getBudgets() {
        const salary = store.getProfile().salary;
        const d = this.getToday();
        const daysInMonth = this.getDaysInMonth(d.getFullYear(), d.getMonth());
        
        const daily = salary / daysInMonth;
        const weekly = daily * 7;
        const monthly = salary; // Base salary is considered monthly

        return { daily, weekly, monthly };
    },

    // Get expenses/incomes within a date range
    getTotalsForRange(startDate, endDate) {
        const txs = store.getTransactions();
        let expenses = 0;
        let income = 0;

        // Reset times for accurate comparison
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        txs.forEach(tx => {
            const txDate = this.parseDate(tx.date);
            if (txDate >= startDate && txDate <= end) {
                if (tx.type === 'expense') {
                    expenses += tx.amount;
                } else if (tx.type === 'income') {
                    income += tx.amount;
                }
            }
        });

        return { expenses, income };
    },

    // Get current progress stats
    getProgressStats() {
        const budgets = this.getBudgets();
        const today = this.getToday();
        const startOfWeek = this.getStartOfWeek();
        const startOfMonth = this.getStartOfMonth();

        const todayTotals = this.getTotalsForRange(today, today);
        const weekTotals = this.getTotalsForRange(startOfWeek, today);
        const monthTotals = this.getTotalsForRange(startOfMonth, today);

        return {
            day: {
                budget: budgets.daily,
                spent: todayTotals.expenses,
                earned: todayTotals.income,
                remaining: budgets.daily + todayTotals.income - todayTotals.expenses,
                percent: Math.min(((todayTotals.expenses) / (budgets.daily + todayTotals.income || 1)) * 100, 100)
            },
            week: {
                budget: budgets.weekly,
                spent: weekTotals.expenses,
                earned: weekTotals.income,
                remaining: budgets.weekly + weekTotals.income - weekTotals.expenses,
                percent: Math.min(((weekTotals.expenses) / (budgets.weekly + weekTotals.income || 1)) * 100, 100)
            },
            month: {
                budget: budgets.monthly,
                spent: monthTotals.expenses,
                earned: monthTotals.income,
                remaining: budgets.monthly + monthTotals.income - monthTotals.expenses,
                percent: Math.min(((monthTotals.expenses) / (budgets.monthly + monthTotals.income || 1)) * 100, 100)
            }
        };
    },

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },
    
    // Group expenses by category for current month
    getExpensesByCategory() {
        const txs = store.getTransactions();
        const startOfMonth = this.getStartOfMonth();
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0, 23, 59, 59);
        
        const categories = {};
        
        txs.forEach(tx => {
            const txDate = this.parseDate(tx.date);
            if (tx.type === 'expense' && txDate >= startOfMonth && txDate <= endOfMonth) {
                categories[tx.category] = (categories[tx.category] || 0) + tx.amount;
            }
        });
        
        return categories;
    }
};
