import React from 'react';

const GrafanaEmbed = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://nxtales.grafana.net/public-dashboards/9f5e6ab83fd748e2b84b44c8365ba048"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Grafana Dashboard"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GrafanaEmbed;