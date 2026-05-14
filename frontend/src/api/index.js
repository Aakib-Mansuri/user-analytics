import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: BASE });

export const getSessions      = ()       => api.get('/api/sessions');
export const getSessionEvents = (id)     => api.get(`/api/sessions/${id}/events`);
export const getHeatmap       = (page)   => api.get('/api/heatmap', { params: { page } });
export const getPages         = ()       => api.get('/api/heatmap/pages');
export const getStats         = ()       => api.get('/api/stats');
export const getTimeline      = ()       => api.get('/api/stats/timeline');
export const getTopPages      = ()       => api.get('/api/stats/top-pages');
