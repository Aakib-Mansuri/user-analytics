import { useState, useEffect, useCallback } from 'react';
import { getSessions, getSessionEvents } from '../api';
import SessionTable from '../components/SessionTable';
import EventList from '../components/EventList';

export default function Sessions() {
  const [sessions,       setSessions]       = useState([]);
  const [selectedId,     setSelectedId]     = useState(null);
  const [events,         setEvents]         = useState([]);
  const [loadingSessions,setLoadingSessions] = useState(true);
  const [loadingEvents,  setLoadingEvents]  = useState(false);

  const fetchSessions = useCallback(async () => {
    setLoadingSessions(true);
    try {
      const { data } = await getSessions();
      setSessions(data);
    } catch {
      setSessions([]);
    } finally {
      setLoadingSessions(false);
    }
  }, []);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  const handleSelect = async (sessionId) => {
    if (selectedId === sessionId) {
      setSelectedId(null);
      setEvents([]);
      return;
    }
    setSelectedId(sessionId);
    setLoadingEvents(true);
    try {
      const { data } = await getSessionEvents(sessionId);
      setEvents(data);
    } catch {
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sessions</h1>
          <p className="text-sm text-gray-400 mt-0.5">Click a row to view the user journey</p>
        </div>
        <button
          onClick={fetchSessions}
          className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <SessionTable
          sessions={sessions}
          selectedId={selectedId}
          onSelect={handleSelect}
          loading={loadingSessions}
        />
      </div>

      <EventList
        sessionId={selectedId}
        events={events}
        loading={loadingEvents}
      />
    </div>
  );
}
