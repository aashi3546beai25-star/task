import { useEffect, useState } from "react";

function ProductForm({ productId, products = [], onSave }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (productId) {
      // First, immediately populate from local state so fields are never empty
      const existing = products.find((p) => p.id === productId);
      if (existing) {
        setProduct({
          title: existing.title || "",
          price: existing.price !== undefined ? existing.price : "",
          description: existing.description || "",
          category: existing.category || "",
          image: existing.image || "",
        });
      }

      // Also attempt to fetch from Fake Store API if it's an original API item (id <= 20)
      if (typeof productId === "number" && productId <= 20) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data && data.title) {
              setProduct(data);
            }
          })
          .catch((err) => console.log("Fetch error:", err));
      }
    } else {
      setProduct({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      });
    }
  }, [productId, products]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, price: Number(product.price) });
  };

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}
    >
      <h2 style={{ fontSize: "18px", color: "#1a202c" }}>
        {productId ? "Edit Product" : "Add Product"}
      </h2>

      <div className="form-field">
        <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Title</label>
        <input
          name="title"
          placeholder="Title"
          value={product.title || ""}
          onChange={handleChange}
          required
          style={{ padding: "8px 10px", border: "1px solid #cbd5e0", borderRadius: "4px" }}
        />
      </div>

      <div className="form-field">
        <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Price</label>
        <input
          name="price"
          type="number"
          step="any"
          placeholder="Price"
          value={product.price || ""}
          onChange={handleChange}
          required
          style={{ padding: "8px 10px", border: "1px solid #cbd5e0", borderRadius: "4px" }}
        />
      </div>

      <div className="form-field">
        <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={product.description || ""}
          onChange={handleChange}
          required
          rows={3}
          style={{ padding: "8px 10px", border: "1px solid #cbd5e0", borderRadius: "4px", resize: "vertical" }}
        />
      </div>

      <div className="form-field">
        <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Category</label>
        <input
          name="category"
          placeholder="Category"
          value={product.category || ""}
          onChange={handleChange}
          required
          style={{ padding: "8px 10px", border: "1px solid #cbd5e0", borderRadius: "4px" }}
        />
      </div>

      <div className="form-field">
        <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Image URL</label>
        <input
          name="image"
          placeholder="Image URL"
          value={product.image || ""}
          onChange={handleChange}
          style={{ padding: "8px 10px", border: "1px solid #cbd5e0", borderRadius: "4px" }}
        />
      </div>

      <button
        type="submit"
        className="btn-submit"
        style={{
          padding: "10px",
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          fontWeight: "600",
          cursor: "pointer",
          marginTop: "6px",
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default ProductForm;
