package com.somika.travelsnap.service.impl;

import com.somika.travelsnap.dto.AlbumDto;
import com.somika.travelsnap.dto.request.NewAlbumRequestDto;
import com.somika.travelsnap.model.Album;
import com.somika.travelsnap.model.Post;
import com.somika.travelsnap.model.User;
import com.somika.travelsnap.repository.AlbumRepository;
import com.somika.travelsnap.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;

    @Override
    public List<AlbumDto> getAlbumsByUser(Long id) {
        List<Album> albums = albumRepository.findAllByUserId(id);

        return albums.stream()
                .map(album -> {
                    AlbumDto albumDto = new AlbumDto();
                    albumDto.setId(album.getId());
                    albumDto.setTitle(album.getTitle());
                    albumDto.setNumberOfPosts(album.getPosts().size());
                    albumDto.setImages(album.getPosts().stream()
                            .map(Post::getImageUrl)
                            .collect(Collectors.toList()));
                    return albumDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void createAlbum(NewAlbumRequestDto album) {
        Album newAlbum = new Album();
        newAlbum.setTitle(album.title());
        newAlbum.setDescription(album.description());

        User user = new User();
        user.setId(album.userId());

        newAlbum.setUser(user);

        albumRepository.save(newAlbum);
    }
}
