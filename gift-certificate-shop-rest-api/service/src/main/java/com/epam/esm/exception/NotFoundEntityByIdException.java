package com.epam.esm.exception;

public class NotFoundEntityByIdException extends ServiceException {
    public NotFoundEntityByIdException(String fieldName, Object fieldValue) {
        super("error.not-found-entity-by-id", fieldName, fieldValue);
    }
}
