package com.spring.dland.core.gateway;

import com.spring.dland.model.response.PageDland;

import javax.validation.constraints.NotNull;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */

@FunctionalInterface
public interface FunctionalPageGateway<T, R> {
    /**
     * @param request for request
     * @return not Null
     */
    @NotNull
    PageDland<R> apply(@NotNull T request);
}
