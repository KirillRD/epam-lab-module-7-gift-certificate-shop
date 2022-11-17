package com.epam.esm.service.impl;

import com.epam.esm.dao.TagDAO;
import com.epam.esm.entity.GiftCertificate;
import com.epam.esm.entity.Tag;
import com.epam.esm.exception.ExistingLinkException;
import com.epam.esm.exception.NotFoundEntityByIdException;
import com.epam.esm.exception.NotFoundEntityByNameException;
import com.epam.esm.service.TagService;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TagServiceImpl implements TagService {

    private final TagDAO tagDAO;

    @Autowired
    public TagServiceImpl(TagDAO tagDAO) {
        this.tagDAO = tagDAO;
    }

    @Override
    public void create(Tag tag) {
        tagDAO.save(tag);
    }

    @Override
    public Tag readById(Long id) {
        return tagDAO.findById(id).orElseThrow(() -> new NotFoundEntityByIdException(Tag.class.getSimpleName(), id));
    }

    @Override
    public Iterable<Tag> readAll() {
        return tagDAO.findAll();
    }

    @Override
    public Iterable<Tag> read(String search, int page, int size) {
        return tagDAO.find(search, page, size);
    }

    @Override
    public Tag readByName(String name) {
        return tagDAO.findByName(name).orElseThrow(() -> new NotFoundEntityByNameException(Tag.class.getSimpleName(), name));
    }

    @Override
    public Long existByName(String name) {
        Optional<Tag> tag = tagDAO.findByName(name);
        return tag.isPresent() ? tag.get().getId() : 0;
    }

    @Override
    public Long count(String search) {
        return tagDAO.count(search);
    }

    @Override
    public void update(Tag tag) {
        tagDAO.update(
                createEntityForUpdate(
                        tagDAO.findById(tag.getId()).orElseThrow(() -> new NotFoundEntityByIdException(Tag.class.getSimpleName(), tag.getId())),
                        tag
                )
        );
    }

    @Override
    public Iterable<Tag> readMostWidelyUsedTags() {
        return tagDAO.findMostWidelyUsedTags();
    }

    @Override
    public Iterable<Tag> readMostWidelyUsedTagsOfOrders() {
        return tagDAO.findMostWidelyUsedTagsOfOrders();
    }

    @Override
    public void deleteById(Long id) {
        Tag tag = tagDAO.findById(id).orElseThrow(() -> new NotFoundEntityByIdException(Tag.class.getSimpleName(), id));
        if (CollectionUtils.isNotEmpty(tag.getGiftCertificates())) {
            throw new ExistingLinkException(Tag.class.getSimpleName(), GiftCertificate.class.getSimpleName());
        }
        tagDAO.deleteById(id);
    }

    private Tag createEntityForUpdate(Tag entity, Tag fields) {
        if (fields.getName() != null) {
            entity.setName(fields.getName());
        }

        return entity;
    }
}
