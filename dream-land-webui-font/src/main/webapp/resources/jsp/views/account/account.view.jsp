<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@    taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<section class="content-header">
    <h1>
        Tài khoản
        <%--<small>Tài khoản </small>--%>
    </h1>
    <ol class="breadcrumb">
        <li>
            <a href="${pageContext.request.contextPath}/"><i class="fa fa-dashboard"></i> Trang chủ</a>
        </li>
        <%--<li>
            <a href="#">Quản lý</a>
        </li>--%>
        <li class="active">
            <a href="${pageContext.request.contextPath}/account/list">Tài khoản</a>
        </li>
    </ol>
</section>

<section class="content">
    <div class="row">
        <div class="col-md-12" style="display: none" id="message">
            <div class="alert alert-danger alert-dismissible">
                <button type="button" class="close" data-dismiss="alert"
                        aria-hidden="true">×</button>
                <h4>
                    <i class="icon fa fa-ban"></i>Thông báo!
                </h4>
                <h4 id="content"></h4>
            </div>
        </div>
    </div>
    <div class="row">
        <!-- Date -->
        <div class="col-xs-12 col-md-2">
            <div class="form-group">
                <div class="input-group date">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                    <input placeholder="Ngày khởi tạo từ" type="text"
                           class="form-control pull-right" id="fromDate" name="fromDate"
                           value="${fromDate }">
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-2">
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

        <!-- STATUS -->
        <div class="col-xs-12 col-md-2">
            <div class="form-group">
                <select class="form-control" id="status" name="status">
                    <option value="">Tất cả</option>
                    <option selected="selected" value="1">Hoạt động</option>
                    <option value="2">Tạm khóa</option>
                    <option value="0">Chờ kích hoạt</option>
                    <option value="-1">Khóa</option>
                </select>
            </div>
        </div>

        <!-- ACCOUNT TYPE -->
        <div class="col-xs-12 col-md-2">
            <div class="form-group">
                <select class="form-control" id="accountType" name="accountType">
                    <option selected="selected" value="">Tài khoản</option>
                    <option value="0">Partner</option>
                    <option value="1">Agent</option>
                    <option value="2">Buyer</option>
                </select>
            </div>
        </div>

        <!-- PARTNER NAME -->
        <div class="col-xs-12 col-md-2">
            <div class="form-group">
                <select class="form-control" id="partner" name="partner">
                    <option selected="selected" value="">Loại ví</option>
                    <!-- Get Data via AJAX -->
                </select>
            </div>
        </div>

        <!-- KEY WORD -->
        <div class="col-xs-12 col-md-2">
            <div class="form-group">
                <input placeholder="Nhập SĐT, STK"
                       type="text" class="form-control" id="keyword" name="keyword"
                       autocomplete="on">
            </div>
        </div>
    </div>
    <!-- BUTTON -->
    <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12 text-center">
            <button type="button" class="btn btn-blue btn-flat" id="search" ><i class="fa fa-search"></i>&nbsp;&nbsp;Tìm
                kiếm
            </button>
            <button type="button" class="btn btn-blue btn-flat" id="export"><i
                    class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất báo cáo
            </button>
            <button type="button" class="btn btn-blue btn-flat" id="reset"><i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại 
            </button>
        </div>
    </div>

    <!-- DATA TABLE -->
    <div class="row" id="account-table">
    	<div class="col-xs-12 col-md-12">
        	<div class="box">
            	<div class="box-body">
                	<div class="box-footer clearfix" >
                    	<ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
                        	<!-- Bind via AJAX -->
                    	</ul>
                	</div>
                	<div class="table-responsive">
                    	<table class="table table-bordered table-hover table-striped" >
                        	<thead>
                            	<tr>
                                	<%--<th class='text-nowrap col-md-1'>#</th>--%>
                                	<th class='text-nowrap col-md-1'>Đối tác</th>
                                	<th class='text-nowrap col-md-1'>Loại tài khoản</th>
                                	<th class='text-nowrap col-md-2'>Họ tên</th>
                                	<th class='text-nowrap col-md-1'>Số điện thoại</th>
                                	<th class='text-nowrap col-md-2' style="width: 10%">Tài khoản</th>
                                	<th class='text-nowrap col-md-2' style="text-align: right;">Số dư</th>
                                	<th class='text-nowrap col-md-2' style="width: 10%">Trạng thái</th>
                                	<th class='text-nowrap col-md-1'>Chức năng</th>
                            	</tr>
                        	</thead>
                        	<tbody id="accountTableBody">
                        		<!-- Bind via AJAX -->
                        	</tbody>
                    	</table>
                	</div>
                	<div class="box-footer clearfix" >
                    	<ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
                        	<!-- Bind via AJAX -->
                    	</ul>
                	</div>
            	</div>
        	</div>
    	</div>    
    </div>

</section>

<div class="modal fade" id="reset-password-form-modal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12 col-md-12">
                        <div class="form-group">
                            <label for="content">Bạn có chắc chắn reset password cho
                                người dùng họ tên/sđt?</label>
                            <!-- <input type="text"
                                name="content" class="form-control" disabled="disabled" value="Bạn có chắc chắn reset password cho người dùng họ tên/sđt?" /> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-blue btn-flat" name="confirm-form">Đồng
                    ý</button>
                <button type="button" class="btn btn-blue btn-flat" data-dismiss="modal">Hủy
                    bỏ</button>
            </div>
        </div>
    </div>
</div>

