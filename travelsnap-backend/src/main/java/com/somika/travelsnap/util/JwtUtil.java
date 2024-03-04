package com.somika.travelsnap.util;

import com.somika.travelsnap.config.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.util.Date;

import static java.time.temporal.ChronoUnit.SECONDS;

@Service
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtConfig jwtConfig;
    @Value("${jwt.secret-key}")
    private String secretKey;


    public String issueToken(String subject) {
        return Jwts.builder()
                .subject(subject)
                .issuedAt(new Date())
                .expiration(Date.from(
                        Instant.now().plus(jwtConfig.getExpirationTime(), SECONDS)
                ))
                .signWith(getSigningKey())
                .compact();
    }

    public String issueRefreshToken(String subject) {
        return Jwts.builder()
                .subject(subject)
                .issuedAt(new Date())
                .expiration(Date.from(
                        Instant.now().plus(jwtConfig.getRefreshTokenExpirationTime(), SECONDS)
                ))
                .signWith(getSigningKey())
                .compact();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String getSubject(String jwt) {
        return getClaims(jwt).getSubject();
    }

    private Claims getClaims(String token) {
        return Jwts
                .parser()
                .verifyWith((SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenValid(String jwt, String username) {
        return username.equals(getSubject(jwt)) && !isTokenExpired(jwt);
    }

    private boolean isTokenExpired(String jwt) {
        return getClaims(jwt).getExpiration().before(new Date());
    }
}
