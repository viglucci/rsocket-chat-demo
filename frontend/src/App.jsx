import './App.css'
import {Buffer} from 'buffer/';
import {useContext, useState} from "react";
import ClientProvider from "./context/ClientProvider";
import ClientContext from "./context/ClientContext";
import useChat from "./hooks/useChat";
import Chat from "./components/Chat/Chat";

function App() {
    return (
        <ClientProvider url={"ws://localhost:7777/rsocket"}>
            <Chat />
        </ClientProvider>
    )
}

export default App
