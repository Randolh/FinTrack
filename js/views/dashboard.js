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
        this.elProjExplanation = document.getElementById('proj-explanation');
    },

    render() {
        const profile = store.getProfile();
        
        this.elName.textContent = profile.name;
        
        const salaryFormatted = finance.formatCurrency(profile.salary);
        this.elSalary.innerHTML = i18n.t('dash.of_base', salaryFormatted);

        this.updateProgress();
        this.updateProjections();
        this.updateAdvancedAverages();
        this.updateChart();
        this.updateMood();
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
        
        const avgFormatted = finance.formatCurrency(proj.avgDaily);
        if (proj.daysUntilZero === -1 || proj.daysUntilZero > 31) {
            this.elProjBroke.textContent = '> 1 mes';
            this.elProjExplanation.textContent = i18n.t('dash.proj_explanation_safe', avgFormatted);
        } else {
            this.elProjBroke.textContent = `${proj.daysUntilZero} días`;
            this.elProjExplanation.textContent = i18n.t('dash.proj_explanation', avgFormatted, proj.daysUntilZero.toString());
        }
    },

    updateAdvancedAverages() {
        const adv = finance.getAdvancedAverages();
        const estAvgEl = document.getElementById('dash-est-avg');
        const realAvgEl = document.getElementById('dash-real-avg');
        const estDaysEl = document.getElementById('dash-est-days');
        const realDaysEl = document.getElementById('dash-real-days');
        
        if (estAvgEl && realAvgEl) {
            estAvgEl.textContent = finance.formatCurrency(adv.estimatedAverage);
            realAvgEl.textContent = finance.formatCurrency(adv.actualSpendAverage);
            
            if (estDaysEl) estDaysEl.textContent = i18n.t('dash.based_on_days', adv.daysInMonth.toString());
            if (realDaysEl) realDaysEl.textContent = i18n.t('dash.based_on_spend_days', adv.spendDaysCount.toString());
        }
    },

    updateChart() {
        const expenses = finance.getExpensesByCategory();
        const canvasExp = document.getElementById('categoryChart');
        const emptyExp = document.getElementById('categoryChartEmpty');
        
        if (Object.keys(expenses).length > 0) {
            canvasExp.style.display = 'block';
            emptyExp.style.display = 'none';
            ui.renderCategoryChart('categoryChart', expenses, false);
        } else {
            canvasExp.style.display = 'none';
            emptyExp.style.display = 'block';
            if (ui.expenseChart) { ui.expenseChart.destroy(); ui.expenseChart = null; }
        }

        const incomes = finance.getIncomesByCategory();
        const canvasInc = document.getElementById('incomeChart');
        const emptyInc = document.getElementById('incomeChartEmpty');
        
        if (Object.keys(incomes).length > 0) {
            canvasInc.style.display = 'block';
            emptyInc.style.display = 'none';
            ui.renderCategoryChart('incomeChart', incomes, true);
        } else {
            canvasInc.style.display = 'none';
            emptyInc.style.display = 'block';
            if (ui.incomeChart) { ui.incomeChart.destroy(); ui.incomeChart = null; }
        }

        const necessities = finance.getExpensesByNecessity();
        const canvasNec = document.getElementById('necessityChart');
        const emptyNec = document.getElementById('necessityChartEmpty');
        
        if (Object.keys(necessities).length > 0) {
            canvasNec.style.display = 'block';
            emptyNec.style.display = 'none';
            ui.renderNecessityChart('necessityChart', necessities);
        } else {
            canvasNec.style.display = 'none';
            emptyNec.style.display = 'block';
            if (ui.necessityChart) { ui.necessityChart.destroy(); ui.necessityChart = null; }
        }
    },

    updateMood() {
        const reflections = store.getReflections();
        const container = document.getElementById('dash-mood-container');
        const empty = document.getElementById('dash-mood-empty');

        if (!container || !empty) return;

        if (reflections.length === 0) {
            container.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        container.style.display = 'flex';
        empty.style.display = 'none';

        // Calculate counts
        const counts = { happy: 0, neutral: 0, sad: 0, anxious: 0 };
        reflections.forEach(r => {
            if (counts[r.mood] !== undefined) counts[r.mood]++;
        });

        // Emojis mapping
        const emojis = { happy: '😊', neutral: '😐', sad: '😔', anxious: '😰' };
        
        container.innerHTML = '';
        const total = reflections.length;
        
        Object.keys(counts).forEach(mood => {
            const count = counts[mood];
            const percent = Math.round((count / total) * 100);
            const el = document.createElement('div');
            el.style.textAlign = 'center';
            el.innerHTML = `
                <div style="font-size: 2rem;">${emojis[mood]}</div>
                <div style="font-size: var(--font-size-sm); font-weight: 600; margin-top: 4px;">${percent}%</div>
            `;
            if (count === 0) el.style.opacity = '0.3';
            container.appendChild(el);
        });
    }
};
