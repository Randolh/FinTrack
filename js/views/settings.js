/**
 * Settings View
 */
import { store } from '../store.js';
import { i18n } from '../i18n.js';

export const settingsView = {
    init(routerNavigate) {
        this.navigate = routerNavigate;
        
        this.formProfile = document.getElementById('form-settings-profile');
        this.btnExport = document.getElementById('btn-export');
        this.inputImport = document.getElementById('input-import');
        this.btnReset = document.getElementById('btn-reset');
        this.btnEndMonth = document.getElementById('btn-end-month');
        
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('settings-language').addEventListener('change', (e) => {
            store.setLanguage(e.target.value);
            i18n.translateDOM();
        });

        this.formProfile.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('settings-name').value;
            const salary = document.getElementById('settings-salary').value;
            const currency = document.getElementById('settings-currency').value;
            
            store.setProfile(name, salary, currency);
            alert(i18n.t('alert.profile_updated'));
            window.location.reload(); // Quick refresh to update symbols across app
        });

        this.btnExport.addEventListener('click', () => {
            const dataStr = store.exportData();
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `fintrack_backup_${new Date().toISOString().split('T')[0]}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        });

        this.inputImport.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const success = store.importData(event.target.result);
                if (success) {
                    alert('Data imported successfully!');
                    window.location.reload(); // Quickest way to re-init everything
                } else {
                    alert('Error importing data. Invalid file format.');
                }
            };
            reader.readAsText(file);
        });
        
        this.btnEndMonth.addEventListener('click', () => {
            if(confirm(i18n.t('alert.end_month_warn'))) {
                store.archiveCurrentMonth();
                window.location.reload();
            }
        });
        
        this.btnReset.addEventListener('click', () => {
            if(confirm(i18n.t('alert.reset_warn'))) {
                store.resetData();
                window.location.reload();
            }
        });
    },

    render() {
        const profile = store.getProfile();
        document.getElementById('settings-name').value = profile.name || '';
        document.getElementById('settings-salary').value = profile.salary || '';
        document.getElementById('settings-currency').value = store.getCurrency();
        document.getElementById('settings-language').value = store.getLanguage();
    }
};
