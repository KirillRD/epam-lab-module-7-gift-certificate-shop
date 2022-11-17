package com.epam.esm.dao;

import com.epam.esm.entity.GiftCertificate;

import java.util.List;
import java.util.Optional;

public interface GiftCertificateDAO extends AbstractDAO<GiftCertificate> {
    void update(GiftCertificate giftCertificate);
    Iterable<GiftCertificate> find(String search, List<String> tags, List<String> sorts, int page, int size);
    Long count(String search, List<String> tags);
    Optional<GiftCertificate> findByName(String name);
}
