/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.fontend.gateway;

import com.spring.dland.model.request.AreaRequest;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */

public interface AreaGateway {

    Optional<Long> add (AreaRequest request);

}
