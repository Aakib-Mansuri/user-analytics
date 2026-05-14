const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  session_id: { type: String, required: true, index: true },
  event_type: { type: String, enum: ['page_view', 'click'], required: true },
  page_url:   { type: String, required: true },
  timestamp:  { type: Date, required: true },
  x:          { type: Number, default: null },
  y:          { type: Number, default: null },
  created_at: { type: Date, default: Date.now }
});

eventSchema.index({ page_url: 1, event_type: 1 });
eventSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Event', eventSchema);
