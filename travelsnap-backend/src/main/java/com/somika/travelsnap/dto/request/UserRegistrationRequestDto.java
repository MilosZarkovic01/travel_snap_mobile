package com.somika.travelsnap.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRegistrationRequestDto(
        @Email(message = "Invalid email address")
        String email,
        @Size(min = 5, message = "Password must contain at least 5 characters")
        String password,

        @NotBlank
        String firstName,

        @NotBlank
        String lastName,

        @NotNull
        Integer age) {
}
