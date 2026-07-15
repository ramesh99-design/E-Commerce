import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { productUpsert, getProductById } from "../Services/ProductServices";

export default function ProductUpsertPage() {
  const [searchParams] = useSearchParams();
  const isEditMode = Boolean(searchParams.get("id"));

  const [category, setCategory] = useState("electronics");
  const [docId, setDocId] = useState(() => searchParams.get("id"));
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [stock, setStock] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState("");

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState("");

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
  };

  const loadProduct = async (id) => {
    const existing = await getProductById(id);
    if (!existing) {
      setError("No product found with that ID");
      return;
    }
    setCategory(existing.category || "electronics");
    setName(existing.name || "");
    setAuthor(existing.author || "");
    setPrice(existing.price ?? "");
    setStock(existing.stock ?? "");
    setImageLink(existing.imageLink || "");
    setDescription(existing.description || "");
    setFeatured(existing.featured || false);
  };

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      loadProduct(idFromUrl);
    }
  }, [searchParams]);

  const handleLoadExisting = async () => {
    if (!docId.trim()) {
      setError("Enter a ProductID first to load an Existing Product");
      return;
    }
    await loadProduct(docId.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!docId.trim()) {
      setError("Product ID is required (e.g electronics-7 or books-2).");
      return;
    }

    if (!name.trim() || price === "" || stock === "") {
      setError("Name, Price and Stock are required");
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
      setStatus(`Product "${docId.trim()}" saved successfully.`);
    } catch {
      setError("Could not save product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "500px", margin: "3rem auto" }}
    >
      <h1>{isEditMode ? "Edit Product" : "Add Product"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Product ID: </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            className="search-input"
            placeholder="e.g electronics-7 or books-7"
            required
          />
          <button
            type="button"
            className="btn-primary-link"
            onClick={handleLoadExisting}
          >
            Load
          </button>
        </div>
        <br />
        <label>Category: </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="search-input"
          value={category}
          style={{ width: "100%" }}
        >
          <br />
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
        </select>
        <br />
        <br />
        <label>{category === "books" ? "Title" : "Name"}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="search-input"
          required
        />
        <br />
        <br />
        {category === "books" && (
          <>
            <label>Author: </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="search-input"
            />
            <br />
            <br />
          </>
        )}
        <label>Price: </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="search-input"
          min="0"
          required
        />
        <br />
        <br />
        <label>Image URL: </label>
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          className="search-input"
          placeholder="https://..."
        />
        <br />
        <br />
        <label>Stock: </label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="search-input"
          min="0"
          required
        />
        <br />
        <br />
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="search-input"
          style={{ width: "100%", minHeight: "80px" }}
        />
        <br />
        <br />
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {status && <p style={{ color: "green" }}>{status}</p>}

        <div className="card-buttons">
          <button type="submit" className="btn-link" disabled={submitting}>
            {submitting ? "Saving" : "Save"}
          </button>
          <button
            type="button"
            className="btn-danger-link"
            style={{ marginLeft: "0.5rem" }}
            onClick={resetForm}
          >
            Clear Form
          </button>
          <button className="btn-primary-link" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
