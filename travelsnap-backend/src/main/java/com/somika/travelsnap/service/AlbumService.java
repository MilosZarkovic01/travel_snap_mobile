package com.somika.travelsnap.service;

import com.somika.travelsnap.dto.AlbumDto;
import com.somika.travelsnap.dto.request.NewAlbumRequestDto;

import java.util.List;

public interface AlbumService {
    List<AlbumDto> getAlbumsByUser(Long id);

    void createAlbum(NewAlbumRequestDto album);
}
