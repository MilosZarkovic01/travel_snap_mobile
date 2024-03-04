package com.somika.travelsnap.mapper;

import com.somika.travelsnap.dto.UserDto;
import com.somika.travelsnap.dto.request.UserRegistrationRequestDto;
import com.somika.travelsnap.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto userToUserDto(User user);

    User userRegistrationRequestToUser(UserRegistrationRequestDto userRegistrationRequest);
}
