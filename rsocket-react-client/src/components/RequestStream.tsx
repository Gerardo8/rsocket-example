import React, { useEffect } from 'react';
import connect from '../rsocket/rsocket-websocket-config';

const RequestStream = async () => {

    const client = await connect({ host: 'localhost', port: 7000 });

    useEffect(() => {

        return () => {
            
        };
    }, [])

    return (
        <div>

        </div>
    );
}

export default RequestStream;