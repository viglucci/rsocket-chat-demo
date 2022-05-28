import {useContext, useState} from "react";
import ClientContext from "../../context/ClientContext";
import useChat from "../../hooks/useChat";
import ServerList from "./ServerList";
import Sidebar from "./SideBar";
import MessageList from "./MessageList";

export default function Chat() {
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
                <div className="font-sans antialiased h-screen flex">
                    <ServerList />
                    <Sidebar />
                    <MessageList messages={messages} onFormSubmit={onFormSubmit}/>
                </div>
            )}
            {ctx.status !== "CONNECTED" && (
                <div>{ctx.status}</div>
            )}
        </div>
    );
}
