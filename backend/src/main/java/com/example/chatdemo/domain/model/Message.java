package com.example.chatdemo.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Message {
    String uuid;
    String text;
    String username;
    long timestampEpochMillis;
}
