import { getProductById } from "../../Services/ProductServices";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ElectronicsDetails from "../../Components/Details/ElectronicsDetails";

export default function ElectronicsDetailPage() {
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
        Loading Products...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{ paddingTop: "20px", textAlign: "center", fontSize: "1.4rem" }}
      >
        Item not found!.
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
        <ElectronicsDetails product={product} />
      </div>
    </div>
  );
}
