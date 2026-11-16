function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="delete-modal-box" style={{ textAlign: "center", padding: "10px 0" }}>
      <h3 style={{ fontSize: "17px", color: "#1a202c", marginBottom: "20px" }}>
        Are you sure you want to delete this product?
      </h3>
      <div className="delete-actions" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button
          type="button"
          className="btn-confirm-delete"
          onClick={onConfirm}
          style={{
            padding: "8px 18px",
            backgroundColor: "#e53e3e",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Yes, Delete
        </button>
        <button
          type="button"
          className="btn-cancel-delete"
          onClick={onCancel}
          style={{
            padding: "8px 18px",
            backgroundColor: "#edf2f7",
            color: "#4a5568",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
