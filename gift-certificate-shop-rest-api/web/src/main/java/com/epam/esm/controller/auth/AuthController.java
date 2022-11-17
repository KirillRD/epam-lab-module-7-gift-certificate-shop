package com.epam.esm.controller.auth;

import com.epam.esm.entity.User;
import com.epam.esm.security.jwt.JwtProvider;
import com.epam.esm.security.jwt.domain.JwtRequest;
import com.epam.esm.security.jwt.domain.JwtResponse;
import com.epam.esm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Autowired
    public AuthController(
            UserService userService,
            AuthenticationManager authenticationManager,
            JwtProvider jwtProvider
    ) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest jwtRequest) {
        Authentication authentication = getAuthentication(jwtRequest);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(jwtRequest.getUsername());
        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/registration")
    public ResponseEntity<Void> registration(@RequestBody User user) {
        userService.registration(user, true);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    private Authentication getAuthentication (JwtRequest jwtRequest) {
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        jwtRequest.getUsername(),
                        jwtRequest.getPassword()
                )
        );
    }
}
