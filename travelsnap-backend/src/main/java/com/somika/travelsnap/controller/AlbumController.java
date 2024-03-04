package com.somika.travelsnap.controller;

import com.somika.travelsnap.dto.AlbumDto;
import com.somika.travelsnap.dto.request.NewAlbumRequestDto;
import com.somika.travelsnap.model.Album;
import com.somika.travelsnap.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @GetMapping("/{userId}")
    public List<AlbumDto> getAlbumsByUser(@PathVariable("userId") Long userId) {
        return albumService.getAlbumsByUser(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createAlbum(@RequestBody NewAlbumRequestDto album) {
        albumService.createAlbum(album);
    }
}
