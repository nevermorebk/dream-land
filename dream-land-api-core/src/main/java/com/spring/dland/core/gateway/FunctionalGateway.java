package com.spring.dland.core.gateway;

import java.util.Optional;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */

@FunctionalInterface
public interface FunctionalGateway<T, R> {
    Optional<R> apply(T request);
}
