package com.example.rsocketrpcserver;

import io.rsocket.RSocketFactory;
import io.rsocket.rpc.testing.protobuf.SimpleServiceServer;
import io.rsocket.transport.netty.server.CloseableChannel;
import io.rsocket.transport.netty.server.TcpServerTransport;
import io.rsocket.transport.netty.server.WebsocketServerTransport;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import reactor.core.publisher.Mono;

@SpringBootApplication
@RequiredArgsConstructor
public class RsocketRpcServerApplication implements ApplicationRunner {

    private final SimpleServiceServer serviceServer;

    public static void main(String[] args) {
        SpringApplication.run(RsocketRpcServerApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

        final CloseableChannel closeableChannel = RSocketFactory
                .receive()
                .acceptor((setup, sendingSocket) -> Mono
                        .just(this.serviceServer))
                .transport(WebsocketServerTransport.create(8081))
                .start()
                .block();

        Thread.currentThread().join();

    }
}
