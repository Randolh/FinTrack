/**
 * Reflections / Journal View
 */
import { store } from '../store.js';
import { ui } from '../ui.js';
import { i18n } from '../i18n.js';

export const reflectionsView = {
    init() {
        this.form = document.getElementById('form-reflection');
        this.listEl = document.getElementById('reflection-list');
        
        this.bindEvents();
    },

    bindEvents() {
        // Form submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('ref-title').value;
            const content = document.getElementById('ref-content').value;
            const mood = document.getElementById('ref-mood').value;

            store.addReflection({ title, content, mood });
            
            // Reset form and close modal
            this.form.reset();
            ui.closeAddReflectionModal();
            
            // Refresh list
            this.render();
        });

        // Delete delegation
        this.listEl.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.js-delete-ref');
            if (deleteBtn) {
                const id = deleteBtn.dataset.id;
                if(confirm(i18n.t('alert.delete_ref'))) {
                    store.deleteReflection(id);
                    this.render();
                }
            }
        });
    },

    render() {
        this.renderList();
    },

    renderList() {
        const reflections = store.getReflections();

        if (reflections.length === 0) {
            this.listEl.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-book-open empty-state__icon"></i>
                    <p class="empty-state__text">No reflections yet. Start journaling!</p>
                </div>
            `;
            return;
        }

        const moodIcons = {
            happy: { icon: 'fa-face-smile', color: 'var(--color-success)' },
            neutral: { icon: 'fa-face-meh', color: 'var(--color-text-secondary)' },
            sad: { icon: 'fa-face-sad-tear', color: 'var(--color-warning)' },
            anxious: { icon: 'fa-face-grimace', color: 'var(--color-danger)' }
        };

        this.listEl.innerHTML = reflections.map(ref => {
            const moodData = moodIcons[ref.mood] || moodIcons.neutral;
            const formattedDate = new Date(ref.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

            return `
                <div class="card" style="margin-bottom: var(--spacing-md); position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-sm);">
                        <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                            <i class="fa-solid ${moodData.icon}" style="color: ${moodData.color}; font-size: 1.5rem;"></i>
                            <div>
                                <h4 style="margin: 0; font-size: var(--font-size-base); color: var(--color-text-primary);">${ref.title}</h4>
                                <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">${formattedDate}</span>
                            </div>
                        </div>
                        <button class="btn-icon js-delete-ref" data-id="${ref.id}" aria-label="Delete" style="width:30px; height:30px; font-size:0.8rem; color:var(--color-danger);">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin: 0; white-space: pre-wrap;">${ref.content}</p>
                </div>
            `;
        }).join('');
    }
};
