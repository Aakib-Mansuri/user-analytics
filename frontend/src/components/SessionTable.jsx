export default function SessionTable({ sessions, selectedId, onSelect, loading }) {
  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading sessions...</div>;
  }

  if (!sessions.length) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">📭</p>
        <p>No sessions yet. Open the demo site and click around!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Session ID</th>
            <th className="px-4 py-3 text-center">Events</th>
            <th className="px-4 py-3 text-left">First Seen</th>
            <th className="px-4 py-3 text-left">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr
              key={s.session_id}
              onClick={() => onSelect(s.session_id)}
              className={`border-t border-gray-100 cursor-pointer transition-colors ${
                selectedId === s.session_id
                  ? 'bg-red-50 border-l-4 border-l-red-400'
                  : 'hover:bg-gray-50'
              }`}
            >
              <td className="px-4 py-3 font-mono text-xs text-gray-700">
                {s.session_id.slice(0, 18)}…
              </td>
              <td className="px-4 py-3 text-center">
                <span className="bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full text-xs">
                  {s.event_count}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">{new Date(s.first_seen).toLocaleString()}</td>
              <td className="px-4 py-3 text-gray-500">{new Date(s.last_seen).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
