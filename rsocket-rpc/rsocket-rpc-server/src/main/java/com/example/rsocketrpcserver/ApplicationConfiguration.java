package com.example.rsocketrpcserver;

import io.rsocket.rpc.testing.protobuf.SimpleService;
import io.rsocket.rpc.testing.protobuf.SimpleServiceServer;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {

    private final SimpleService simpleService;

    @Bean
    public SimpleServiceServer simpleServiceServer() {
        return new SimpleServiceServer(this.simpleService, Optional.empty(), Optional.empty());
    }

}
