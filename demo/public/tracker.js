(function () {
  if (window.__ua_loaded) return;
  window.__ua_loaded = true;

  const API_URL =
    document.currentScript?.getAttribute('data-api') ||
    'https://user-analytics-31fx.onrender.com';

  function getSessionId() {
    try {
      let id = localStorage.getItem('ua_session_id');
      if (!id) {
        id = crypto.randomUUID
          ? crypto.randomUUID()
          : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              const r = (Math.random() * 16) | 0;
              return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
            });
        localStorage.setItem('ua_session_id', id);
      }
      return id;
    } catch {
      if (!window.__ua_session_id) {
        window.__ua_session_id = crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(36);
      }
      return window.__ua_session_id;
    }
  }

  function sendEvent(payload) {
    try {
      fetch(API_URL + '/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function () {});
    } catch {
      // silent fail — tracker must never break the host page
    }
  }

  function sendPageView() {
    sendEvent({
      session_id: getSessionId(),
      event_type: 'page_view',
      page_url:   window.location.href,
      timestamp:  new Date().toISOString(),
    });
  }

  // page_view on initial load
  sendPageView();

  // page_view on SPA route changes (React Router / History API)
  var _pushState = history.pushState;
  history.pushState = function () {
    _pushState.apply(history, arguments);
    sendPageView();
  };
  window.addEventListener('popstate', sendPageView);

  // click tracking
  document.addEventListener('click', function (e) {
    sendEvent({
      session_id: getSessionId(),
      event_type: 'click',
      page_url:   window.location.href,
      timestamp:  new Date().toISOString(),
      x: e.clientX,
      y: e.clientY,
    });
  });
})();
