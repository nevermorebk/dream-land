/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.service.impl;

import com.spring.dland.common.model.Area;
import com.spring.dland.model.request.AreaRequest;
import com.spring.dland.service.AreaService;
import com.spring.dland.storage.mysql.AreaRepository;

import java.util.Optional;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */


public class AreaServiceImpl extends AbstractService<Area, Long, AreaRepository> implements AreaService{

    @Override
    public Optional<Long> add(Area area) {

        return Optional.of(repo.save(area).getId());
    }


    @Override
    public Optional<Area> get(Long id) {
        return Optional.of(repo.findOne(id));
    }
}
