function Modal({ children, close }) {
  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "16px",
      }}
      onClick={close}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "480px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={close}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "#f3f4f6",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            padding: "4px 10px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
