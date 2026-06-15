/**
 * Dashboard View
 */
import { store } from '../store.js';
import { finance } from '../finance.js';
import { ui } from '../ui.js';

export const dashboardView = {
    init() {
        // Elements
        this.elName = document.getElementById('dash-name');
        this.elBalance = document.getElementById('dash-balance');
        this.elSalary = document.getElementById('dash-salary');
    },

    render() {
        const profile = store.getProfile();
        this.elName.textContent = profile.name;
        this.elSalary.textContent = finance.formatCurrency(profile.salary);

        this.updateProgress();
        this.updateChart();
    },

    updateProgress() {
        const stats = finance.getProgressStats();
        
        // Update Balance Card (using Month remaining)
        this.elBalance.textContent = finance.formatCurrency(stats.month.remaining);

        // Map UI IDs to stats keys
        const periods = ['day', 'week', 'month'];
        
        periods.forEach(period => {
            const data = stats[period];
            const elVal = document.getElementById(`prog-${period}-val`);
            const elFill = document.getElementById(`prog-${period}-fill`);

            elVal.textContent = `${finance.formatCurrency(data.spent)} / ${finance.formatCurrency(data.budget)}`;
            elFill.style.width = `${data.percent}%`;

            // Color coding based on usage
            elFill.className = 'progress-bar__fill';
            if (data.percent >= 90) {
                elFill.classList.add('danger');
            } else if (data.percent >= 75) {
                elFill.classList.add('warning');
            }
        });
    },

    updateChart() {
        const expenses = finance.getExpensesByCategory();
        
        if (Object.keys(expenses).length === 0) {
            // Provide empty data or hide chart
            const container = document.querySelector('.dashboard-chart');
            if(container) container.style.display = 'none';
        } else {
            const container = document.querySelector('.dashboard-chart');
            if(container) container.style.display = 'block';
            ui.renderCategoryChart('categoryChart', expenses);
        }
    }
};
