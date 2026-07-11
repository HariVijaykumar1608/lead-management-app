import Leads from '../components/Leads.jsx';
import StatCard from '../components/StatCard.jsx';
import './styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLeads } from '../../routes/index.js';


function Dashboard() {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const leadsData = await getLeads();
                setLeads(leadsData);
                console.log('Fetched leads:', leadsData);
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };

        fetchLeads();
    }, []);

    const stats = {
        total: leads?.length,
        New: leads?.filter(lead => lead.status === 'New')?.length,
        Contacted: leads?.filter(lead => lead.status === 'Contacted')?.length,
        Qualified: leads?.filter(lead => lead.status === 'Qualified')?.length,
        Won: leads?.filter(lead => lead.status === 'Won')?.length,
        Lost: leads?.filter(lead => lead.status === 'Lost')?.length,
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Lead Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="stats-grid">
                <StatCard label="Total Leads" count={stats.total} color="#2563eb" />
                <StatCard label="New" count={stats.New} color="#3b82f6" />
                <StatCard label="Contacted" count={stats.Contacted} color="#f59e0b" />
                <StatCard label="Qualified" count={stats.Qualified} color="#8b5cf6" />
                <StatCard label="Won" count={stats.Won} color="#22c55e" />
                <StatCard label="Lost" count={stats.Lost} color="#ef4444" />
            </div>

            <Leads data={leads} setData={setLeads} />
        </div>
    );
}

export default Dashboard;