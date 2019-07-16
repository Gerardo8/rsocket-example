import { RpcClient } from 'rsocket-rpc-core';
import { every } from 'rsocket-flowable';
import { BufferEncoders } from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import { SimpleServiceClient } from './proto/simple_rsocket_pb';
import { SimpleRequest } from './proto/simple_pb';

let requester = null;

const connect = () => {
    const local = 'ws://localhost:8081/';
    const keepAlive = 60000 /* 60s in ms */;
    const lifetime = 360000 /* 360s in ms */;
    const transport = new RSocketWebSocketClient({ url: local }, BufferEncoders);
    const client = new RpcClient({ setup: { keepAlive, lifetime }, transport });
    client.connect().subscribe({
        onComplete: rsocket => {
            const client = new SimpleServiceClient(rsocket);
            const requests = every(1000).map(() => new SimpleRequest("hello server"));

            client.streamingRequestAndResponse(requests)
                .subscribe({
                    onComplete: response => {
                        console.log("Hello Service responded with: " + response.getMessage());
                    },
                    onError: error => {
                        console.log("Hello Service responded with error: " + error);
                    },
                    onSubscribe: value => {
                        requester = value;
                        requester.request(1);
                        
                    },
                    onNext: value => {
                        console.log(value.toObject());
                        requester.request(1);
                        
                    }
                });
            console.log("Success! We have a handle to an RSocket connection");
        },
        onError: error => {
            console.log("Failed to connect to local RSocket server.", error);
        }
    });
}

export default connect;
