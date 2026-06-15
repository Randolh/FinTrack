/**
 * Internationalization (i18n) Module
 */
import { store } from './store.js';

const dictionary = {
    en: {
        // App
        "app.title": "FinTrack",
        
        // Navigation
        "nav.dashboard": "Dashboard",
        "nav.history": "History",
        "nav.journal": "Journal",
        "nav.settings": "Settings",
        "nav.created_by": "Created by Randolh",
        
        // Onboarding
        "onboarding.welcome": "Welcome to FinTrack",
        "onboarding.subtitle": "Let's set up your initial data to get started.",
        "onboarding.name": "What's your name?",
        "onboarding.name_ph": "e.g. Randolh",
        "onboarding.salary": "Monthly Base Salary/Income",
        "onboarding.currency": "Preferred Currency",
        "onboarding.language": "Language",
        "onboarding.start": "Start Tracking",
        
        // Dashboard
        "dash.hello": "Hello,",
        "dash.subtitle": "Here's your financial summary.",
        "dash.balance": "Current Balance",
        "dash.of_base": "of {0} monthly base",
        "dash.budget_usage": "Budget Usage",
        "dash.projections": "Projections",
        "dash.avg_daily": "Avg. Daily Spend",
        "dash.proj_end": "Projected End Balance",
        "dash.broke_in": "Days until zero",
        "dash.today": "Today",
        "dash.this_week": "This Week",
        "dash.this_month": "This Month",
        "dash.expenses_category": "Expenses by Category",
        "dash.incomes_category": "Incomes by Category",
        "dash.no_expenses": "No expenses yet.",
        "dash.no_incomes": "No incomes yet.",
        
        "fab.tx": "Add Transaction",
        "fab.ref": "Add Reflection",
        
        // History
        "hist.title": "History",
        "hist.add": "Add",
        "hist.all": "All",
        "hist.expenses": "Expenses",
        "hist.incomes": "Incomes",
        "hist.empty": "No transactions yet.",
        
        // Journal
        "journ.title": "Financial Journal",
        "journ.subtitle": "Reflect on your spending decisions and emotions.",
        "journ.empty": "No reflections yet. Start journaling!",
        
        // Settings
        "set.title": "Settings",
        "set.profile": "Profile",
        "set.preferences": "Preferences",
        "set.name": "Name",
        "set.salary": "Monthly Base Salary",
        "set.currency": "Currency",
        "set.language": "Language",
        "set.update": "Update Profile",
        "set.data": "Data Management",
        "set.export": "Export Data (JSON)",
        "set.import": "Import Data",
        "set.end_month": "End Month & Archive",
        "set.clear_progress": "Clear Current Progress",
        "set.reset": "Reset All Data",
        
        // Modals - Transaction
        "modal.tx.title": "Add Record",
        "modal.tx.type": "Type",
        "modal.tx.expense": "Expense",
        "modal.tx.income": "Income",
        "modal.tx.amount": "Amount",
        "modal.tx.desc": "Description",
        "modal.tx.desc_ph": "e.g. Groceries",
        "modal.tx.date": "Date",
        "modal.tx.category": "Category",
        "modal.tx.save": "Save Record",
        
        // Modals - Reflection
        "modal.ref.title": "New Reflection",
        "modal.ref.topic": "Title / Topic",
        "modal.ref.topic_ph": "e.g. Impulse buying today...",
        "modal.ref.thoughts": "Your thoughts",
        "modal.ref.thoughts_ph": "How did you feel about your expenses today?",
        "modal.ref.mood": "Mood",
        "modal.ref.save": "Save Entry",
        
        // Categories
        "cat.food": "🍔 Food",
        "cat.transport": "🚗 Transport",
        "cat.utilities": "⚡ Utilities / Services",
        "cat.entertainment": "🍿 Entertainment",
        "cat.shopping": "🛍️ Shopping",
        "cat.other": "📦 Other",
        
        // Moods
        "mood.happy": "😊 Happy / Proud",
        "mood.neutral": "😐 Neutral",
        "mood.sad": "😔 Sad / Regretful",
        "mood.anxious": "😰 Anxious / Stressed",
        
        // JS Alerts
        "alert.profile_updated": "Profile updated successfully!",
        "alert.import_success": "Data imported successfully!",
        "alert.import_error": "Error importing data. Invalid file format.",
        "alert.end_month_warn": "This will archive current month's transactions and start a new month. Proceed?",
        "alert.end_month_error": "You have already archived this month. Wait until next month to archive again.",
        "alert.clear_progress_warn": "This will delete all your current month's transactions and reflections. Archives and settings will be preserved. Proceed?",
        "alert.reset_warn": "WARNING: This will delete all your data permanently. Are you sure?",
        "alert.delete_tx": "Are you sure you want to delete this record?",
        "alert.delete_ref": "Are you sure you want to delete this reflection?"
    },
    es: {
        "app.title": "FinTrack",
        
        "nav.dashboard": "Resumen",
        "nav.history": "Historial",
        "nav.journal": "Diario",
        "nav.settings": "Ajustes",
        "nav.created_by": "Creado por Randolh",
        
        "onboarding.welcome": "Bienvenido a FinTrack",
        "onboarding.subtitle": "Configuremos tus datos iniciales para empezar.",
        "onboarding.name": "¿Cuál es tu nombre?",
        "onboarding.name_ph": "ej. Alex",
        "onboarding.salary": "Salario/Ingreso Base Mensual",
        "onboarding.currency": "Moneda Preferida",
        "onboarding.language": "Idioma",
        "onboarding.start": "Comenzar",
        
        "dash.hello": "Hola,",
        "dash.subtitle": "Este es tu resumen financiero.",
        "dash.balance": "Saldo Actual",
        "dash.of_base": "de {0} base mensual",
        "dash.budget_usage": "Uso del Presupuesto",
        "dash.projections": "Proyecciones",
        "dash.avg_daily": "Gasto Promedio Diario",
        "dash.proj_end": "Saldo Final Proyectado",
        "dash.broke_in": "Días hasta saldo cero",
        "dash.today": "Hoy",
        "dash.this_week": "Esta Semana",
        "dash.this_month": "Este Mes",
        "dash.expenses_category": "Gastos por Categoría",
        "dash.incomes_category": "Ingresos por Categoría",
        "dash.no_expenses": "Aún no tienes gastos.",
        "dash.no_incomes": "Aún no tienes ingresos.",

        "fab.tx": "Añadir Registro",
        "fab.ref": "Añadir Reflexión",
        
        "hist.title": "Historial",
        "hist.add": "Añadir",
        "hist.all": "Todos",
        "hist.expenses": "Gastos",
        "hist.incomes": "Ingresos",
        "hist.empty": "Aún no tienes transacciones.",
        
        "journ.title": "Diario Financiero",
        "journ.subtitle": "Reflexiona sobre tus decisiones de gasto y emociones.",
        "journ.empty": "Aún no tienes reflexiones. ¡Empieza a escribir!",
        
        "set.title": "Ajustes",
        "set.profile": "Perfil",
        "set.preferences": "Preferencias",
        "set.name": "Nombre",
        "set.salary": "Salario Base Mensual",
        "set.currency": "Moneda",
        "set.language": "Idioma",
        "set.update": "Actualizar Perfil",
        "set.data": "Gestión de Datos",
        "set.export": "Exportar Datos (JSON)",
        "set.import": "Importar Datos",
        "set.end_month": "Cerrar Mes y Archivar",
        "set.clear_progress": "Limpiar Progreso Actual",
        "set.reset": "Borrar Todos los Datos",
        
        "modal.tx.title": "Añadir Registro",
        "modal.tx.type": "Tipo",
        "modal.tx.expense": "Gasto",
        "modal.tx.income": "Ingreso",
        "modal.tx.amount": "Monto",
        "modal.tx.desc": "Descripción",
        "modal.tx.desc_ph": "ej. Supermercado",
        "modal.tx.date": "Fecha",
        "modal.tx.category": "Categoría",
        "modal.tx.save": "Guardar Registro",
        
        "modal.ref.title": "Nueva Reflexión",
        "modal.ref.topic": "Título / Tema",
        "modal.ref.topic_ph": "ej. Compras impulsivas de hoy...",
        "modal.ref.thoughts": "Tus pensamientos",
        "modal.ref.thoughts_ph": "¿Cómo te sentiste respecto a tus gastos hoy?",
        "modal.ref.mood": "Estado de ánimo",
        "modal.ref.save": "Guardar Entrada",
        
        "cat.food": "🍔 Comida",
        "cat.transport": "🚗 Transporte",
        "cat.utilities": "⚡ Servicios",
        "cat.entertainment": "🍿 Ocio",
        "cat.shopping": "🛍️ Compras",
        "cat.other": "📦 Otro",
        
        "mood.happy": "😊 Feliz / Orgulloso",
        "mood.neutral": "😐 Neutral",
        "mood.sad": "😔 Triste / Arrepentido",
        "mood.anxious": "😰 Ansioso / Estresado",
        
        "alert.profile_updated": "¡Perfil actualizado con éxito!",
        "alert.import_success": "¡Datos importados con éxito!",
        "alert.import_error": "Error importando datos. Formato de archivo inválido.",
        "alert.end_month_warn": "Esto archivará las transacciones del mes actual e iniciará un nuevo mes. ¿Proceder?",
        "alert.end_month_error": "Ya has archivado los datos de este mes. Debes esperar al próximo mes para archivar nuevamente.",
        "alert.clear_progress_warn": "Esto borrará todas tus transacciones y reflexiones actuales. Los archivos históricos y los ajustes se conservarán. ¿Proceder?",
        "alert.reset_warn": "ADVERTENCIA: Esto borrará todos tus datos permanentemente. ¿Estás seguro?",
        "alert.delete_tx": "¿Estás seguro de que deseas borrar este registro?",
        "alert.delete_ref": "¿Estás seguro de que deseas borrar esta reflexión?"
    }
};

export const i18n = {
    translateDOM() {
        const lang = store.getLanguage() || 'es'; // default to spanish as requested in prompt possibly
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[lang] && dictionary[lang][key]) {
                if (el.tagName === 'INPUT' && el.type === 'text' || el.tagName === 'TEXTAREA') {
                    // Check if it's supposed to be a placeholder
                    if (el.hasAttribute('placeholder')) {
                        el.placeholder = dictionary[lang][key];
                    } else {
                        el.textContent = dictionary[lang][key];
                    }
                } else if (el.tagName === 'OPTION') {
                    el.textContent = dictionary[lang][key];
                } else {
                    el.textContent = dictionary[lang][key];
                }
            }
        });
    },
    
    t(key, ...args) {
        const lang = store.getLanguage() || 'es';
        let text = dictionary[lang] ? dictionary[lang][key] : dictionary['en'][key];
        
        if (!text) return key;
        
        if (args.length > 0) {
            args.forEach((arg, i) => {
                text = text.replace(`{${i}}`, arg);
            });
        }
        
        return text;
    }
};
