/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.model.response;

import java.io.Serializable;
import java.util.List;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */


public class DlandPageDataResponse<T> implements Serializable{
    private Long count;
    private List<T> page;

    public DlandPageDataResponse() {
        //contract for jackson create Response and binding data
    }

    public DlandPageDataResponse(Long count, List<T> page) {
        this.count = count;
        this.page = page;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public List<T> getPage() {
        return page;
    }

    public void setPage(List<T> page) {
        this.page = page;
    }
}
