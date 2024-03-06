package com.somika.travelsnap.service;

import com.somika.travelsnap.dto.PostDto;
import com.somika.travelsnap.dto.request.LikeRequestDto;
import com.somika.travelsnap.dto.request.PostRequestDto;
import com.somika.travelsnap.dto.request.PostUpdateRequestDto;
import com.somika.travelsnap.model.Post;

import java.util.List;

public interface PostService {

    Post publishPost(PostRequestDto post);

    List<PostDto> getPosts(Long id);

    void updatePost(Long id, PostUpdateRequestDto request);

    void deletePost(Long id);

    List<PostDto> getOthersPosts(Long id);

    void likePost(LikeRequestDto likeRequest);
}
