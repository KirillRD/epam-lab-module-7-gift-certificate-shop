package com.epam.esm.service;

import com.epam.esm.entity.GiftCertificate;

import java.util.List;

public interface GiftCertificateService {
    void create(GiftCertificate giftCertificate);
    GiftCertificate readById(Long id);
    Iterable<GiftCertificate> readAll();
    Iterable<GiftCertificate> read(String search, List<String> tags, List<String> sorts, int page, int size);
    Long existByName(String name);
    Long count(String search, List<String> tags);
    void update(GiftCertificate giftCertificate);
    void deleteById(Long id);
}
