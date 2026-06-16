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
        "dash.proj_explanation": "If you spend an average of {0} a day, your money will run out in {1} days.",
        "dash.proj_explanation_safe": "At your current average of {0} a day, your money will last more than 1 month.",
        "dash.today": "Today",
        "dash.this_week": "This Week",
        "dash.this_month": "This Month",
        "dash.expenses_category": "Expenses by Category",
        "dash.incomes_category": "Incomes by Category",
        "dash.expenses_necessity": "Expenses by Necessity",
        "dash.no_expenses": "No expenses yet.",
        "dash.no_incomes": "No incomes yet.",
        "dash.no_necessity": "No categorized expenses yet.",
        "dash.adv_stats": "Advanced Statistics",
        "dash.est_avg": "Estimated Month Avg",
        "dash.est_avg_desc": "Total spend diluted over all days of the month",
        "dash.real_avg": "Spend-Day Avg",
        "dash.real_avg_desc": "Average spend only on days you actually spent money",
        "dash.based_on_days": "Based on {0} days",
        "dash.based_on_spend_days": "Based on {0} spend days",
        "dash.emotional_meter": "Emotional Meter",
        "dash.mood_summary": "Mood based on reflections:",
        "dash.no_reflections": "No reflections this month.",
        
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
        "modal.tx.is_daily": "Count towards Daily",
        "modal.tx.save": "Save Record",
        "modal.tx.necessity": "Necessity",
        
        "nec.indispensable": "🟢 Indispensable",
        "nec.important": "🟡 Important",
        "nec.non_essential": "🟠 Non-essential",
        "nec.trivial": "🟤 Trivial (Latte Factor)",
        "nec.impulse": "🔴 Impulse",
        
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
        "cat.education": "🎓 Education",
        "cat.savings": "💰 Savings",
        "cat.emergency": "🚨 Emergency",
        "cat.health": "🏥 Health",
        "cat.payments": "💳 Payments",
        "cat.salary": "💼 Salary",
        "cat.business": "📈 Business / Sales",
        "cat.freelance": "🛠️ Freelance / Services",
        "cat.investments": "💹 Investments",
        "cat.gifts": "🎁 Gifts",
        "cat.refunds": "↩️ Refunds",
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
        "onboarding.name_ph": "ej. Randolh",
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
        "dash.proj_explanation": "Si gastas un promedio de {0} al día, tu dinero se agotará en {1} días.",
        "dash.proj_explanation_safe": "Con un promedio de {0} al día, tu dinero durará más de 1 mes.",
        "dash.today": "Hoy",
        "dash.this_week": "Esta Semana",
        "dash.this_month": "Este Mes",
        "dash.expenses_category": "Gastos por Categoría",
        "dash.incomes_category": "Ingresos por Categoría",
        "dash.expenses_necessity": "Gastos por Necesidad",
        "dash.no_expenses": "Aún no tienes gastos.",
        "dash.no_incomes": "Aún no tienes ingresos.",
        "dash.no_necessity": "No hay gastos categorizados.",
        "dash.adv_stats": "Estadísticas Avanzadas",
        "dash.est_avg": "Promedio Mes Estimado",
        "dash.est_avg_desc": "Gasto total diluido en todos los días del mes",
        "dash.real_avg": "Promedio Días de Consumo",
        "dash.real_avg_desc": "Promedio de gasto solo en los días que registraste salidas de dinero",
        "dash.based_on_days": "Calculado sobre {0} días",
        "dash.based_on_spend_days": "Calculado sobre {0} días de consumo",
        "dash.emotional_meter": "Medidor Emocional",
        "dash.mood_summary": "Estado de ánimo basado en reflexiones:",
        "dash.no_reflections": "No hay reflexiones este mes.",

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
        "modal.tx.is_daily": "Contar como Gasto Diario",
        "modal.tx.save": "Guardar Registro",
        "modal.tx.necessity": "Nivel de Necesidad",
        
        "nec.indispensable": "🟢 Indispensable",
        "nec.important": "🟡 Importante",
        "nec.non_essential": "🟠 No Indispensable",
        "nec.trivial": "🟤 Gasto Hormiga",
        "nec.impulse": "🔴 Impulso",
        
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
        "cat.education": "🎓 Educación",
        "cat.savings": "💰 Ahorros",
        "cat.emergency": "🚨 Emergencia",
        "cat.health": "🏥 Salud",
        "cat.payments": "💳 Pagos",
        "cat.salary": "💼 Salario",
        "cat.business": "📈 Negocios / Ventas",
        "cat.freelance": "🛠️ Trabajos / Servicios",
        "cat.investments": "💹 Inversiones",
        "cat.gifts": "🎁 Regalos",
        "cat.refunds": "↩️ Reembolsos",
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
