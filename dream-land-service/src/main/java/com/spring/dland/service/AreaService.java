/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.service;

import com.spring.dland.common.model.Area;
import com.spring.dland.model.request.AreaRequest;

import java.util.Optional;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */


public interface AreaService {

    Optional<Long> add(Area area);

    Optional<Area> get(Long id);

}
