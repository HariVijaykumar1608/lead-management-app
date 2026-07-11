import { useState, useEffect } from 'react';

function LeadFormModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: '',
    status: 'New',
    notes: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        source: '',
        status: 'New',
        notes: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{initialData ? 'Edit Lead' : 'Add Lead'}</h3>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Company</label>
          <input name="company" value={formData.company} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />

          <label>Source</label>
          <input name="source" value={formData.source} onChange={handleChange} />

          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Won</option>
            <option>Lost</option>
          </select>

          <label>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadFormModal;