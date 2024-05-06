const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', function connection(ws) {

    console.log("接続");

    ws.on('message', function incoming(data, isBinary) {
        for (const client of wss.clients) {
            if (client.readyState === client.OPEN) {
                client.send(data, { binary: isBinary });
            }
        }
    });

    ws.on("close", () => console.log("切断"));
});

wss.on('error', function (error) {
    console.error('WebSocket Server Error:', error);
});