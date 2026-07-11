function ConfirmDeleteModal({ isOpen, onClose, onConfirm, leadName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-box small" onMouseDown={(e) => e.stopPropagation()}>
        <div className="delete-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 7v5M11 15v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M9.4 3.6 2.6 15.8a1.6 1.6 0 0 0 1.4 2.4h14a1.6 1.6 0 0 0 1.4-2.4L12.6 3.6a1.6 1.6 0 0 0-2.8 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>Delete Lead</h3>
        <p>Are you sure you want to delete <strong>{leadName}</strong>? This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="delete-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;