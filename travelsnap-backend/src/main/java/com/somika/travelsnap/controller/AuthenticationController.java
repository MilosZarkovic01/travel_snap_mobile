package com.somika.travelsnap.controller;

import com.somika.travelsnap.dto.UserDto;
import com.somika.travelsnap.dto.request.AuthenticationRequestDto;
import com.somika.travelsnap.dto.request.UserRegistrationRequestDto;
import com.somika.travelsnap.dto.response.AuthenticationResponseDto;
import com.somika.travelsnap.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public AuthenticationResponseDto login(@Valid @RequestBody AuthenticationRequestDto authenticationRequest) {
        return authenticationService.login(authenticationRequest);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto register(@Valid @RequestBody UserRegistrationRequestDto userRegistrationRequest) {
        final UserDto user = authenticationService.register(userRegistrationRequest);
        log.info("New user has been created {}", user);
        return user;
    }
}
