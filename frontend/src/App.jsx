import './App.css'
import {Buffer} from 'buffer/';
import ClientProvider from "./context/ClientProvider";
import Chat from "./components/Chat/Chat";

function App() {
    return (
        <ClientProvider url={"ws://localhost:7777/rsocket"}>
            <Chat />
        </ClientProvider>
    )
}

export default App
