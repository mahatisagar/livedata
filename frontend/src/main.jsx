import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [signal, setSignal] = useState(null);
  const [countdown, setCountdown] = useState(60);

  const fetchSignal = async () => {
    const res = await fetch('/.netlify/functions/getLiveSignal');
    const data = await res.json();
    setSignal(data);

    await fetch('/.netlify/functions/sendTelegramAlert', { method: 'POST' });
    setCountdown(60);
  };

  useEffect(() => {
    fetchSignal();
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          fetchSignal();
          return 60;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
      <h2>📡 Binomo Live Signal</h2>
      {signal ? (
        <>
          <p><strong>Asset:</strong> {signal.asset}</p>
          <p><strong>Signal:</strong> {signal.type}</p>
          <p><strong>Reason:</strong> {signal.reason}</p>
          <p><strong>Refresh in:</strong> {countdown}s</p>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
