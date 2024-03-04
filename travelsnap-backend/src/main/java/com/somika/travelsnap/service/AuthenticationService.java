package com.somika.travelsnap.service;

import com.somika.travelsnap.dto.UserDto;
import com.somika.travelsnap.dto.request.AuthenticationRequestDto;
import com.somika.travelsnap.dto.request.UserRegistrationRequestDto;
import com.somika.travelsnap.dto.response.AuthenticationResponseDto;

public interface AuthenticationService {

    AuthenticationResponseDto login(AuthenticationRequestDto authenticationRequest);

    UserDto register(UserRegistrationRequestDto userRegistrationRequest);

}
