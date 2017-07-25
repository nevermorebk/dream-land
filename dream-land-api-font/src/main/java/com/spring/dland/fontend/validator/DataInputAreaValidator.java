/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.fontend.validator;

import com.spring.dland.core.gateway.AbstractInputValidator;
import com.spring.dland.model.request.AreaRequest;
import org.springframework.util.StringUtils;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */


public class DataInputAreaValidator extends AbstractInputValidator<AreaRequest>{

    public void validateCommon() {

    }

    public boolean validateAdd(AreaRequest request) {
        return true;
    }

}
