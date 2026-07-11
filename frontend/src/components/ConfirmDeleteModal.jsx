function ConfirmDeleteModal({ isOpen, onClose, onConfirm, leadName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box small">
        <h3>Delete Lead</h3>
        <p>Are you sure you want to delete <strong>{leadName}</strong>?</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="delete-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;