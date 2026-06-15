/**
 * Dashboard View
 */
import { store } from '../store.js';
import { finance } from '../finance.js';
import { ui } from '../ui.js';
import { i18n } from '../i18n.js';

export const dashboardView = {
    init() {
        // Elements
        this.elName = document.getElementById('dash-name');
        this.elBalance = document.getElementById('dash-balance');
        this.elSalary = document.getElementById('dash-salary');
        
        // Projection elements
        this.elProjAvg = document.getElementById('proj-avg-daily');
        this.elProjEnd = document.getElementById('proj-end-balance');
        this.elProjBroke = document.getElementById('proj-broke-in');
    },

    render() {
        const profile = store.getProfile();
        
        const helloTxt = i18n.t('dash.hello');
        this.elName.textContent = `${helloTxt} ${profile.name} 👋`;
        
        const salaryFormatted = finance.formatCurrency(profile.salary);
        this.elSalary.innerHTML = i18n.t('dash.of_base', salaryFormatted);

        this.updateProgress();
        this.updateProjections();
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
    
    updateProjections() {
        const proj = finance.getProjections();
        
        this.elProjAvg.textContent = finance.formatCurrency(proj.avgDaily);
        
        this.elProjEnd.textContent = finance.formatCurrency(proj.projectedRemaining);
        if (proj.projectedRemaining < 0) {
            this.elProjEnd.style.color = 'var(--color-danger)';
        } else {
            this.elProjEnd.style.color = 'var(--color-text-primary)';
        }
        
        if (proj.daysUntilZero === -1 || proj.daysUntilZero > 31) {
            this.elProjBroke.textContent = '> 1 mes';
        } else {
            this.elProjBroke.textContent = `${proj.daysUntilZero} días`;
        }
    },

    updateChart() {
        const expenses = finance.getExpensesByCategory();
        if (Object.keys(expenses).length > 0) {
            ui.renderCategoryChart('categoryChart', expenses, false);
            document.getElementById('categoryChart').parentElement.style.display = 'block';
        } else {
            document.getElementById('categoryChart').parentElement.style.display = 'none';
        }

        const incomes = finance.getIncomesByCategory();
        if (Object.keys(incomes).length > 0) {
            ui.renderCategoryChart('incomeChart', incomes, true);
            document.getElementById('incomeChart').parentElement.style.display = 'block';
        } else {
            document.getElementById('incomeChart').parentElement.style.display = 'none';
        }
    }
};
