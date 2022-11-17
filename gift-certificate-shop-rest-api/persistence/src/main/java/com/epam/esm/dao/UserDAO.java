package com.epam.esm.dao;

import com.epam.esm.entity.User;

import java.util.Optional;

public interface UserDAO extends AbstractDAO<User> {
    Optional<User> findByLogin(String login);
    Iterable<User> find(String search, int page, int size);
    Long count(String search);
}
