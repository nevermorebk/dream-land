package com.spring.dland.core.gateway;

import com.spring.dland.model.response.DlandResponse;

/**
 * Created by trungdovan on 20/01/2017.
 */
@FunctionalInterface
public interface RunnableGateway<T> {
  DlandResponse<?> runGateway(T request);
}
