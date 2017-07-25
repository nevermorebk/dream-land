/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.transformer.impl;

import com.spring.dland.common.model.Area;
import com.spring.dland.model.request.AreaRequest;
import com.spring.dland.service.AreaService;
import com.spring.dland.transformer.AreaTransformer;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */


public class AreaTransformerImpl implements AreaTransformer {

    @Autowired
    private AreaService areaService;
    @Override
    public Area convertToArea(AreaRequest request) {
        Area area = new Area();
        if(request.getId() > 0){
         area.setId(request.getId());
        }
        area.setName(request.getName());
        area.setParentArea(areaService.get(request.getParentAreaId()).get());
        return area;
    }
}
