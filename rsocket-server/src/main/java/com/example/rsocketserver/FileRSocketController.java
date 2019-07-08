package com.example.rsocketserver;

import lombok.RequiredArgsConstructor;
import org.reactivestreams.Publisher;
import org.springframework.integration.channel.PublishSubscribeChannel;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import java.time.Duration;
import java.util.function.Consumer;
import java.util.stream.Stream;

@Controller
@RequiredArgsConstructor
public class FileRSocketController {

    private final Publisher<Message<GreetingsRequest>> filePublisher;

    @MessageMapping("error")
    Flux<GreetingsResponse> error() {
        return Flux.error(new IllegalArgumentException());
    }

    @MessageExceptionHandler
    Flux<GreetingsResponse> errorHandler(IllegalArgumentException iae) {
        return Flux.just(new GreetingsResponse()
                .withGreeting("OH NO!"));
    }

    @MessageMapping("greet-stream")
    Flux<GreetingsResponse> greetStream(GreetingsRequest request) {
        return Flux
                .fromStream(Stream.generate(() -> new GreetingsResponse(request.getName())))
                .delayElements(Duration.ofSeconds(1));
    }

    @MessageMapping("greet-stream-from-file")
    Flux<GreetingsResponse> greetStreamFromFile() {
        return Flux.from(this.filePublisher)
                .map(message -> new GreetingsResponse(message.getPayload().getName()));
    }

    @MessageMapping("greet")
    GreetingsResponse greet(GreetingsRequest request) {
        return new GreetingsResponse(request.getName());
    }

}
