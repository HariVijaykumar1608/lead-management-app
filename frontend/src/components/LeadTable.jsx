const statusColors = {
  New: '#3b82f6',
  Contacted: '#f59e0b',
  Qualified: '#8b5cf6',
  Won: '#22c55e',
  Lost: '#ef4444',
};

function LeadTable({ leads, onEdit, onDelete }) {
  return (
    <table className="leads-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Source</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads?.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
              No leads found
            </td>
          </tr>
        ) : (
          leads?.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.source}</td>
              <td>
                <span
                  className="status-badge"
                  style={{ backgroundColor: statusColors[lead.status] }}
                >
                  {lead?.status}
                </span>
              </td>
              <td className="action-icons">
                <span onClick={() => onEdit(lead)} title="Edit">✏️</span>
                <span onClick={() => onDelete(lead)} title="Delete">🗑️</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default LeadTable;