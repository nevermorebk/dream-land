/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.fontend.controller;

import com.spring.dland.core.controller.AbstractController;
import com.spring.dland.fontend.gateway.AreaGateway;
import com.spring.dland.model.request.AreaRequest;
import com.spring.dland.model.response.DlandResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */

@RestController
@RequestMapping(value = "/area")
public class AreaController extends AbstractController<AreaGateway>{

    @PostMapping(value = "/add")
    public DlandResponse<?> add(@RequestBody AreaRequest request){
        Optional<Long> response = gateway.add(request);
        return toResult(response);
    }

}
