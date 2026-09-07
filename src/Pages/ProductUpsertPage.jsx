import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Wrench,
  Sparkles,
  ArrowLeft,
  Upload,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Laptop,
  BookOpen,
} from "lucide-react";
import { productUpsert, getProductById } from "../Services/ProductServices";
import PriceDisplay from "../Components/Design/PriceDisplay";
import { toast } from "react-toastify";

export default function ProductUpsertPage() {
  const [searchParams] = useSearchParams();
  const isEditMode = Boolean(searchParams.get("id"));

  const [category, setCategory] = useState("electronics");
  const [docId, setDocId] = useState(() => searchParams.get("id") || "");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [stock, setStock] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setDocId("");
    setName("");
    setPrice("");
    setAuthor("");
    setStock("");
    setImageLink("");
    setDescription("");
    setFeatured(false);
    setError("");
  };

  const loadProduct = async (id) => {
    try {
      const existing = await getProductById(id);
      if (!existing) {
        setError("No product found with that ID");
        toast.error("No product found with that ID");
        return;
      }
      setCategory(existing.category || "electronics");
      setName(existing.name || existing.title || "");
      setAuthor(existing.author || "");
      setPrice(existing.price ?? "");
      setStock(existing.stock ?? "");
      setImageLink(existing.imageLink || "");
      setDescription(existing.description || "");
      setFeatured(existing.featured || false);
      toast.info(`Loaded product "${id}"`);
    } catch {
      setError("Failed to fetch product");
    }
  };

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      loadProduct(idFromUrl);
    }
  }, [searchParams]);

  const handleLoadExisting = async () => {
    if (!docId.trim()) {
      setError("Enter a Product ID first to load existing data");
      return;
    }
    await loadProduct(docId.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!docId.trim()) {
      setError("Product ID is required (e.g. electronics-7 or books-2).");
      return;
    }

    if (!name.trim() || price === "" || stock === "") {
      setError("Name, Price and Stock are required fields.");
      return;
    }

    const data = {
      name: name.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
      imageLink: imageLink.trim(),
      featured,
      description: description.trim() || `${name.trim()} Description`,
    };

    if (category === "books") {
      data.author = author.trim();
    }

    setSubmitting(true);
    try {
      await productUpsert(docId.trim(), data);
      toast.success(`Product "${docId.trim()}" saved successfully! 🎉`);
    } catch (err) {
      setError("Could not save product. Please try again.");
      toast.error("Failed to save product to database.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Wrench className="h-4 w-4" />
            <span>Admin Inventory Portal</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            {isEditMode ? "Modify Product" : "Add New Product"}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Create or update catalog items with real-time preview
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all self-start sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product ID & Load */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Product ID (Firestore Document ID)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={docId}
                    onChange={(e) => setDocId(e.target.value)}
                    placeholder="e.g. electronics-7 or books-7"
                    required
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleLoadExisting}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    Fetch
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs text-white outline-none focus:border-violet-500 cursor-pointer"
                >
                  <option value="electronics">Electronics</option>
                  <option value="books">Books</option>
                </select>
              </div>

              {/* Product Name */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  {category === "books" ? "Book Title" : "Product Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={category === "books" ? "e.g. The Great Gatsby" : "e.g. Ultra Gaming Laptop"}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
                />
              </div>

              {/* Author if books */}
              {category === "books" && (
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. F. Scott Fitzgerald"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
                  />
                </div>
              )}

              {/* Price & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="299.99"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="20"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  placeholder="https://images.pexels.com/..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive description highlighting specs, features, and warranty..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500 resize-none"
                />
              </div>

              {/* Featured Checkbox */}
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-violet-600 focus:ring-violet-500"
                />
                Mark as Featured Product (Displayed prominently on Home Page)
              </label>

              {/* Error Alert */}
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-600/30 hover:opacity-95 transition-all disabled:opacity-50 active:scale-95"
                >
                  <Save className="h-4 w-4" />
                  {submitting ? "Saving Product..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Live Interactive Card Preview */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-400">
                <Eye className="h-4 w-4" />
                <span>Live Card Preview</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Customer View
              </span>
            </div>

            {/* Preview Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                {imageLink ? (
                  <img
                    src={imageLink}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-600">
                    <Upload className="h-8 w-8" />
                    <span className="text-xs">No image provided</span>
                  </div>
                )}
                {featured && (
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-violet-600/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                    Featured
                  </span>
                )}
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                  {category}
                </span>
                <h4 className="font-bold text-white text-sm mt-0.5 truncate">
                  {name || "Product Name Placeholder"}
                </h4>
                {category === "books" && author && (
                  <p className="text-xs text-slate-400">by {author}</p>
                )}
                <div className="mt-2 flex items-baseline justify-between border-t border-slate-800/80 pt-2">
                  <span className="text-base font-black text-white">
                    <PriceDisplay price={price || 0} />
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {Number(stock) > 0 ? `${stock} in stock` : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
