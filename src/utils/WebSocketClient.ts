class WebSocketClient {
    private socket: WebSocket;

    constructor() {
        this.socket = new WebSocket('ws://localhost:8080'); // WebSocketサーバーのURLを指定します
        this.socket.onopen = () => {
            console.log('WebSocket connection established.');
        };
        this.socket.onmessage = (event) => {
            if (this.onMessageReceived) {
                this.onMessageReceived(event.data);
            }
        };
        this.socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };
    }

    sendMessage(message: string) {
        this.socket.send(message);
    }

    close() {
        this.socket.close();
    }

    onMessageReceived?: (message: string) => void;
}

export default WebSocketClient;