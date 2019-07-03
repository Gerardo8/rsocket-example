package com.example.rsocketserver;

import lombok.Data;

import java.time.Instant;

@Data
class GreetingsResponse {

    private String greeting;

    GreetingsResponse() {
    }

    GreetingsResponse(String name) {
        this.withGreeting("Hello " + name + " @ " + Instant.now());
    }

    GreetingsResponse withGreeting(String msg) {
        this.greeting = msg;
        return this;
    }
}
