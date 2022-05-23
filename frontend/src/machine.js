import {assign, createMachine, doneInvoke, forwardTo} from "xstate";
import {error} from "xstate/lib/actions";

const connectionMachine = createMachine({
    id: 'connectionMachine',
    initial: 'disconnected',
    context: {
        rsocket: undefined,
        error: undefined
    },
    states: {
        disconnected: {
            on: {
                CONNECT: 'connecting'
            }
        },
        connecting: {
            on: {
                CONNECTED: {},
                DISCONNECT: {
                    actions: forwardTo('connectRSocketService')
                },
                CANCELLED: {
                    target: 'disconnected'
                }
            },
            invoke: {
                id: 'connectRSocketService',
                src: 'connectRSocketService',
                onDone: {
                    target: 'connected',
                    actions: assign({
                        rsocket: (ctx, evt) => evt.data
                    })
                },
                onError: {
                    target: 'error',
                    actions: assign({
                        error: (ctx, evt) => evt.data
                    })
                },
            }
        },
        connected: {
            on: {
                DISCONNECT: 'disconnected'
            }
        },
        disconnecting: {
            invoke: {
                src: (ctx) => {
                    return ctx.rsocket.close();
                },
                onDone: {
                    target: 'disconnected'
                },
                onError: {
                    target: 'error',
                    actions: assign({
                        error: (ctx, evt) => evt.data
                    })
                }
            }
        },
        error: {}
    }
});

// const [state, send] = useMachine(connectionMachine, {
//     services: {
//         connectRSocketService
//     }
// });

// https://dev.to/shakyshane/how-to-cancel-promises-when-using-xstate-4lk4
const connectRSocketService = () => (send, receive) => {
    const connectingPromise = createRSocket();
    let cancelled = false;
    receive((evt) => {
        console.log(evt);
        if (evt.type === 'DISCONNECT') {
            cancelled = true;
        }
    });
    connectingPromise
        .then((rsocket) => {
            if (cancelled) {
                rsocket.close();
                send('CANCELLED');
                return;
            }
            send(doneInvoke('connectRSocketService', rsocket));
        })
        .catch((e) => {
            send(error('connectRSocketService', e));
        });
};
