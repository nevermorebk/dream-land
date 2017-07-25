/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.transformer;

import com.spring.dland.common.model.Area;
import com.spring.dland.model.request.AreaRequest;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */


public interface AreaTransformer {

    Area convertToArea(AreaRequest request);

}
