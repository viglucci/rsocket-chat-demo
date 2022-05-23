import './App.css'

import {MAX_REQUEST_N, RSocketConnector} from 'rsocket-core';
import {WebsocketClientTransport} from 'rsocket-websocket-client';
import {useEffectOnce} from "./hooks/useEffectOnce";
import {Buffer} from 'buffer/';
import {encodeCompositeMetadata, encodeRoute, WellKnownMimeType} from "rsocket-composite-metadata";
import {useEffect, useState} from "react";

const createRSocket = async () => {
    const connector = new RSocketConnector({
        transport: new WebsocketClientTransport({
            url: "ws://localhost:8080/rsocket",
        }),
        setup: {
            metadataMimeType: WellKnownMimeType.MESSAGE_RSOCKET_COMPOSITE_METADATA.toString()
        }
    });

    return connector.connect();
}

function useRSocket() {
    const [rsocket, setRSocket] = useState(null);

    useEffectOnce(() => {
        createRSocket().then((_rsocket) => {
            setRSocket(_rsocket);
        });

        return () => {
            if (rsocket) {
                rsocket.close();
            }
        };
    }, [createRSocket]);

    return rsocket;
}

function useChat(rsocket, onMessage) {

    const [chat, setChat] = useState(null);

    useEffect(() => {

        if (!rsocket) {
            return;
        }

        const map = new Map();
        map.set(WellKnownMimeType.MESSAGE_RSOCKET_ROUTING, encodeRoute("EchoChannel"));
        const compositeMetaData = encodeCompositeMetadata(map);

        const stream = rsocket.requestChannel({
                metadata: compositeMetaData
            },
            MAX_REQUEST_N,
            false,
            {
                onError(error) {
                    console.error(error);
                },
                onComplete() {
                    console.error('peer stream complete');
                },
                onNext(payload, isComplete) {
                    console.log(
                        `payload[data: ${payload.data}; metadata: ${payload.metadata}]|${isComplete}`
                    );
                    if (onMessage) {
                        onMessage(payload.data.toString());
                    }
                },
                onExtension(extendedType, content, canBeIgnored) {},
                request(requestN) {
                    console.log(`peer requested ${requestN}`)
                },
                cancel() {
                    console.log(`peer canceled`)
                }
            });

        setChat(() => {
            return {
                send(message) {
                    stream.onNext({
                        data: Buffer.from(message),
                    });
                }
            }
        });

        return () => {
            if (stream) {
                stream.cancel();
            }
        };
    }, [rsocket]);

    return chat;
}

function basicUUID() {
    return window.URL.createObjectURL(new Blob([])).substring(31);
}

function App() {
    const [messages, setMessages] = useState([]);

    const rsocket = useRSocket();
    const chat = useChat(rsocket, (message) => {
        setMessages((oldMessages) => {
            return [
                ...oldMessages,
                {
                    id: basicUUID(),
                    message
                }
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
            <header className="App-header">
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
            </header>
        </div>
    )
}

export default App
