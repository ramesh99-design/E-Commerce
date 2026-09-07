import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, PackageX, ChevronRight } from "lucide-react";
import { getProductById, getProducts } from "../../Services/ProductServices";
import ElectronicsDetails from "../../Components/Details/ElectronicsDetails";
import ProductCard from "../../Components/Design/ProductCard";

export default function ElectronicsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductAndRelated() {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);

        // Fetch related products in the same category
        const all = await getProducts();
        const sameCat = all.filter(
          (p) => p.category?.toLowerCase() === "electronics" && p.id !== id
        ).slice(0, 4);
        setRelated(sameCat);
      } catch (error) {
        console.error("Failed to load product details:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProductAndRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
          <p className="text-sm font-medium">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center backdrop-blur-sm">
          <PackageX className="mb-4 h-12 w-12 text-slate-600" />
          <h2 className="text-xl font-bold text-slate-200">
            Product Not Found
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            The hardware device you are looking for is unavailable or has been archived.
          </p>
          <Link
            to="/electronics"
            className="mt-6 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-600/20 transition-all hover:bg-violet-500 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Electronics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 min-h-screen">
      {/* Breadcrumbs Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" />
        <Link to="/electronics" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Electronics</Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" />
        <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-[240px]">{product.name}</span>
      </nav>

      {/* Main Content Area */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-10 backdrop-blur-sm shadow-xl dark:shadow-2xl">
        <ElectronicsDetails product={product} />
      </div>

      {/* Related Products Shelf */}
      {related.length > 0 && (
        <div className="mt-16 border-t border-slate-200 dark:border-slate-800/80 pt-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Related Hardware
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Other premium gear our customers frequently pair together
              </p>
            </div>
            <Link
              to="/electronics"
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              View All Electronics →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                title={item.name}
                detailLabel="Electronics"
                onView={(relId) => navigate(`/electronics/${relId}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
