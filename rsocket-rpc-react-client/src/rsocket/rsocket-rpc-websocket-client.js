import { RpcClient } from 'rsocket-rpc-core';
import { BufferEncoders } from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

const connect = () => {
    const local = 'ws://localhost:8081/';
    const keepAlive = 60000 /* 60s in ms */;
    const lifetime = 360000 /* 360s in ms */;
    const transport = new RSocketWebSocketClient({ url: local }, BufferEncoders);
    const client = new RpcClient({ setup: { keepAlive, lifetime }, transport });
    client.connect().subscribe({
        onComplete: rsocket => {
            console.log("Success! We have a handle to an RSocket connection");
        },
        onError: error => {
            console.log("Failed to connect to local RSocket server.", error);
        }
    });
}

export default connect;
