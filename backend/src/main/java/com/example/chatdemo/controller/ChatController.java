package com.example.chatdemo.controller;

import com.example.chatdemo.domain.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.time.Instant;
import java.util.UUID;

@Controller
public class ChatController {

    @MessageMapping("ChatChannel")
    public Flux<Message> channel(Flux<String> inStream) {
        return inStream.flatMap((String s) -> ReactiveSecurityContextHolder
                .getContext()
                .map(SecurityContext::getAuthentication)
                .map(Principal::getName)
                .flatMap((username) -> mapMessage(s, username)));
    }

    private static Mono<Message> mapMessage(String s, String username) {
        return Mono.just(Message.builder()
                .uuid(UUID.randomUUID().toString())
                .text(s)
                .username(username)
                .timestampEpochMillis(Instant.now().toEpochMilli())
                .build());
    }
}
