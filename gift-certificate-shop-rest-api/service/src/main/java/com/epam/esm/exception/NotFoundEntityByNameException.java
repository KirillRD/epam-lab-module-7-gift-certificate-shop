package com.epam.esm.exception;

public class NotFoundEntityByNameException extends ServiceException {
    public NotFoundEntityByNameException(String fieldName, Object fieldValue) {
        super("error.not-found-entity-by-name", fieldName, fieldValue);
    }
}
