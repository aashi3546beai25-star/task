function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table border="1" className="product-table-view">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td style={{ textAlign: "center" }}>{product.id}</td>
            <td style={{ textAlign: "center" }}>
              <img
                src={product.image}
                alt={product.title}
                width="50"
                height="50"
                style={{ objectFit: "contain" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/50x50?text=No+Img";
                }}
              />
            </td>
            <td className="table-title">{product.title}</td>
            <td className="table-price">${Number(product.price).toFixed(2)}</td>
            <td className="table-desc">{product.description}</td>
            <td>{product.category}</td>
            <td className="table-actions">
              <button
                type="button"
                className="btn-edit"
                onClick={() => onEdit(product.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
