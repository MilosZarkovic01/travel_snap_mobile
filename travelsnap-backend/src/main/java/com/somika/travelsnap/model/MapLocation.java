package com.somika.travelsnap.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MapLocation {

    @Id
    @SequenceGenerator(
            name = "map_id_seq",
            sequenceName = "map_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "map_id_seq"
    )
    private Long id;

    @Column(nullable = false)
    private String lat;

    @Column(nullable = false)
    private String lng;

    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
