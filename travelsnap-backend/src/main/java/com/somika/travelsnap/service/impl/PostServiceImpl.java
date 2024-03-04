package com.somika.travelsnap.service.impl;

import com.somika.travelsnap.dto.PostDto;
import com.somika.travelsnap.dto.request.PostRequestDto;
import com.somika.travelsnap.dto.request.PostUpdateRequestDto;
import com.somika.travelsnap.exception.PostNotFoundException;
import com.somika.travelsnap.mapper.PostMapper;
import com.somika.travelsnap.model.Album;
import com.somika.travelsnap.model.MapLocation;
import com.somika.travelsnap.model.Post;
import com.somika.travelsnap.model.User;
import com.somika.travelsnap.repository.MapLocationRepository;
import com.somika.travelsnap.repository.PostRepository;
import com.somika.travelsnap.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final MapLocationRepository mapLocationRepository;

    @Override
    public Post publishPost(PostRequestDto postRequest) {
        Post post = new Post();
        post.setTitle(postRequest.title());
        post.setDescription(postRequest.description());
        post.setImageUrl(postRequest.imageUrl());
        post.setDate(postRequest.date());

        User user = new User();
        user.setId(postRequest.userId());
        post.setUser(user);

        Album album = new Album();
        album.setId(postRequest.albumId());
        post.setAlbum(album);

        post = postRepository.save(post);

        MapLocation mapLocation = new MapLocation();
        mapLocation.setLat(postRequest.mapLocationDto().getLatitude());
        mapLocation.setLng(postRequest.mapLocationDto().getLongitude());
        mapLocation.setPost(post);

        mapLocationRepository.save(mapLocation);

        return postRepository.save(post);
    }

    @Override
    public List<PostDto> getPosts(Long id) {
        return postMapper.postsToPostsDto(postRepository.findPostByUserIdOrderByDateDesc(id));
    }

    @Override
    public void updatePost(Long id, PostUpdateRequestDto request) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));

        existingPost.setTitle(request.title());
        existingPost.setDescription(request.description());

        postRepository.save(existingPost);

        log.info("Post with id {} is updated", id);
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deleteById(id);
        log.info("Post with id {} is deleted", id);
    }
}
