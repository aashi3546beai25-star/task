import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import DeleteModal from "./components/DeleteModal";
import "./App.css";

function App() {
  const API = "https://fakestoreapi.com/products";

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [notification, setNotification] = useState("");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Initial fetch error:", err));
  }, []);

  const saveProduct = async (product) => {
    try {
      if (productId) {
        // PUT request to Fake Store API
        fetch(`${API}/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }).catch((err) => console.log("PUT error:", err));

        // Update in frontend state
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, ...product, id: productId } : p))
        );
        showNotification("Product updated successfully!");
      } else {
        // POST request to Fake Store API
        const newTempId = Date.now();
        fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data && data.id) {
              setProducts((prev) =>
                prev.map((p) => (p.id === newTempId ? { ...p, id: data.id } : p))
              );
            }
          })
          .catch((err) => console.log("POST error:", err));

        // Immediately add to products state
        const newProduct = {
          ...product,
          id: newTempId,
        };
        setProducts((prev) => [newProduct, ...prev]);
        showNotification("Product added successfully!");
      }
    } catch (err) {
      console.error("Save error:", err);
      showNotification("Failed to save product.");
    } finally {
      setFormOpen(false);
      setProductId(null);
    }
  };

  const deleteProduct = async () => {
    if (!deleteId) return;

    try {
      fetch(`${API}/${deleteId}`, {
        method: "DELETE",
      }).catch((err) => console.log("DELETE error:", err));

      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      showNotification("Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      showNotification("Failed to delete product.");
    } finally {
      setDeleteOpen(false);
      setDeleteId(null);
    }
  };

  // Filter & Sort
  const filteredProducts = products
    .filter((p) => (p.title || "").toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sort === "asc") return Number(a.price) - Number(b.price);
      if (sort === "desc") return Number(b.price) - Number(a.price);
      return 0;
    });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Product Management</h1>
        <span className="product-count">Total Products: {products.length}</span>
      </div>

      {notification && <div className="notification-box">{notification}</div>}

      {/* Search, Filter, Sort and Add Product Button */}
      <div className="toolbar">
        <input
          type="text"
          className="search-box"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select-box"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(products.map((p) => p.category).filter(Boolean))).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="select-box"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <button
          type="button"
          className="btn-add-product"
          onClick={() => {
            setProductId(null);
            setFormOpen(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <p className="loading-state">Loading products from Fake Store API...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="loading-state">No products match your search or filter.</p>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={(id) => {
            setProductId(id);
            setFormOpen(true);
          }}
          onDelete={(id) => {
            setDeleteId(id);
            setDeleteOpen(true);
          }}
        />
      )}

      {/* Add / Edit Modal */}
      {formOpen && (
        <Modal close={() => setFormOpen(false)}>
          <ProductForm
            productId={productId}
            products={products}
            onSave={saveProduct}
          />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOpen && (
        <Modal close={() => setDeleteOpen(false)}>
          <DeleteModal
            onConfirm={deleteProduct}
            onCancel={() => setDeleteOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
