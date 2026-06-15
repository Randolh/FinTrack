/**
 * Settings View
 */
import { store } from '../store.js';

export const settingsView = {
    init(routerNavigate) {
        this.navigate = routerNavigate;
        
        this.formProfile = document.getElementById('form-settings-profile');
        this.btnExport = document.getElementById('btn-export');
        this.inputImport = document.getElementById('input-import');
        this.btnReset = document.getElementById('btn-reset');
        
        this.bindEvents();
    },

    bindEvents() {
        this.formProfile.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('settings-name').value;
            const salary = document.getElementById('settings-salary').value;
            
            store.setProfile(name, salary);
            alert('Profile updated successfully!');
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
        
        this.btnReset.addEventListener('click', () => {
            if(confirm('WARNING: This will delete all your data permanently. Are you sure?')) {
                store.resetData();
                window.location.reload();
            }
        });
    },

    render() {
        const profile = store.getProfile();
        document.getElementById('settings-name').value = profile.name || '';
        document.getElementById('settings-salary').value = profile.salary || '';
    }
};
