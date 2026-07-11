import Leads from '../components/Leads.jsx';
import StatCard from '../components/StatCard.jsx';
import './styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLeads } from '../../routes/index.js';
import { useToast } from '../components/ToastContext.jsx';

// Card definitions: label shown to users, the underlying status value
// (unchanged from the original data model), a color, and an icon.
// Renamed to plain, business-friendly language per the brief while
// keeping the same 5 status values (New / Contacted / Qualified / Won / Lost)
// so no backend or filtering logic changes.
const STAT_DEFS = [
  {
    key: 'total',
    label: 'Total Leads',
    color: '#2A5D63',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 5h12M3 9h12M3 13h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'New',
    label: 'New Leads',
    color: 'var(--status-new)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3.5v11M3.5 9h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'Contacted',
    label: 'Contacted',
    color: 'var(--status-contacted)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h9A1.5 1.5 0 0 1 15 5.5v5A1.5 1.5 0 0 1 13.5 12H8l-3 2.5V12H4.5A1.5 1.5 0 0 1 3 10.5v-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'Qualified',
    label: 'Qualified',
    color: 'var(--status-qualified)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3.5 9.5l3.5 3.5L14.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'Won',
    label: 'Won',
    color: 'var(--status-won)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2.5 10.9 6.5 15.2 7.1 12.1 10 12.9 14.3 9 12.3 5.1 14.3 5.9 10 2.8 7.1 7.1 6.5 9 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'Lost',
    label: 'Lost',
    color: 'var(--status-lost)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Dashboard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setLoading(true);
                const leadsData = await getLeads();
                setLeads(leadsData);
            } catch (error) {
                console.error('Error fetching leads:', error);
                showToast('Could not load leads. Please refresh.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stats = {
        total: leads?.length,
        New: leads?.filter(lead => lead.status === 'New')?.length,
        Contacted: leads?.filter(lead => lead.status === 'Contacted')?.length,
        Qualified: leads?.filter(lead => lead.status === 'Qualified')?.length,
        Won: leads?.filter(lead => lead.status === 'Won')?.length,
        Lost: leads?.filter(lead => lead.status === 'Lost')?.length,
    };

    const total = stats.total || 0;
    // Pipeline snapshot: proportion of leads currently in each stage.
    // Purely a derived visualization of existing data — no functional change.
    const pipelineSegments = STAT_DEFS.filter((d) => d.key !== 'total').map((d) => ({
        ...d,
        count: stats[d.key] || 0,
        pct: total > 0 ? ((stats[d.key] || 0) / total) * 100 : 0,
    }));

    const handleLogout = () => {
        navigate('/');
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Lead Dashboard</h1>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 14H3.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1H6M10.5 11.5 14 8l-3.5-3.5M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Logout
                </button>
            </div>

            {total > 0 && (
                <div className="pipeline-strip-card">
                    <div className="pipeline-strip-header">
                        <span>Pipeline snapshot</span>
                        <span className="pipeline-strip-total">{total} total leads</span>
                    </div>
                    <div className="pipeline-strip" role="img" aria-label="Proportion of leads in each stage">
                        {pipelineSegments.filter(s => s.count > 0).map((s) => (
                            <div
                                key={s.key}
                                className="pipeline-strip-segment"
                                style={{ width: `${s.pct}%`, background: s.color }}
                                title={`${s.label}: ${s.count}`}
                            />
                        ))}
                    </div>
                    <div className="pipeline-strip-legend">
                        {pipelineSegments.map((s) => (
                            <span key={s.key} className="legend-item">
                                <span className="legend-dot" style={{ background: s.color }} />
                                {s.label} · {s.count}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="stats-grid">
                {STAT_DEFS.map((def) => (
                    <StatCard
                        key={def.key}
                        label={def.label}
                        count={loading ? '–' : (stats[def.key] ?? 0)}
                        color={def.color}
                        icon={def.icon}
                    />
                ))}
            </div>

            <Leads data={leads} setData={setLeads} />
        </div>
    );
}

export default Dashboard;