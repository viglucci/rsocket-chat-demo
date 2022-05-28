import {useContext, useEffect, useState} from "react";
import {encodeCompositeMetadata, encodeRoute, WellKnownMimeType} from "rsocket-composite-metadata";
import {MAX_REQUEST_N} from "rsocket-core";
import {Buffer} from 'buffer/';
import ClientContext from "../context/ClientContext";
import basicUUID from "../util/basicUUID";

export default function useChat(onMessage) {

    const {rsocket} = useContext(ClientContext);

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
                        onMessage({
                            id: basicUUID(),
                            message: payload.data.toString()
                        });
                    }
                },
                onExtension(extendedType, content, canBeIgnored) {
                },
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
