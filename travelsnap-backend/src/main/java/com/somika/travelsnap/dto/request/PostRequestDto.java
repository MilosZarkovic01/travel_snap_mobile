package com.somika.travelsnap.dto.request;

import com.somika.travelsnap.dto.MapLocationDto;

import java.time.LocalDate;

public record PostRequestDto(
        String title,
        String description,
        String imageUrl,
        LocalDate date,
        Long userId,
        Long albumId,
        MapLocationDto mapLocationDto) {
}
