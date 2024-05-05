class WebSocketClient {
    private socket: WebSocket;

    constructor() {
        this.socket = new WebSocket('ws://192.168.0.156:8080/test');

        this.socket.onopen = () => {
            console.log('接続');
        };
        this.socket.onmessage = (event) => {
            if (this.onMessageReceived) {
                this.onMessageReceived(event.data);
            }
        };
        this.socket.onclose = () => {
            console.log('切断');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
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