import { useState } from 'react';
import LeadTable from '../components/LeadTable';
import LeadFormModal from '../components/LeadFormModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import '../pages/styles/leads.css';
import{ getLeads, createLead, updateLead, deleteLead } from '../../routes/index.js';


function Leads(props) {
  const { data, setData } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingLead, setDeletingLead] = useState(null);

  // filter + search logic
  const filteredLeads = data.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddClick = () => {
    setEditingLead(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleSave = async (formData) => {
    if (editingLead) {
      const updatedLead = await updateLead(editingLead.id, formData);
      if(updatedLead?.success !== true) {
        console.error('Failed to update lead:', updatedLead);
        return;
      }
      setData(data.map((l) => (l.id === editingLead.id ? { ...formData, id: editingLead.id } : l)));
    } else {
      const newLead = { ...formData};
      const createdLead = await createLead(newLead);
      if(createdLead?.success !== true) {
        console.error('Failed to create lead:', createdLead);
        return;
      }
      setData([...data, { ...newLead, id: createdLead?.id }]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteClick = (lead) => {
    setDeletingLead(lead);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    const deletedLead = await deleteLead(deletingLead.id);
    if(deletedLead?.success !== true) {
      console.error('Failed to delete lead:', deletedLead);
      return;
    }
    setData(data.filter((l) => l.id !== deletingLead.id));
    setIsDeleteOpen(false);
    setDeletingLead(null);
  };

  return (
    <div className="leads-container">
      <div className="leads-header">
        <h1>Leads</h1>
      </div>

      <div className="leads-controls">
        <input
          type="text"
          placeholder="Search by name, company, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
        <button className="add-lead-btn" onClick={handleAddClick}>+ Add Lead</button>
      </div>

      <LeadTable leads={filteredLeads} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      <LeadFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        initialData={editingLead}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        leadName={deletingLead?.name}
      />
    </div>
  );
}

export default Leads;