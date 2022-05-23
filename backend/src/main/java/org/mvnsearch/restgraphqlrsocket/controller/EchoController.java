package org.mvnsearch.restgraphqlrsocket.controller;

import org.mvnsearch.restgraphqlrsocket.domain.model.Author;
import org.mvnsearch.restgraphqlrsocket.domain.model.Book;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Combined Controller with REST, GraphQL
 *
 * @author linux_china
 */
@RestController
public class EchoController {

    @MessageMapping("Hello")
    public Mono<String> hello() {
        return Mono.just("world");
    }

    @MessageMapping("Echo")
    public Mono<String> hello(@Argument String message) {
        return Mono.just(message);
    }

    @MessageMapping("EchoChannel")
    public Flux<String> channel(Flux<String> inStream) {
        return inStream.map(String::toUpperCase);
    }
}
