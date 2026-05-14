import { useState, useEffect } from 'react';
import { getPages, getHeatmap } from '../api';
import HeatmapCanvas from '../components/HeatmapCanvas';

export default function Heatmap() {
  const [pageOptions,  setPageOptions]  = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [clicks,       setClicks]       = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [loaded,       setLoaded]       = useState(false);

  useEffect(() => {
    getPages()
      .then(({ data }) => {
        setPageOptions(data);
        if (data.length > 0) {
          setSelectedPage(data[0]);
          // auto-load heatmap for first page
          return getHeatmap(data[0]).then(r => {
            setClicks(r.data);
            setLoaded(true);
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleLoad = async () => {
    if (!selectedPage) return;
    setLoading(true);
    setLoaded(false);
    try {
      const { data } = await getHeatmap(selectedPage);
      setClicks(data);
      setLoaded(true);
    } catch {
      setClicks([]);
      setLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Heatmap</h1>
        <p className="text-sm text-gray-400 mt-0.5">Visualise where users clicked on each page</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-end shadow-sm">
        <div className="flex-1 min-w-60">
          <label className="block text-xs font-medium text-gray-600 mb-1">Page URL</label>
          {pageOptions.length === 0 ? (
            <p className="text-sm text-gray-400 py-2">No pages with click data yet — use the demo site first.</p>
          ) : (
            <select
              value={selectedPage}
              onChange={e => setSelectedPage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
            >
              {pageOptions.map(url => (
                <option key={url} value={url}>{url}</option>
              ))}
            </select>
          )}
        </div>
        <button
          onClick={handleLoad}
          disabled={loading || !selectedPage}
          className="px-5 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Loading…' : 'Load Heatmap'}
        </button>
      </div>

      {loaded && (
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span>Total clicks: <strong className="text-red-500">{clicks.length}</strong></span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 text-xs truncate max-w-lg">{selectedPage}</span>
        </div>
      )}

      {loaded && clicks.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-16 text-center text-gray-400">
          <p className="text-4xl mb-3">🖱️</p>
          <p>No clicks recorded for this page yet.</p>
        </div>
      ) : loaded ? (
        <HeatmapCanvas clicks={clicks} />
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-xl py-16 text-center text-gray-300">
          Select a page URL and click <strong>Load Heatmap</strong>
        </div>
      )}
    </div>
  );
}
