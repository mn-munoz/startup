const updatesDiv = document.getElementById('updates');
const userName = localStorage.getItem('userName');

function configureWebSocket() {
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
            // Handle the message
            updateHTML(userName);
          }).catch((error) => {
            console.error('Error parsing Blob to JSON:', error);
          });
        } else {
          const message = JSON.parse(event.data);
          updateHTML(userName);
        }

    };
}


configureWebSocket();

function updateHTML(username) {
    const messageHTML = `<p><span>${username}</span> added a new card on his deck</p>`;
    updatesDiv.innerHTML = messageHTML + updatesDiv.innerHTML;
}