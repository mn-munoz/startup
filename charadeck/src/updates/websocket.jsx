import React from 'react';

export function Websocket() {
    const [updates, setUpdates] = React.useState([]);
    const userName = localStorage.getItem('userName');

    React.useState(() => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        socket.onopen = (event) => {
            console.log('WebSocket connected');
        };
    
        socket.onclose = (event) => {
            console.log('WebSocket disconnected');
        };
    
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onmessage = (event) => {
            if (event.data instanceof Blob) {
              event.data.text().then((text) => {
                const message = JSON.parse(text);
                handleMessage(message);
              }).catch((error) => {
                console.error('Error parsing Blob to JSON:', error);
              });
            } else {
              const message = JSON.parse(event.data);
              handleMessage(message);
            }
    
        };

        return () => {
            socket.close();
        }
    }, []);

    const handleMessage = (message) => {
        setUpdates((prevUpdates) => [...prevUpdates, message])
    }

    return (
    <div>
      <h2>Updates</h2>
      <div id="updates">
        {updates.map((update, index) => (
          <p key={index}>
            <span>{update.username}</span> added a new card to their deck
          </p>
        ))}
      </div>
    </div>
  );
}