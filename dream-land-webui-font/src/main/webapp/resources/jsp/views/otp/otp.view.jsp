<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<section class="content-header">
	<h1>
		SMS OTP<%--<small>Mã OTP</small>--%>
	</h1>
	<ol class="breadcrumb">
		<li>
			<a href="${pageContext.request.contextPath }/home"><i class="fa fa-dashboard"></i> Trang chủ</a>
		</li>
		<%--<li>
			<a href="#">Quản lý</a>
		</li>--%>
		<li class="active">
			<a href="${pageContext.request.contextPath}/otp/search">SMS OTP</a>
		</li>
	</ol>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12 col-md-4" style="width:20%;">
			<div class="form-group">
				<div class="input-group date">
					<div class="input-group-addon">
						<i class="fa fa-calendar"></i>
					</div>
					<input placeholder="Ngày bắt đầu" type="text" class="form-control pull-right" 
						id="fromDate" name="fromDate" value="">
				</div>
			</div>
		</div>

		<div class="col-xs-12 col-md-4" style="width:20%;">
			<div class="form-group">
				<div class="input-group date">
					<div class="input-group-addon">
						<i class="fa fa-calendar"></i>
					</div>
					<input placeholder="Ngày kết thúc" type="text" class="form-control pull-right" 
						id="toDate" name="toDate" value="${ toDate }">
				</div>
			</div>
		</div>

		<div class="col-xs-12 col-md-4" style="width:20%;">
			<div class="form-group">
				<select class="form-control" id="otpType" name="otpType" style="width: 100%;"></select>
			</div>
		</div>

		<div class="col-xs-12 col-md-4" style="width:20%;">
			<div class="form-group">
                 <input class="form-control" placeholder="Số điện thoại" type="text" 
                 		id="keyword" name="keyword">
			</div>
		</div>

		<div class="col-xs-12 col-md-4" style="width:20%;">
			<div class="form-group">
				<select class="form-control" id="status" name="status" style="width: 100%;"></select>
			</div>
		</div>
	</div>
	
	<div class="row" style="margin-bottom: 10px;">
		<div class="col-md-12 text-center">
			<button type="button" class="btn btn-blue btn-flat" id="search-otp" name="search-otp">
				<i class="fa fa-search"></i>&nbsp;&nbsp;Tìm kiếm
			</button>
			<button type="button" class="btn btn-blue btn-flat" id="export-otp" name="export-otp">
				<i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất báo cáo 
			</button>
			<button type="button" class="btn btn-blue btn-flat" id="reset-otp" name="reset-otp">
				<i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại
			</button>
		</div>
	</div>
	
	<div class="row" id="search-otp-table">
		<div class="col-xs-12 col-md-12">
			<div class="box">
				<div class="box-header"></div>
				<div class="box-footer clearfix" >
					<ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
						<!-- Bind via AJAX -->
					</ul>
				</div>
				<div class="box-body table-responsive">
					<table class="table table-hover">
						<thead>
							<tr>
								<th class="text-nowrap">#</th>
								<th class="text-nowrap">Gửi lúc</th>
								<th class="text-nowrap">Người nhận</th>
								<th class="text-nowrap">SĐT nhận</th>
								<th class="text-nowrap">Phân loại</th>
								<th class="text-nowrap" style="text-align: right;">Số lần gửi</th>
								<th class="text-nowrap">Trạng thái</th>
								<th class="text-nowrap">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							<!-- Bind data via Ajax -->
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
</section>