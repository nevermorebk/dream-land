/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.core.controller;

import com.spring.dland.exception.ErrorCode;
import com.spring.dland.model.response.DlandResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */

public abstract class AbstractController<G> {

    protected final Logger LOGGER;

    protected G gateway;

    public AbstractController() {
        LOGGER = LoggerFactory.getLogger(getClass());
    }

    protected <T> DlandResponse<T> toResult(T t) {
        DlandResponse<T> response = new DlandResponse<T>();
        response.setCode(ErrorCode.SUCCESS);
        response.setMessage(ErrorCode.SUCCESS_DESCRIPTION);
        response.setData(t);
        return response;
    }

    /*protected DlandResponse<String> toResult(Exception exp) {
        if (exp instanceof DlandException) {
            LOGGER.error(exp.getMessage());
            DlandException ux = (DlandException) exp;
            return create(ux);
        }

        Throwable throwable = exp.getCause();
        if (throwable instanceof DlandException || (throwable = throwable.getCause()) instanceof DlandException ) {
            LOGGER.error(exp.getMessage());
            DlandException ux = (DlandException) throwable;
            return create(ux);
        }

        LOGGER.error(exp.getMessage(), exp);
        return create(new DlandException.UnknowException());
    }

    private DlandException<String> create(DlandException ex) {
        DlandException<String> response = new DlandException<String>();
        int code  = ex.getErrorCode();
        response.setCode(code < 10 ? "0" + code : String.valueOf(code));
        response.setMessage(ex.getMessage());
        return response;
    }*/

}
