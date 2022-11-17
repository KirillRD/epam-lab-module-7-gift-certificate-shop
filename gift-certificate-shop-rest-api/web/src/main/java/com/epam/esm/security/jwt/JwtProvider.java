package com.epam.esm.security.jwt;

import com.epam.esm.entity.Role;
import com.epam.esm.entity.RoleName;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import com.epam.esm.entity.User;
import com.epam.esm.service.UserService;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtProvider {

    @Value("${jwt.expiration}")
    private long TOKEN_EXPIRATION;

    @Value("${jwt.payload.id}")
    private String PAYLOAD_ID_FIELD_NAME;

    @Value("${jwt.payload.login}")
    private String PAYLOAD_LOGIN_FIELD_NAME;

    @Value("${jwt.payload.name}")
    private String PAYLOAD_NAME_FIELD_NAME;

    @Value("${jwt.payload.roles}")
    private String PAYLOAD_ROLES_FIELD_NAME;

    private final UserService userService;
    private final SecretKey tokenSecret;

    @Autowired
    public JwtProvider(UserService userService, @Value("${jwt.secret}") String tokenSecret) {
        this.userService = userService;
        this.tokenSecret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenSecret));
    }

    public String generateToken(String username) {
        User user = userService.readUserByLogin(username).orElseThrow();
        return Jwts.builder()
                .claim(PAYLOAD_ID_FIELD_NAME, user.getId())
                .claim(PAYLOAD_LOGIN_FIELD_NAME, user.getLogin())
                .claim(PAYLOAD_NAME_FIELD_NAME, user.getName())
                .claim(PAYLOAD_ROLES_FIELD_NAME, user
                        .getRoles()
                        .stream()
                        .map(Role::getName)
                        .map(RoleName::name)
                        .collect(Collectors.toList()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + TOKEN_EXPIRATION))
                .signWith(tokenSecret, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(tokenSecret)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsername(String token) {
        return getClaim(token, PAYLOAD_LOGIN_FIELD_NAME, String.class);
    }

    private <T> T getClaim (String token, String fieldName, Class<T> classType) {
        Claims claims = getAllClaims(token);
        return claims.get(fieldName, classType);
    }

    private Claims getAllClaims (String token) {
        return Jwts.parserBuilder()
                .setSigningKey(tokenSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
