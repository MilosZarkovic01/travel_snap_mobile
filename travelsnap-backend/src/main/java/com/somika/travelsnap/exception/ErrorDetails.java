package com.somika.travelsnap.exception;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
public class ErrorDetails {

    LocalDateTime timestamp;
    String message;
    String details;

}
