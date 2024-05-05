import React, { useState, useEffect } from 'react';
import WebSocketClient from '../utils/WebSocketClient.ts';

const App: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [webSocketClient, setWebSocketClient] = useState<WebSocketClient | null>(null);

    useEffect(() => {
        const client = new WebSocketClient();
        client.onMessageReceived = (message: string) => {
            setMessages(prevMessages => [...prevMessages, message]);
        };
        setWebSocketClient(client);

        return () => {
            if (client) {
                client.close();
            }
        };
    }, []);

    const handleSendMessage = () => {
        if (webSocketClient && inputMessage.trim() !== '') {
            webSocketClient.sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="App">
            <div className="ChatBox">
                {messages.map((message, index) => (
                    <div key={index} className="Message">
                        {message}
                    </div>
                ))}
            </div>
            <div className="InputBox">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default App;