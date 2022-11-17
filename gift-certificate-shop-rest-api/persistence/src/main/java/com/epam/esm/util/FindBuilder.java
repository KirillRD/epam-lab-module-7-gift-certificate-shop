package com.epam.esm.util;

import com.epam.esm.entity.GiftCertificate;
import com.epam.esm.entity.Tag;
import com.epam.esm.entity.User;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class FindBuilder {

    public FindBuilder() {
    }

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String DESCRIPTION = "description";
    private static final String CREATE_DATE = "createDate";
    private static final String LAST_UPDATE_DATE = "lastUpdateDate";

    private static final String LOGIN = "login";

    private static final String TAGS = "tags";

    private static final String PERCENTAGE = "\\%";
    private static final String UNDERSCORE = "\\_";
    private static final String BACKSLASH = "\\";
    private static final String LIKE_PATTERN = "%%%s%%";

    private static final Map<String, Orderable<GiftCertificate>> orders = new HashMap<>() {{
        put("name-asc", (CriteriaBuilder builder, Root<GiftCertificate> root) -> builder.asc(root.get(NAME)));
        put("name-desc", (CriteriaBuilder builder, Root<GiftCertificate> root) -> builder.desc(root.get(NAME)));
        put("create-date-asc", (CriteriaBuilder builder, Root<GiftCertificate> root) -> builder.asc(root.get(CREATE_DATE)));
        put("create-date-desc", (CriteriaBuilder builder, Root<GiftCertificate> root) -> builder.desc(root.get(CREATE_DATE)));
        put("last-update-date-asc", (CriteriaBuilder builder, Root<GiftCertificate> root) -> builder.asc(root.get(LAST_UPDATE_DATE)));
        put("last-update-date-desc", (CriteriaBuilder builder, Root<GiftCertificate> root) -> builder.desc(root.get(LAST_UPDATE_DATE)));
    }};

    public Predicate getGiftCertificateSearchPredicate(String search, CriteriaBuilder builder, Root<GiftCertificate> root) {
        search = search.replaceAll(PERCENTAGE, BACKSLASH + PERCENTAGE);
        search = search.replaceAll(UNDERSCORE, BACKSLASH + UNDERSCORE);
        return builder.or(
                builder.like(root.get(NAME), String.format(LIKE_PATTERN, search)),
                builder.like(root.get(DESCRIPTION), String.format(LIKE_PATTERN, search))
        );
    }

    public Predicate getTagSearchPredicate(String search, CriteriaBuilder builder, Root<Tag> root) {
        search = search.replaceAll(PERCENTAGE, BACKSLASH + PERCENTAGE);
        search = search.replaceAll(UNDERSCORE, BACKSLASH + UNDERSCORE);
        return builder.like(root.get(NAME), String.format(LIKE_PATTERN, search));
    }

    public Predicate getUserSearchPredicate(String search, CriteriaBuilder builder, Root<User> root) {
        search = search.replaceAll(PERCENTAGE, BACKSLASH + PERCENTAGE);
        search = search.replaceAll(UNDERSCORE, BACKSLASH + UNDERSCORE);
        return builder.or(
                builder.like(root.get(NAME), String.format(LIKE_PATTERN, search)),
                builder.like(root.get(LOGIN), String.format(LIKE_PATTERN, search))
        );
    }

    public Predicate addFindByTags(List<String> tags, CriteriaQuery<GiftCertificate> criteriaQuery, CriteriaBuilder builder, Root<GiftCertificate> root) {
        Join<GiftCertificate, Tag> join = root.join(TAGS);
        criteriaQuery
                .groupBy(root.get(ID))
                .having(builder.greaterThanOrEqualTo(builder.count(join.get(ID)), Long.valueOf(tags.size())));
        return join.get(NAME).in(tags);
    }

    public List<Order> getOrders(List<String> sorts, CriteriaBuilder builder, Root<GiftCertificate> root) {
        return sorts.stream().filter(orders::containsKey).map(orders::get).map(order -> order.getOrder(builder, root)).collect(Collectors.toList());
    }
}
