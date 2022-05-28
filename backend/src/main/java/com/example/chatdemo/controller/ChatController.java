package com.example.chatdemo.controller;

import com.example.chatdemo.domain.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.time.Instant;
import java.util.UUID;

@Controller
public class ChatController {

    @MessageMapping("ChatChannel")
    public Flux<Message> channel(Flux<String> inStream) {
        return inStream.map(this::mapMessage);
    }

    private Message mapMessage(String s) {
        return Message.builder()
                .uuid(UUID.randomUUID().toString())
                .text(s)
                .username("user1")
                .timestampEpochMillis(Instant.now().toEpochMilli())
                .build();
    }
}
