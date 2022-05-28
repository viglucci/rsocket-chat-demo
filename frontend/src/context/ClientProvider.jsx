import React, {useState, useEffect} from "react";
import ClientContext from "./ClientContext";
import {RSocketConnector} from "rsocket-core";
import {WebsocketClientTransport} from "rsocket-websocket-client";
import {
    encodeCompositeMetadata,
    encodeRoute,
    encodeSimpleAuthMetadata,
    WellKnownMimeType
} from "rsocket-composite-metadata";
import {useEffectOnce} from "../hooks/useEffectOnce";

const createRSocket = async ({ url }) => {

    const map = new Map();
    map.set(
        WellKnownMimeType.MESSAGE_RSOCKET_AUTHENTICATION,
        encodeSimpleAuthMetadata("user1", "user")
    );
    const compositeMetaData = encodeCompositeMetadata(map);

    const connector = new RSocketConnector({
        transport: new WebsocketClientTransport({
            url,
        }),
        setup: {
            payload: {
                metadata: compositeMetaData
            },
            dataMimeType: WellKnownMimeType.APPLICATION_JSON.toString(),
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

    useEffect(() => {
        if (value.rsocket) {
            // TODO: currently no mechanism to cleanup this callback
            //  on unmount (https://github.com/rsocket/rsocket-js/issues/229)
            value.rsocket.onClose((error) => {
                if (error) {
                    setValue({
                        status: "ERROR",
                        connectionError: error
                    });
                    return;
                }

                setValue({
                    status: "DISCONNECTED",
                    rsocket: _rsocket
                });
            });
        }
    }, [value.rsocket, setValue]);

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    )
};

export default ClientProvider;
