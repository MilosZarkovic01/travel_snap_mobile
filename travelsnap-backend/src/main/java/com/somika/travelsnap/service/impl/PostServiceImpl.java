package com.somika.travelsnap.service.impl;

import com.somika.travelsnap.dto.PostDto;
import com.somika.travelsnap.dto.request.LikeRequestDto;
import com.somika.travelsnap.dto.request.PostRequestDto;
import com.somika.travelsnap.dto.request.PostUpdateRequestDto;
import com.somika.travelsnap.exception.PostNotFoundException;
import com.somika.travelsnap.mapper.PostMapper;
import com.somika.travelsnap.model.*;
import com.somika.travelsnap.repository.LikeRepository;
import com.somika.travelsnap.repository.MapLocationRepository;
import com.somika.travelsnap.repository.PostRepository;
import com.somika.travelsnap.repository.UserRepository;
import com.somika.travelsnap.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final MapLocationRepository mapLocationRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

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

    @Override
    public List<PostDto> getOthersPosts(Long id) {
        List<Post> allPosts = postRepository.findAll();

        List<Post> othersPosts = allPosts.stream()
                .filter(post -> post.getUser().getId() != id)
                .collect(Collectors.toList());

        return postMapper.postsToPostsDto(othersPosts);
    }

    @Override
    public void likePost(LikeRequestDto likeRequest) {
        Long userId = likeRequest.userId();
        Long postId = likeRequest.postId();

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(
                        String.format("Post with id %s not found", postId)
                ));

        if (likeRepository.existsByUserIdAndPostId(userId, postId)) {
            likeRepository.deleteByUserIdAndPostId(userId, postId);
            post.setNumberOfLikes(post.getNumberOfLikes() - 1);
        } else {
            Optional<User> user = userRepository.findById(userId);

            Like like = Like.builder()
                    .user(user.get())
                    .post(post)
                    .build();

            likeRepository.save(like);

            post.getLikes().add(like);
            post.setNumberOfLikes(post.getNumberOfLikes() + 1);
        }
        postRepository.save(post);

    }

    @Override
    public boolean isPostLiked(Long postId, Long userId) {
        return likeRepository.existsByUserIdAndPostId(userId, postId);
    }
}
