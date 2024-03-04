package com.somika.travelsnap.repository;

import com.somika.travelsnap.model.MapLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MapLocationRepository extends JpaRepository<MapLocation, Long> {
}
