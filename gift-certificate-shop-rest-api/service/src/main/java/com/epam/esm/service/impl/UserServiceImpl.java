package com.epam.esm.service.impl;

import com.epam.esm.dao.RoleDAO;
import com.epam.esm.dao.UserDAO;
import com.epam.esm.dto.UserDTO;
import com.epam.esm.entity.Role;
import com.epam.esm.entity.RoleName;
import com.epam.esm.entity.User;
import com.epam.esm.exception.BlankPasswordException;
import com.epam.esm.exception.NotFoundEntityByIdException;
import com.epam.esm.exception.NotFoundUserException;
import com.epam.esm.service.UserService;
import org.apache.commons.validator.GenericValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserDAO userDAO;
    private final RoleDAO roleDAO;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, RoleDAO roleDAO) {
        this.userDAO = userDAO;
        this.roleDAO = roleDAO;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public User registration(User user, boolean withPassword) {
        if (withPassword) {
            if (GenericValidator.isBlankOrNull(user.getPassword())) {
                throw new BlankPasswordException();
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        addDefaultRole(user);
        return userDAO.save(user);
    }

    @Override
    public UserDTO readById(Long id) {
        return new UserDTO(userDAO.findById(id).orElseThrow(() -> new NotFoundEntityByIdException(User.class.getSimpleName(), id)));
    }

    @Override
    public UserDTO readByLogin(String login) {
        return new UserDTO(userDAO.findByLogin(login).orElseThrow(() -> new NotFoundUserException(login)));
    }

    @Override
    public Long existByLogin(String login) {
        Optional<User> user = userDAO.findByLogin(login);
        return user.isPresent() ? user.get().getId() : 0;
    }

    @Override
    public Optional<User> readUserByLogin(String login) {
        return userDAO.findByLogin(login);
    }

    @Override
    public Iterable<UserDTO> readAll() {
        return StreamSupport.stream(userDAO.findAll().spliterator(), false).map(UserDTO::new).collect(Collectors.toList());
    }

    @Override
    public Iterable<UserDTO> read(String search, int page, int size) {
        return StreamSupport.stream(userDAO.find(search, page, size).spliterator(), false).map(UserDTO::new).collect(Collectors.toList());
    }

    @Override
    public Long count(String search) {
        return userDAO.count(search);
    }

    private void addDefaultRole(User user) {
        Role role = roleDAO.findByName(RoleName.USER).orElseThrow();
        user.setRoles(new HashSet<>() {{
            add(role);
        }});
    }
}
