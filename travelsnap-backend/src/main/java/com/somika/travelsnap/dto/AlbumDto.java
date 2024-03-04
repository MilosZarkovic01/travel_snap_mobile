package com.somika.travelsnap.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumDto {

    private Long id;
    private String title;
    private Integer numberOfPosts;
    private List<String> images;
}
