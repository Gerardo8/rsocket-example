import { RSocketClient } from 'rsocket-core';
import RSocketTcpClient from 'rsocket-tcp-client';

const connect = async ({ host, port }: any) => {

    const client = new RSocketClient({
        setup: {
            dataMimeType: 'text/plain',
            keepAlive: 1000000, // avoid sending during test
            lifetime: 100000,
            metadataMimeType: 'text/plain',
        },
        transport: new RSocketTcpClient({
            host,
            port
        }),
    });

    return await client.connect();
}

export default connect;