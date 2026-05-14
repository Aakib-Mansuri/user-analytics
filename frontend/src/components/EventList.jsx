const TYPE_STYLES = {
  page_view: 'bg-blue-100 text-blue-700',
  click:     'bg-green-100 text-green-700',
};

export default function EventList({ sessionId, events, loading }) {
  if (!sessionId) return null;

  return (
    <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-700 text-sm">
          User Journey
        </h2>
        <span className="font-mono text-xs text-gray-400">{sessionId.slice(0, 24)}…</span>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400 text-sm">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">No events found for this session.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 text-center w-10">#</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Page URL</th>
                <th className="px-4 py-2 text-left">Coordinates</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e, i) => (
                <tr key={e._id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 text-center text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLES[e.event_type]}`}>
                      {e.event_type}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-600 text-xs max-w-xs truncate">{e.page_url}</td>
                  <td className="px-4 py-2 text-gray-500 text-xs font-mono">
                    {e.x != null ? `(${e.x}, ${e.y})` : '—'}
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-xs">
                    {new Date(e.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
