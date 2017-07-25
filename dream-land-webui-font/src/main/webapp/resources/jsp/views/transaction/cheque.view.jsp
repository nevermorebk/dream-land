<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page language="java" pageEncoding="UTF-8"%><%@ page
	contentType="text/html;charset=UTF-8"%><%@ taglib
	uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

<section class="content-header">
	<h1>Sao kê</h1>
	<ol class="breadcrumb">
		<li><a href="${pageContext.request.contextPath}/"><i
				class="fa fa-dashboard"></i> Trang chủ</a></li>
		<%--<li><a href="#">Quản lý</a></li>
		<li><a href="${pageContext.request.contextPath}/account/list">Tài
				khoản Ví</a></li>--%>
		<li class="active"><a
			href="${pageContext.request.contextPath}/account/cheque?accountNo=${accountNo }">Sao
				kê</a></li>

	</ol>
</section>
<section class="content">

	<div class="row">
		<!-- Date -->
		<div class="col-xs-6 col-md-4">
			<div class="form-group">
				<div class="input-group date">
					<div class="input-group-addon">
						<i class="fa fa-calendar"></i>
					</div>
					<input placeholder="Từ ngày" type="text"
						class="form-control pull-right" id="fromDate" name="fromDate"
						value="${ fromDate }">
				</div>
			</div>
		</div>
		<div class="col-xs-6 col-md-4">
			<div class="form-group">
				<div class="input-group date">
					<div class="input-group-addon">
						<i class="fa fa-calendar"></i>
					</div>
					<input placeholder="Đến ngày" type="text"
						class="form-control pull-right" id="toDate" name="toDate"
						value="${ toDate }">
				</div>
			</div>
		</div>
		<div class="col-xs-6 col-md-4">
			<div class="form-group">
				<input
					placeholder="Tìm kiếm theo : Số tài khoản"
					type="text" class="form-control" id="keyword" name="keyword"
					autocomplete="on" value="${accountNo}">
			</div>
		</div>
	</div>

	<div class="row" style="margin-bottom: 10px;">
		<div class="col-md-12 text-center">
			<button type="button" class="btn btn-blue btn-flat" id="search">
				<i class="fa fa-search"></i>&nbsp;&nbsp;Tìm kiếm
			</button>
			<button type="button" class="btn btn-blue btn-flat" id="export">
				<i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất báo cáo
			</button>
			<button type="button" class="btn btn-blue btn-flat" id="reset">
				<i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại
			</button>
		</div>
	</div>

	<div class="row">
		<c:if test="${message != null }">
			<div class="row" id="alert">
				<div class="col-md-12">
					<div class="alert alert-danger alert-dismissible">
						<h4>${message }</h4>
					</div>
				</div>
			</div>
		</c:if>
	</div>

	<div class="row" id="cheque-table">
		<div class="col-xs-12 col-md-12">
			<div class="box">
				<div class="box-body">
					<div class="box-footer clearfix" >
						<ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
							<!-- Bind via AJAX -->
						</ul>
					</div>
					<div class="table-responsive">
						<table class="table table-bordered table-hover table-striped">
							<thead>
								<tr>
									<th class='text-nowrap col-md-2'>Mã giao dịch</th>
									<th class='text-nowrap col-md-3'>Thời gian</th>
									<th class='text-nowrap col-md-2'>Loại giao dịch</th>
									<th class='text-nowrap col-md-2' style="text-align: right;">Số tiền</th>
									<th class='text-nowrap col-md-2' style="text-align: right;">Số dư sau GD</th>
								</tr>
							</thead>
							<tbody>
								<!-- Bind data via Ajax -->
							</tbody>
						</table>
					</div>
					<!-- page navigation -->
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
