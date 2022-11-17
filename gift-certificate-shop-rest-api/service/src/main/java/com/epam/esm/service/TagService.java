package com.epam.esm.service;

import com.epam.esm.entity.Tag;

public interface TagService {
    void create(Tag tag);
    Tag readById(Long id);
    Iterable<Tag> readAll();
    Iterable<Tag> read(String search, int page, int size);
    Tag readByName(String name);
    Long existByName(String name);
    Long count(String search);
    void update(Tag tag);
    Iterable<Tag> readMostWidelyUsedTags();
    Iterable<Tag> readMostWidelyUsedTagsOfOrders();
    void deleteById(Long id);
}
