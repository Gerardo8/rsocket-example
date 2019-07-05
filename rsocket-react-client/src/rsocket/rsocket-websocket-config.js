import { RSocketClient, JsonSerializer, IdentitySerializer } from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

const connect = async ({ host }) => {

    const client = new RSocketClient({
        serializers: {
            data: JsonSerializer,
            metadata: IdentitySerializer
        },
        setup: {
            dataMimeType: 'application/json',
            keepAlive: 1000000, // avoid sending during test
            lifetime: 100000,
            metadataMimeType: 'message/x.rsocket.routing.v0',
        },
        transport: new RSocketWebSocketClient({
            url: `ws://${host}:8888/rsocket`
        }),
    });

    const socket = await client.connect();

    socket.requestStream({
        data: {
            name: 'Luger'
        },
        metadata: 'greet-stream'
    }).subscribe({
        onNext: value => {
            console.log(value.data);
        },
        onSubscribe: value => {
            console.log(value.request(2147483647));
        },
        onComplete: value => {
            console.log(value);

        },
        onError: error => {
            console.log(error);

        }
    });
}

export default connect;