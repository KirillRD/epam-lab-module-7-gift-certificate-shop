package com.epam.esm.service;

import com.epam.esm.dto.UserDTO;
import com.epam.esm.entity.User;

import java.util.Optional;

public interface UserService {
    User registration(User user, boolean withPassword);
    UserDTO readById(Long id);
    UserDTO readByLogin(String login);
    Long existByLogin(String login);
    Optional<User> readUserByLogin(String login);
    Iterable<UserDTO> readAll();
    Iterable<UserDTO> read(String search, int page, int size);
    Long count(String search);
}
