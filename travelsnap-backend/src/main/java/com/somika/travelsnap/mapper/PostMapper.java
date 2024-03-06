package com.somika.travelsnap.mapper;

import com.somika.travelsnap.dto.PostDto;
import com.somika.travelsnap.model.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PostMapper {
    default List<PostDto> postsToPostsDto(List<Post> posts) {
        return posts.stream()
                .map(this::postToPostDto)
                .collect(Collectors.toList());
    }

    @Mapping(target = "mapLocation.latitude", source = "post.mapLocation.lat")
    @Mapping(target = "mapLocation.longitude", source = "post.mapLocation.lng")
    @Mapping(target = "numberOfLikes", expression = "java(post.getLikes().size())")
    PostDto postToPostDto(Post post);
}
