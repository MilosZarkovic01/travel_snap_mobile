package com.somika.travelsnap.repository;

import com.somika.travelsnap.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findPostByUserIdOrderByDateDesc(Long id);
}
