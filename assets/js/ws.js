let ws = null;

function connectWS(code) {
    ws = new WebSocket(`wss://corpo-backend.onrender.com/ws/${code}`);

    ws.onopen = () => {
        console.log("WS connecté");
    };

    ws.onclose = () => {
        console.log("WS fermé → reconnexion…");
        setTimeout(() => connectWS(code), 500);
    };

    ws.onerror = () => {
        console.log("Erreur WS → reconnexion…");
        ws.close();
    };

    ws.onmessage = (event) => {
        console.log("Message reçu :", event.data);
        handleWSMessage(event.data);
    };
}

function handleWSMessage(msg) {
    // Cette fonction sera remplacée dans chaque page
}
