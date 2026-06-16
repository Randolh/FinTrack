# FinTrack 🌱

FinTrack is a smart, local-first, and private personal finance tracking application. Unlike traditional finance apps, FinTrack goes beyond just numbers by integrating an **Emotional Wellness** component—helping you reflect on how your spending habits impact your mood.

Everything runs entirely in your browser using `localStorage`. No databases, no servers, and absolutely no data leaves your device. 

## ✨ Key Features

- **📊 Advanced Dashboard & Timelines:** Visualize your financial health with interactive Category & Necessity Doughnut charts, and a detailed Daily Evolution line chart to spot spending peaks.
- **🟢 Necessity Tracking:** Categorize your expenses by how necessary they truly were (Indispensable, Necessary, Important, Non-essential, Trivial/Latte Factor, or Impulse).
- **🧠 Financial Journal & Emotional Meter:** Add reflections to your expenses and track your overall financial mood throughout the month.
- **🔮 Smart Projections:** Calculate your estimated end-of-month balance and see exactly how many days you have until your balance hits zero based on your real daily spending habits.
- **🌍 Bilingual & Themed:** Full support for English and Spanish, alongside a gorgeous Light and Dark mode toggle.
- **📱 Fully Responsive:** Carefully designed mobile-first layout that looks and works like a native app on your phone, with a responsive grid layout for desktop.

## 🚀 How to Run

Because FinTrack is a purely client-side application, you don't need `npm`, `node`, or any build tools to run it.

1. **Option 1 (Quickest):** Simply double-click the `index.html` file to open it in your favorite web browser.
2. **Option 2 (Recommended for dev):** Use an extension like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code to serve the directory locally.

## 🛠️ Built With

- **HTML5 & CSS3** (Vanilla, CSS Variables for Theming)
- **Vanilla JavaScript** (ES6 Modules)
- **Chart.js** (For data visualization)
- **FontAwesome** (For iconography)
- **Google Fonts** (Inter)

## 📁 Project Structure

```text
FinTrack/
├── index.html          # Main application shell
├── favicon.svg         # App icon
├── css/                # Styling
│   ├── main.css        # Variables, resets, and themes
│   ├── layout.css      # Header, navigation, app shell
│   ├── components.css  # Buttons, inputs, modals, chips
│   └── views.css       # Specific view layouts (Dashboard, History, Settings)
└── js/                 # Logic
    ├── app.js          # App initialization and routing
    ├── store.js        # LocalStorage state management
    ├── finance.js      # Business logic, math, and projections
    ├── ui.js           # Chart rendering and DOM utilities
    ├── i18n.js         # Internationalization (EN/ES)
    └── views/          # Controller logic per view
        ├── dashboard.js
        ├── transactions.js
        ├── journal.js
        └── settings.js
```

## 🔒 Privacy

Your data is yours. All transactions, profiles, and reflections are saved locally in your browser's `localStorage`. Clearing your browser data will clear your FinTrack data. (Export/Import functionality coming soon).
