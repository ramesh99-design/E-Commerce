import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ElectronicsPage from "./Pages/ProductPages/ElectronicsPage";
import BooksPage from "./Pages/ProductPages/BooksPage";
import CartPage from "./Pages/CartPage";
import NotFoundPage from "./Pages/NotFoundPage";
import Navbar from "./Components/Design/Navbar";
import ElectronicsDetailPage from "./Pages/ProductPages/ElectronicsDetailsPage";
import BooksDetailPage from "./Pages/ProductPages/BookDetailsPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderSummaryPage from "./Pages/OrderSummaryPage";
import Footer from "./Components/Design/Footer";
import WishlistPage from "./Pages/WishlistPage";
import ProtectedRoute from "./Components/Functional/ProtectedRoute";
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/Login/SignUpPage";
import AuthListener from "./Components/Functional/AuthListener";
import ProductUpsertPage from "./Pages/ProductUpsertPage";
import PaymentPages from "./Pages/PaymentPages";
import ScrollToTop from "./Components/Functional/ScrollToTop";
import { ThemeProvider } from "./Components/Functional/ThemeContext";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-violet-500 selection:text-white transition-colors duration-200">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

const withAuth = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

const router = createBrowserRouter([
  // Public Auth Pages
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },

  // Public Browsing Routes
  {
    path: "/",
    element: <Layout><HomePage /></Layout>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/electronics",
    element: <Layout><ElectronicsPage /></Layout>,
  },
  {
    path: "/electronics/:id",
    element: <Layout><ElectronicsDetailPage /></Layout>,
  },
  {
    path: "/books",
    element: <Layout><BooksPage /></Layout>,
  },
  {
    path: "/books/:id",
    element: <Layout><BooksDetailPage /></Layout>,
  },
  {
    path: "/cart",
    element: <Layout><CartPage /></Layout>,
  },

  // Protected User & Admin Routes
  {
    path: "/checkout",
    element: <Layout>{withAuth(<CheckoutPage />)}</Layout>,
  },
  {
    path: "/payment",
    element: <Layout>{withAuth(<PaymentPages />)}</Layout>,
  },
  {
    path: "/order-success",
    element: <Layout>{withAuth(<OrderSummaryPage />)}</Layout>,
  },
  {
    path: "/wishlist",
    element: <Layout>{withAuth(<WishlistPage />)}</Layout>,
  },
  {
    path: "/admin/products",
    element: <Layout>{withAuth(<ProductUpsertPage />)}</Layout>,
  },

  // 404
  {
    path: "*",
    element: <Layout><NotFoundPage /></Layout>,
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <AuthListener />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
