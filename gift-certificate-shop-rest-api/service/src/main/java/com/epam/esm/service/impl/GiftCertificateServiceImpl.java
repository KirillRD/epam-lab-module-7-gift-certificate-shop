package com.epam.esm.service.impl;

import com.epam.esm.dao.GiftCertificateDAO;
import com.epam.esm.dao.TagDAO;
import com.epam.esm.entity.GiftCertificate;
import com.epam.esm.entity.Order;
import com.epam.esm.entity.Tag;
import com.epam.esm.exception.ExistingLinkException;
import com.epam.esm.exception.InvalidEntityStructureFormatException;
import com.epam.esm.exception.NotFoundEntityByIdException;
import com.epam.esm.service.GiftCertificateService;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GiftCertificateServiceImpl implements GiftCertificateService {

    private final GiftCertificateDAO giftCertificateDAO;
    private final TagDAO tagDAO;

    @Autowired
    public GiftCertificateServiceImpl(GiftCertificateDAO giftCertificateDAO, TagDAO tagDAO) {
        this.giftCertificateDAO = giftCertificateDAO;
        this.tagDAO = tagDAO;
    }

    @Override
    public void create(GiftCertificate giftCertificate) {
        giftCertificate.setTags(preCreatingTags(giftCertificate.getTags()));
        giftCertificateDAO.save(giftCertificate);
    }

    @Override
    public GiftCertificate readById(Long id) {
        return giftCertificateDAO.findById(id).orElseThrow(() -> new NotFoundEntityByIdException(GiftCertificate.class.getSimpleName(), id));
    }

    @Override
    public Iterable<GiftCertificate> readAll() {
        return giftCertificateDAO.findAll();
    }

    @Override
    public Iterable<GiftCertificate> read(String search, List<String> tags, List<String> sorts, int page, int size) {
        return giftCertificateDAO.find(search, tags, sorts, page, size);
    }

    @Override
    public Long existByName(String name) {
        Optional<GiftCertificate> giftCertificate = giftCertificateDAO.findByName(name);
        return giftCertificate.isPresent() ? giftCertificate.get().getId() : 0;
    }

    @Override
    public Long count(String search, List<String> tags) {
        return giftCertificateDAO.count(search, tags);
    }

    @Override
    public void update(GiftCertificate giftCertificate) {
        giftCertificateDAO.update(
                createEntityForUpdate(
                        giftCertificateDAO.findById(giftCertificate.getId()).orElseThrow(() -> new NotFoundEntityByIdException(GiftCertificate.class.getSimpleName(), giftCertificate.getId())),
                        giftCertificate
                )
        );
    }

    @Override
    public void deleteById(Long id) {
        GiftCertificate giftCertificate = giftCertificateDAO.findById(id).orElseThrow(() -> new NotFoundEntityByIdException(GiftCertificate.class.getSimpleName(), id));
        if (CollectionUtils.isNotEmpty(giftCertificate.getOrderDetails())) {
            throw new ExistingLinkException(GiftCertificate.class.getSimpleName(), Order.class.getSimpleName());
        }
        giftCertificateDAO.deleteById(id);
    }

    private GiftCertificate createEntityForUpdate(GiftCertificate entity, GiftCertificate fields) {
        if (fields.getName() != null) {
            entity.setName(fields.getName());
        }

        if (fields.getDescription() != null) {
            entity.setDescription(fields.getDescription());
        }

        if (fields.getPrice() != null) {
            entity.setPrice(fields.getPrice());
        }

        if (fields.getDuration() != 0) {
            entity.setDuration(fields.getDuration());
        }

        entity.setTags(preUpdatingTags(fields.getTags()));

        return entity;
    }

    private List<Tag> preUpdatingTags(List<Tag> tags) {
        List<Tag> newTags = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(tags)) {
            tags.forEach(tag -> {
                Tag existingTag = tagDAO.findById(tag.getId()).orElseThrow(() -> new NotFoundEntityByIdException(Tag.class.getSimpleName(), tag.getId()));
                if (existingTag.getId().equals(tag.getId()) && existingTag.getName().equals(tag.getName())) {
                    newTags.add(existingTag);
                } else {
                    throw new InvalidEntityStructureFormatException(Tag.class.getSimpleName(), tag.toString());
                }
            });
        }

        return newTags;
    }

    private List<Tag> preCreatingTags(List<Tag> tags) {
        List<Tag> newTags = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(tags)) {
            tags.forEach(tag -> {
                Tag existingTag = tagDAO.findById(tag.getId()).orElseThrow(() -> new NotFoundEntityByIdException(Tag.class.getSimpleName(), tag.getId()));
                if (existingTag.getId().equals(tag.getId()) && existingTag.getName().equals(tag.getName())) {
                    newTags.add(existingTag);
                } else {
                    throw new InvalidEntityStructureFormatException(Tag.class.getSimpleName(), tag.toString());
                }
            });
        }

        return newTags;
    }
}
