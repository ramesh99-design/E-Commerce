import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BooksDetails from "../../Components/Details/BooksDetails";
import { getProductById } from "../../Services/ProductServices";

export default function BooksDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        Loading Books...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{ paddingTop: "20px", textAlign: "center", fontSize: "1.4rem" }}
      >
        Item not found! Please check the URL and try again.
      </div>
    );
  }
  return (
    <div
      className="sidebar"
      style={{ paddingTop: "20px", textAlign: "center" }}
    >
      <h1>Product Details</h1>
      <div className="sidebar-content">
        <BooksDetails product={product} />
      </div>
    </div>
  );
}
