package com.example.chatdemo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class EchoController {

    @MessageMapping("Hello")
    public Mono<String> hello() {
        return Mono.just("world");
    }

    @MessageMapping("EchoChannel")
    public Flux<String> channel(Flux<String> inStream) {
        return inStream.map(String::toUpperCase);
    }
}
