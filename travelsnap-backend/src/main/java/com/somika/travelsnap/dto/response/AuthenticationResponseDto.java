package com.somika.travelsnap.dto.response;

import com.somika.travelsnap.dto.UserDto;

public record AuthenticationResponseDto(
        String token,
        UserDto userDto
) {
}
