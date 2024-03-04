package com.somika.travelsnap.repository;

import com.somika.travelsnap.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    List<Album> findAllByUserId(Long userId);
}
