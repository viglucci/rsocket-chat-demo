import './App.css'
import {Buffer} from 'buffer/';
import {useContext, useState} from "react";
import ClientProvider from "./context/ClientProvider";
import ClientContext from "./context/ClientContext";
import useChat from "./hooks/useChat";

function ChatApp() {
    const ctx = useContext(ClientContext);

    const [messages, setMessages] = useState([]);

    const chat = useChat((message) => {
        setMessages((oldMessages) => {
            return [
                ...oldMessages,
                message
            ];
        });
    });

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        const message = evt.target["message"].value;
        if (message && message.length > 0) {
            chat.send(message);
            evt.target.reset();
        }
    };

    return (
        <div className="App">
            {ctx.status === "CONNECTED" && (
                <section>
                    <form onSubmit={onFormSubmit}>
                        <input name="message" placeholder="say something..." />
                        <button type="submit">Send</button>
                    </form>
                    <ul>
                        {messages.map((message) => {
                            return (
                                <li key={message.id}>{message.message}</li>
                            );
                        })}
                    </ul>
                </section>
            )}
            {ctx.status !== "CONNECTED" && (
                <div>{ctx.status}</div>
            )}
        </div>
    );
}

function App() {
    return (
        <ClientProvider url={"ws://localhost:7777/rsocket"}>
            <ChatApp />
        </ClientProvider>
    )
}

export default App
