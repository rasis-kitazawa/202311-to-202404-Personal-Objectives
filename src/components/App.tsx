import React, { useEffect, useRef, useState } from "react";
import '../styles/App.css';

const App: React.FC = () => {
    const [messages, setMessages] = useState<{ name: string; message: string }[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [inputName, setInputName] = useState<string>("");

    const webSocketRef = useRef<WebSocket>();

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8081");
        webSocketRef.current = socket;

        socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [{ name: data.name, message: data.message }, ...prevMessages]);
        });

        return () => {
            socket.close();
        };
    }, []);

    const handleSendMessage = () => {
        if (webSocketRef.current && inputMessage.trim() !== "") {
            const data = { name: inputName, message: inputMessage };
            webSocketRef.current.send(JSON.stringify(data));
            setInputMessage("");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="col">
                        <div className="input-group mb-2">
                            <input
                                type="text"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                className="form-control"
                                placeholder="名前を入力..."
                            />
                        </div>
                        <div className="input-group mb-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                className="form-control"
                                placeholder="メッセージを入力..."
                            />
                        </div>
                        <div className="input-group">
                            <button onClick={handleSendMessage} className="btn btn-primary btn-block" disabled={!inputMessage.trim()}>送信</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="chat-box">
                        {messages.map((message, index) => (
                            <div key={index} className="message">
                                <strong>{message.name}: </strong>{message.message}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
