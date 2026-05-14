import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { getStats, getTimeline, getTopPages } from '../api';

const COLORS = { page_view: '#6366f1', click: '#f43f5e' };
const PIE_COLORS = ['#6366f1', '#f43f5e'];

function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value ?? '—'}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

const shortLabel = (url) => {
  try { return new URL(url).pathname || '/'; } catch { return url; }
};

export default function Overview() {
  const [stats,    setStats]    = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getTimeline(), getTopPages()])
      .then(([s, t, p]) => {
        setStats(s.data);
        setTimeline(t.data);
        setTopPages(p.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const pieData = stats ? [
    { name: 'Page Views', value: stats.total_page_views },
    { name: 'Clicks',     value: stats.total_clicks },
  ] : [];

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
        <p className="text-sm text-gray-400 mt-0.5">All-time analytics summary</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Sessions"   value={stats?.total_sessions}   color="text-indigo-600" sub="unique visitors" />
        <StatCard label="Total Events"     value={stats?.total_events}     color="text-gray-800"   sub="all interactions" />
        <StatCard label="Total Clicks"     value={stats?.total_clicks}     color="text-rose-500"   sub="click events" />
        <StatCard label="Total Page Views" value={stats?.total_page_views} color="text-indigo-500" sub="page_view events" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Timeline — takes 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Events — Last 7 Days</h2>
          {timeline.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-300 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={timeline} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gPV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={d => d.slice(5)} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="page_view" name="Page Views" stroke="#6366f1" fill="url(#gPV)" strokeWidth={2} />
                <Area type="monotone" dataKey="click"     name="Clicks"     stroke="#f43f5e" fill="url(#gCL)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Event Breakdown</h2>
          {pieData.every(d => d.value === 0) ? (
            <div className="flex items-center justify-center h-48 text-gray-300 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                  dataKey="value" nameKey="name" paddingAngle={4}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Top Pages bar chart */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Top Pages</h2>
        {topPages.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-300 text-sm">No data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topPages} margin={{ top: 4, right: 16, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} height={70} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip formatter={(val, name) => [val, name === 'page_views' ? 'Page Views' : 'Clicks']} />
              <Legend />
              <Bar dataKey="page_views" name="Page Views" fill="#6366f1" radius={[4,4,0,0]} />
              <Bar dataKey="clicks"     name="Clicks"     fill="#f43f5e" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
