# Products Management Page (React & Fake Store API)

A clean, single-page application built with **React** and **Fake Store API** (`https://fakestoreapi.com`).

---

## 🚀 Features

- **Single-Page Focused:** Clean interface dedicated purely to products without sidebars or extraneous sub-menus.
- **GET:** Loads all 20 products and categories on startup.
- **POST:** Add new products via a validated modal form with immediate table update and success message.
- **PUT:** Edit existing products with pre-filled inputs and update in place.
- **DELETE:** Remove products with a confirmation dialog.
- **Search:** Search products by title in real-time.
- **Filter:** Filter by category dropdown.
- **Sort:** Sort products by price (Low to High and High to Low).

---

## 🛠️ Project Structure

```
task/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx        # Complete single-page React component (CRUD & filters)
    ├── App.css        # Clean, lightweight CSS styling
    ├── index.css
    └── main.jsx
```

---

## 💻 Running the App

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser.
