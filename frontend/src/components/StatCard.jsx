function StatCard({ label, count, color, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: `color-mix(in srgb, ${color} 14%, white)`, color }}>
        {icon}
      </div>
      <div className="stat-card-body">
        <p className="stat-label">{label}</p>
        <h2 className="stat-count">{count}</h2>
      </div>
      <span className="stat-card-accent" style={{ background: color }} />
    </div>
  );
}

export default StatCard;