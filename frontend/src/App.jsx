import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Overview  from './pages/Overview';
import Sessions  from './pages/Sessions';
import Heatmap   from './pages/Heatmap';

const NAV_LINKS = [
  { to: '/overview',  label: 'Overview'  },
  { to: '/sessions',  label: 'Sessions'  },
  { to: '/heatmap',   label: 'Heatmap'   },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-2 shadow">
        <span className="text-red-400 font-bold text-lg mr-auto">Analytics Dashboard</span>

        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-4 py-2 rounded text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        <a
          href="https://user-analytics-hq8r.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="ml-2 px-4 py-2 rounded text-sm font-medium border border-red-400 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
        >
          Demo Site ↗
        </a>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        <Routes>
          <Route path="/"         element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/heatmap"  element={<Heatmap />} />
        </Routes>
      </main>
    </div>
  );
}
