<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@	taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<section class="content-header">
	<h1>
		Chuyển tiền <%--<small>Chuyển tiền</small>--%>
	</h1>
	<ol class="breadcrumb">
		<li>
			<a href="${pageContext.request.contextPath}/"><i class="fa fa-dashboard"></i> Trang chủ</a>
		</li>
		<%--<li>
			<a href="#">Giao dịch</a>
		</li>--%>
		<li class="active">
			<a href="${pageContext.request.contextPath}/transaction/transfer">Chuyển tiền</a>
		</li>
	</ol>
</section>

<section class="content">
	<div class="row">
		<div class="col-md-12" style="display: none" id="message">
			<div class="alert alert-danger alert-dismissible">
				<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
				<h4><i class="icon fa fa-ban"></i>Thông báo!</h4>
				<h4 id="content"></h4>
			</div>
		</div>
	</div>
	<div class="row" id="transfer-search-form" >
			<!-- Date -->
			<div class="col-xs-12 col-md-2">
				<div class="form-group">
					<div class="input-group date">
						<div class="input-group-addon">
							<i class="fa fa-calendar"></i>
						</div>
						<input placeholder="Ngày bắt đầu" type="text"
							class="form-control pull-right" id="fromDate" name="fromDate"
							value="">
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-md-2">
				<div class="form-group">
					<div class="input-group date">
						<div class="input-group-addon">
							<i class="fa fa-calendar"></i>
						</div>
						<input placeholder="Ngày kết thúc" type="text"
							class="form-control pull-right" id="toDate" name="toDate"
							value="${ toDate }">
					</div>
				</div>
			</div>
			<!-- TRANSACTION ID -->
			<div class="col-xs-12 col-md-2">
				<div class="form-group">
					<input type="text" class="form-control" name="transactionId" 
					id="transactionId" placeholder="Mã giao dịch" value="${transactionId }">
				</div>
			</div>
			
			<!-- PARTNER -->
			<div class="col-xs-12 col-md-2">
				<div class="form-group">
					<select class="form-control" id="partner" name="partner">
						<option value="">Loại ví</option>
						<!-- Get Data via AJAX -->
					</select>
				</div>
			</div>
			
			<!-- SOURCE ACC -->
			<div class="col-xs-12 col-md-2">
				<div class="form-group">
					<input type="text" class="form-control" name="sourceAccountNo" 
					id="sourceAccountNo" placeholder="Tài khoản chuyển" value="${sourceAccountNo }">
				</div>
			</div>
			
			<!-- TARGET ACC -->
			<div class="col-xs-12 col-md-2">
				<div class="form-group">
					<input type="text" class="form-control" name="targetAccountNo" 
					id="targetAccountNo" placeholder="Tài khoản nhận" value="${targetAccountNo }">	
				</div>	
			</div>
	</div>
	
	<div class="row" style="margin-bottom: 10px;">
		<div class="col-md-12 text-center">
			<button type="button" class="btn btn-blue btn-flat" id="search-transfer" name="search-transfer">
				<i class="fa fa-search"></i>&nbsp;&nbsp;Tìm kiếm
			</button>
			<button type="button" class="btn btn-blue btn-flat" id="to-excel-transfer" name="to-excel-transfer">
				<i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất báo cáo
			</button>
			<button type="button" class="btn btn-blue btn-flat" id="reset-transfer" name="reset-transfer">
				<i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại
			</button>
		</div>
	</div>

	<div class="row">
		<div class="col-xs-12 col-md-12">
			<div class="box">
				<div class="box-footer clearfix" id="pagination">
					<ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
						<!-- Bind data via Ajax -->
					</ul>
				</div>
				<%--<div class="box-header"></div>--%>
				<div class="box-body table-responsive">
					<table class="table table-hover" id="transferTable">
						<thead>
							<tr>
								<%--<th class="text-nowrap">#</th>--%>
								<th class="text-nowrap" style="text-align: left; width: 10%">Mã giao dịch</th>
								<th class="text-nowrap" style="text-align: left;">Thời gian giao dịch</th>
								<th class="text-nowrap" style="text-align: left;">Loại ví</th>
								<th class="text-nowrap" style="text-align: left;">Người chuyển</th>
								<th class="text-nowrap" style="text-align: left;">Tài khoản chuyển</th>
								<th class="text-nowrap" style="text-align: left;">Người nhận</th>
								<th class="text-nowrap" style="text-align: left;">Tài khoản nhận</th>
								<th class="text-nowrap" style="text-align: right;">Số tiền</th>
							</tr>
						</thead>
						<tbody id="transferTableBody">
							<!-- Bind via AJAX -->
						</tbody>
					</table>
				</div>
				<div class="box-footer clearfix" id="pagination">
					<ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
						<!-- Bind data via Ajax -->
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
