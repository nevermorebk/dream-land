/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.spring.dland.model.response;

import java.io.Serializable;

/**
 * Author : Quang Tran Dang
 * Email: quang.trandang@homedirect.com
 * 12/07/2017
 */


public class DlandResponse<T> implements Serializable {

    private static final long serialVersionUID = -6669686067446636607L;

    protected String code;
    protected String message;

    protected T data;

    public DlandResponse() {}

    public DlandResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {return code;}
    public void setCode(String code) {this.code = code;}

    public String getMessage() {return message;}
    public void setMessage(String message) {this.message = message;}

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }

    @Override
    public String toString() {
        return "ResponseInfo [code=" + code + ", message=" + message + "]";
    }
}
