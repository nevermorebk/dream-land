/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.model.response;

import java.util.List;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */


public class PageDland<T> {

    private final long count;
    private final List<T> page;

    public PageDland(long count, List<T> page) {
        this.count = count;
        this.page = page;
    }

    public long getCount() {
        return count;
    }

    public List<T> getPage() {
        return page;
    }

}
