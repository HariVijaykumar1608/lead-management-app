function StatCard({ label, count, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <p className="stat-label">{label}</p>
      <h2 className="stat-count">{count}</h2>
    </div>
  );
}

export default StatCard;