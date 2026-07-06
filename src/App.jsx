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
import Footer from "../src/Components/Design/Footer";
import WishlistPage from "./Pages/WishlistPage";
import ProtectedRoute from "./Components/Functional/ProtectedRoute";
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/Login/SignUpPage";
import AuthListener from "./Components/Functional/AuthListener";
import ProductUpsertPage from "./Pages/ProductUpsertPage";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

const withAuth = (element) => <ProtectedRoute>{element}</ProtectedRoute>;
const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  {
    path: "/",
    element: <Layout>{withAuth(<HomePage />)}</Layout>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/electronics",
    element: <Layout>{withAuth(<ElectronicsPage />)}</Layout>,
  },
  {
    path: "/electronics/:id",
    element: <Layout>{withAuth(<ElectronicsDetailPage />)}</Layout>,
  },
  {
    path: "/books",
    element: <Layout>{withAuth(<BooksPage />)}</Layout>,
  },
  {
    path: "/books/:id",
    element: <Layout>{withAuth(<BooksDetailPage />)}</Layout>,
  },
  {
    path: "/cart",
    element: <Layout>{withAuth(<CartPage />)}</Layout>,
  },
  {
    path: "*",
    element: <Layout>{withAuth(<NotFoundPage />)}</Layout>,
  },
  {
    path: "/checkout",
    element: <Layout>{withAuth(<CheckoutPage />)}</Layout>,
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
]);

export default function App() {
  return (
    <>
      <AuthListener />
      <RouterProvider router={router} />
    </>
  );
}
