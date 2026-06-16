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
        
        // Find total fixed expenses (non-daily) for the month
        const txs = store.getTransactions();
        const startOfMonth = this.getStartOfMonth();
        const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
        
        let fixedExpenses = 0;
        txs.forEach(tx => {
            const txDate = this.parseDate(tx.date);
            const isNonDaily = tx.isDaily === false; // backward compatibility: undefined is true
            if (tx.type === 'expense' && isNonDaily && txDate >= startOfMonth && txDate <= endOfMonth) {
                fixedExpenses += tx.amount;
            }
        });
        
        // Daily and weekly are based on what's left after fixed expenses
        const remainingBase = Math.max(0, salary - fixedExpenses);
        
        const daily = remainingBase / daysInMonth;
        const weekly = daily * 7;
        const monthly = salary; // Base salary is considered monthly

        return { daily, weekly, monthly, fixedExpenses };
    },

    // Get expenses/incomes within a date range
    getTotalsForRange(startDate, endDate, onlyDailyExpenses = false) {
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
                    const isDaily = tx.isDaily !== false; // backward compatibility
                    if (!onlyDailyExpenses || isDaily) {
                        expenses += tx.amount;
                    }
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
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0, 23, 59, 59);

        // We only include daily expenses for daily and weekly to match the budget subtraction
        const todayTotals = this.getTotalsForRange(today, today, true);
        const weekTotals = this.getTotalsForRange(startOfWeek, endOfWeek, true);
        // Monthly still shows all expenses against the full base salary
        const monthTotals = this.getTotalsForRange(startOfMonth, endOfMonth, false);

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

    // Calculate projections based on current daily average
    getProjections() {
        const d = this.getToday();
        const startOfMonth = this.getStartOfMonth();
        
        // Days passed in this month (including today)
        const daysPassed = Math.max(1, Math.floor((d - startOfMonth) / (1000 * 60 * 60 * 24)) + 1);
        
        // Total spent this month excluding fixed expenses
        const spentSoFar = this.getTotalsForRange(startOfMonth, d, true).expenses;
        
        // Average spent per day
        const avgDaily = spentSoFar / daysPassed;
        
        const stats = this.getProgressStats();
        const remainingMoney = stats.month.remaining;
        
        const daysInMonth = this.getDaysInMonth(d.getFullYear(), d.getMonth());
        const daysLeft = daysInMonth - daysPassed;
        
        // Projected remaining at end of month
        const projectedRemaining = remainingMoney - (avgDaily * daysLeft);
        
        // Days until zero
        let daysUntilZero = -1;
        if (avgDaily > 0) {
            daysUntilZero = Math.floor(remainingMoney / avgDaily);
        }
        
        return { avgDaily, projectedRemaining, daysUntilZero };
    },

    // Format currency
    formatCurrency(amount) {
        const currency = store.getCurrency();
        return new Intl.NumberFormat(store.getLanguage() || 'es', {
            style: 'currency',
            currency: currency
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
    },
    
    // Group incomes by category for current month
    getIncomesByCategory() {
        const txs = store.getTransactions();
        const startOfMonth = this.getStartOfMonth();
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0, 23, 59, 59);
        
        const categories = {};
        
        txs.forEach(tx => {
            const txDate = this.parseDate(tx.date);
            if (tx.type === 'income' && txDate >= startOfMonth && txDate <= endOfMonth) {
                // If there's no specific income category provided, group by 'Income' or default category name
                let cat = tx.category || 'income';
                categories[cat] = (categories[cat] || 0) + tx.amount;
            }
        });
        
        return categories;
    }
};
