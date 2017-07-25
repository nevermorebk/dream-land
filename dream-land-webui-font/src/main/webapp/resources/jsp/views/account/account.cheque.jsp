<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page
        contentType="text/html;charset=UTF-8" %>
<%@ taglib
        uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>

<section class="content-header">
    <h1>
        Quản lý
        <small>Tài khoản Ví</small>
        <br>
        <small>Sao kê tài khoản:</small>
        <span id="accountNo">${accountNo }</span>
    </h1>
    <ol class="breadcrumb">
        <li>
            <a href="${pageContext.request.contextPath}/"><i class="fa fa-dashboard"></i> Trang chủ</a>
        </li>
        <li>
            <a href="#">Quản lý</a>
        </li>
        <li>
            <a href="${pageContext.request.contextPath}/account/list">Tài khoản Ví</a>
        </li>
        <li class="active">
            <a href="${pageContext.request.contextPath}/account/cheque?accountNo=${accountNo }">Sao
                kê</a>
        </li>

    </ol>
</section>
<section class="content">

    <div class="row">
        <!-- Date -->
        <div class="col-xs-6 col-md-3">
            <div class="form-group">
                <div class="input-group date">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                    <input placeholder="Từ ngày" type="text"
                           class="form-control pull-right" id="fromDate" name="fromDate"
                           value="${fromDate }">
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3">
            <div class="form-group">
                <div class="input-group date">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                    <input placeholder="Đến ngày" type="text"
                           class="form-control pull-right" id="toDate" name="toDate"
                           value="${toDate }">
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-3">
            <div class="form-group">
                <button type="button" class="btn btn-blue btn-flat" onclick="exportExcel()"
                        id="export-cheque" name="export-cheque">
                    <i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất Excel</button>
            </div>
        </div>

    </div>

    <!-- Bind via Ajax -->
    <div class="row" id="chequeData">
    </div>
</section>
