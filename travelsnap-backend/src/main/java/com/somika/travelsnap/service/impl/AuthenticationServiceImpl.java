package com.somika.travelsnap.service.impl;

import com.somika.travelsnap.config.JwtConfig;
import com.somika.travelsnap.dto.UserDto;
import com.somika.travelsnap.dto.request.AuthenticationRequestDto;
import com.somika.travelsnap.dto.request.UserRegistrationRequestDto;
import com.somika.travelsnap.dto.response.AuthenticationResponseDto;
import com.somika.travelsnap.exception.DuplicateResourceException;
import com.somika.travelsnap.mapper.UserMapper;
import com.somika.travelsnap.model.User;
import com.somika.travelsnap.repository.UserRepository;
import com.somika.travelsnap.service.AuthenticationService;
import com.somika.travelsnap.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthenticationResponseDto login(AuthenticationRequestDto authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.email(),
                        authenticationRequest.password()
                )
        );
        User user = userRepository.findByEmail(authenticationRequest.email())
                .orElseThrow();

        String token = jwtUtil.issueToken(user.getEmail());
        return new AuthenticationResponseDto(token, userMapper.userToUserDto(user));
    }

    @Override
    public UserDto register(UserRegistrationRequestDto userRegistrationRequest) {
        User user = userMapper.userRegistrationRequestToUser(userRegistrationRequest);

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateResourceException(
                    String.format("Email %s is already taken!", user.getEmail())
            );
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        return userMapper.userToUserDto(savedUser);
    }


}
