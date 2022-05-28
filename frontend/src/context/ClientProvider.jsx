import React, {useState, useEffect} from "react";
import ClientContext from "./ClientContext";
import {RSocketConnector} from "rsocket-core";
import {WebsocketClientTransport} from "rsocket-websocket-client";
import {WellKnownMimeType} from "rsocket-composite-metadata";
import {useEffectOnce} from "../hooks/useEffectOnce";

const createRSocket = async ({ url }) => {
    const connector = new RSocketConnector({
        transport: new WebsocketClientTransport({
            url,
        }),
        setup: {
            metadataMimeType: WellKnownMimeType.MESSAGE_RSOCKET_COMPOSITE_METADATA.toString()
        }
    });

    return connector.connect();
}

const ClientProvider = ({ children, url }) => {
    const [value, setValue] = useState({
        status: "DISCONNECTED",
        connectionError: null,
        rsocket: null
    });

    useEffectOnce(() => {
        if (!value.rsocket) {
            createRSocket({ url })
                .then((_rsocket) => {
                    setValue({
                        status: "CONNECTED",
                        rsocket: _rsocket
                    });
                })
                .catch((err) => {
                    setValue({
                        status: "ERROR",
                        connectionError: err
                    })
                });
        }

        return () => {
            if (value.rsocket) {
                value.rsocket.close();
            }
        };
    }, [url, value, createRSocket, setValue]);

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    )
};

export default ClientProvider;
