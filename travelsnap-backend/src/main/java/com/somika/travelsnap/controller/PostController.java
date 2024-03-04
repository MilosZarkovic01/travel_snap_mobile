package com.somika.travelsnap.controller;

import com.somika.travelsnap.dto.PostDto;
import com.somika.travelsnap.dto.request.PostRequestDto;
import com.somika.travelsnap.dto.request.PostUpdateRequestDto;
import com.somika.travelsnap.model.Post;
import com.somika.travelsnap.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post publishPost(@RequestBody PostRequestDto post) {
        return postService.publishPost(post);
    }

    @GetMapping("/{id}")
    public List<PostDto> getPosts(@PathVariable("id") Long id) {
        return postService.getPosts(id);
    }

    @PutMapping("/{id}")
    public void updatePost(@PathVariable Long id, @RequestBody PostUpdateRequestDto request) {
        postService.updatePost(id,request);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}