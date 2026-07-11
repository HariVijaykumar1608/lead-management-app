const statusColors = {
  New: 'var(--status-new)',
  Contacted: 'var(--status-contacted)',
  Qualified: 'var(--status-qualified)',
  Won: 'var(--status-won)',
  Lost: 'var(--status-lost)',
};

function LeadTable({ leads, onEdit, onDelete }) {
  return (
    <div className="leads-table-wrap">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads?.length === 0 ? (
            <tr>
              <td colSpan="7">
                <div className="empty-state">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="7" y="10" width="26" height="22" rx="3" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M7 16h26M13 22h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <p className="empty-title">No leads found</p>
                  <p className="empty-subtitle">Try adjusting your search or filters, or add a new lead to get started.</p>
                </div>
              </td>
            </tr>
          ) : (
            leads?.map((lead) => (
              <tr key={lead.id}>
                <td className="cell-name">{lead.name}</td>
                <td>{lead.company}</td>
                <td className="cell-muted">{lead.email}</td>
                <td className="cell-muted">{lead.phone}</td>
                <td>{lead.source}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${statusColors[lead.status]} 14%, white)`,
                      color: statusColors[lead.status],
                    }}
                  >
                    <span className="status-dot" style={{ background: statusColors[lead.status] }} />
                    {lead?.status}
                  </span>
                </td>
                <td className="action-icons">
                  <button className="icon-btn" onClick={() => onEdit(lead)} title="Edit lead" aria-label={`Edit ${lead.name}`}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M10.5 2.5 12.5 4.5 5 12H3v-2l7.5-7.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="icon-btn icon-btn--danger" onClick={() => onDelete(lead)} title="Delete lead" aria-label={`Delete ${lead.name}`}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M3 4.5h9M6 4.5V3h3v1.5M4.5 4.5 5 12h5l.5-7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;