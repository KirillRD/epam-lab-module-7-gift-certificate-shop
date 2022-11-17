package com.epam.esm.dao;

import com.epam.esm.entity.Tag;

import java.util.Optional;

public interface TagDAO extends AbstractDAO<Tag> {
    void update(Tag tag);
    Optional<Tag> findByName(String name);
    Iterable<Tag> findMostWidelyUsedTags();
    Iterable<Tag> findMostWidelyUsedTagsOfOrders();
    Iterable<Tag> find(String search, int page, int size);
    Long count(String search);
}
