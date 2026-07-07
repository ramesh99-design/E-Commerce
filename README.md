# EZ-Shopping 🛍️

A full-stack e-commerce web application built with **React**, **Redux Toolkit**, and **Firebase**. Users can browse products across categories, manage a cart and wishlist, check out, and view order history — all backed by a real authentication flow and a live Firestore database.

Built solo, end-to-end: component architecture, state management, routing, authentication, and data modeling.

---

## ✨ Features

### Authentication
- Email/password signup and login via Firebase Auth
- Persistent sessions — auth state syncs automatically on page reload
- Protected routes — the entire app requires login to access
- Profile page to update name, email, and password

### Product Browsing
- Two product categories: **Electronics** and **Books**
- Live search by name/title
- Sorting by price (low → high, high → low) and name (A–Z, Z–A)
- Price-range and in-stock filtering
- Product detail pages with dynamic routing (`/electronics/:id`, `/books/:id`)

### Cart & Wishlist
- Add/remove items, adjust quantities, with stock-aware limits
- Wishlist separate from cart, with one-click "move to cart"
- Cart and wishlist counts shown live in the navbar

### Checkout & Orders
- Multi-field checkout form with local persistence (survives refresh)
- Order summary page generated on successful checkout
- Cart clears automatically after order placement

### Admin — Product Management
- Custom-built **upsert form** (create + update in one interface) for managing the product catalog directly against Firestore
- Edit mode pre-fills all fields from an existing product via URL parameter, triggered from any product's detail page
- Add mode for creating brand-new listings from scratch

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router |
| State Management | Redux Toolkit |
| Backend / Database | Firebase Firestore |
| Authentication | Firebase Auth |
| Styling | CSS3 |
| Tooling | Vite, Git |

---

## 📂 Project Structure

```
src/
├── Components/
│   ├── Design/          # Navbar, Footer, ProductCard, FilterBar, product detail views
│   └── Functional/      # SearchBar, SortDropDown, ProtectedRoute, AuthListener
├── Features/
│   ├── Auth/            # AuthSlice (Redux)
│   └── Cart/            # CartSlice, WishListSlice (Redux)
├── Pages/
│   ├── ProductPages/     # ElectronicsPage, BooksPage, detail pages
│   ├── Login/            # LoginPage, SignUpPage
│   └── ...                # HomePage, CartPage, CheckoutPage, OrderSummaryPage, WishlistPage, ProductUpsertPage
├── Services/
│   ├── AuthServices.js   # signup, login, logout, profile updates
│   └── ProductServices.js # Firestore reads + upsert
├── Data/
│   └── Dataset.jsx        # seed data for products
├── Firebase.js            # Firebase app initialization
├── Store.js                # Redux store configuration
└── App.jsx                  # Routing
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Firebase project with **Authentication** (Email/Password provider enabled) and **Firestore** set up

### Installation

```bash
git clone https://github.com/ramesh99-design/ez-shopping.git
cd ez-shopping
npm install
```

### Configure Firebase

Create `src/Firebase.js` with your own Firebase project credentials:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### Run the app

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🗺️ Roadmap / Future Improvements

- [ ] Admin-only access control for the product management page
- [ ] Image upload support (Firebase Storage) instead of manual URL entry
- [ ] Order history tied to user accounts (currently stored locally per session)
- [ ] Unit and integration tests

---

## 👤 Author

**Ramesh R**
[GitHub](https://github.com/ramesh99-design) · [LinkedIn](https://www.linkedin.com/in/ramesh-rb1bb6a49)