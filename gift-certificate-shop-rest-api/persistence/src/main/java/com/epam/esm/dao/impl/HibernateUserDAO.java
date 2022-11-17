package com.epam.esm.dao.impl;

import com.epam.esm.dao.UserDAO;
import com.epam.esm.entity.User;
import com.epam.esm.util.FindBuilder;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Optional;

@Repository
public class HibernateUserDAO extends HibernateAbstractDAO<User> implements UserDAO {

    private static final String LOGIN = "login";

    private final FindBuilder findBuilder;

    public HibernateUserDAO(FindBuilder findBuilder) {
        super(User.class);
        this.findBuilder = findBuilder;
    }

    @Override
    public Optional<User> findByLogin(String name) {
        Session session = getSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<User> query = builder.createQuery(User.class);
        Root<User> root = query.from(User.class);
        query.select(root).where(builder.equal(root.get(LOGIN), name));
        return session.createQuery(query).getResultList().stream().findFirst();
    }

    @Override
    public Iterable<User> find(String search, int page, int size) {
        Session session = getSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<User> criteriaQuery = builder.createQuery(User.class);
        Root<User> root = criteriaQuery.from(User.class);

        if (search != null) {
            Predicate predicate = findBuilder.getUserSearchPredicate(search, builder, root);
            criteriaQuery.where(predicate);
        }

        criteriaQuery.orderBy(builder.asc(root.get(LOGIN)));

        Query<User> query = session.createQuery(criteriaQuery);
        return pagination(query, page, size);
    }

    @Override
    public Long count(String search) {
        Session session = getSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<User> criteriaQuery = builder.createQuery(User.class);
        Root<User> root = criteriaQuery.from(User.class);

        if (search != null) {
            Predicate predicate = findBuilder.getUserSearchPredicate(search, builder, root);
            criteriaQuery.where(predicate);
        }

        criteriaQuery.orderBy(builder.asc(root.get(LOGIN)));

        Query<User> query = session.createQuery(criteriaQuery);
        return (long) query.getResultList().size();
    }
}
