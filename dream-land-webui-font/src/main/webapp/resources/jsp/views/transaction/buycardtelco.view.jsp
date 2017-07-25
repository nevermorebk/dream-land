<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<section class="content-header">
	<h1>
		Pin Code <%--<small>Mua thẻ điện thoại</small>--%>
	</h1>
	<ol class="breadcrumb">
		<li>
			<a href="${pageContext.request.contextPath }/home"><i class="fa fa-dashboard"></i> Trang chủ</a>
		</li>
		<%--<li>
			<a href="#">Giao dịch</a>
		</li>--%>
		<li class="active">
			<a href="${pageContext.request.contextPath}/transaction/buy-card-telco">Pin Code</a>
		</li>
	</ol>	
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12 col-md-3" style="width: 13%">
			<div class="form-group">
				<div class="input-group date">
					<div class="input-group-addon">
						<i class="fa fa-calendar"></i>
					</div>
					<input placeholder="Ngày bắt đầu" type="text" class="form-control pull-right" 
						id="fromDate" name="fromDate" value="" >
				</div>
			</div>
		</div>

		<div class="col-xs-12 col-md-3" style="width: 13%">
			<div class="form-group">
				<div class="input-group date">
					<div class="input-group-addon">
						<i class="fa fa-calendar"></i>
					</div>
					<input placeholder="Ngày kết thúc" type="text" class="form-control pull-right" 
						id="toDate" name="toDate" value="${ toDate }" >
				</div>
			</div>
		</div>

		<div class="col-xs-12 col-md-3" style="width: 11%">
			<div class="form-group">
				<select class="form-control" id="status" name="status" style="width: 100%;"></select>
			</div>
		</div>

		<div class="col-xs-12 col-md-3" style="width: 10%">
			<div class="form-group">
				<input class="form-control" placeholder="Mã GD PayDee" type="text" 
					id="transactionId" name="transactionId">
			</div>
		</div>
		
		<%--<div class="col-xs-12 col-md-3">
			<div class="form-group">
				<select class="form-control" id="provider" name="provider" style="width: 100%;">
					<option value="-1">Chọn nhà cung cấp</option>
					<!-- Get Data via AJAX -->
				</select>
			</div>
		</div>--%>

		<div class="col-xs-12 col-md-3" style="width: 10%">
			<div class="form-group">
				<select class="form-control" id="partner" name="partner" style="width: 100%;">
					<option value="-1">Loại ví</option>
					<!-- Get Data via AJAX -->
				</select>
			</div>
		</div>

		<div class="col-xs-12 col-md-3" style="width: 11%">
			<div class="form-group">
				<input class="form-control" placeholder="Số tài khoản" type="text" 
					id="accountNo" name="accountNo">
			</div>
		</div>
<div class="col-xs-12 col-md-3" style="width: 10%">
			<div class="form-group">
				<input class="form-control" placeholder="Mã Ref" type="text" 
					id="requestId" name="requestId">
			</div>
		</div>
		<div class="col-xs-12 col-md-3" style="width: 11%">
			<div class="form-group">
				<select class="form-control" id="issuer" name="issuer" style="width: 100%;">
					<option value="-1">Sản phẩm</option>
					<!-- Get Data via AJAX -->
				</select>
			</div>
		</div>
		<div class="col-xs-12 col-md-3" style="width: 11%">
			<div class="form-group">
				<select class="form-control" id="product" name="product" style="width: 100%;">
					<option value="-1">Mệnh giá</option>
					<!-- Get Data via AJAX -->
				</select>
			</div>
		</div>
	</div>
	
	<div class="row" style="margin-bottom: 10px;">
		<div class="col-md-12 text-center">
			<a id="search" class="btn btn-flat btn-blue">
				<i class="fa fa-search"></i>&nbsp;&nbsp;Tìm kiếm
			</a> 
			<a id="export" class="btn btn-flat btn-blue"> 
				<i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất báo cáo 
			</a>
			<a id="reset" class="btn btn-flat btn-blue"> 
				<i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại
			</a>
		</div>
	</div>

	<div class="row" id="buycard-table">
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
								<%--<th class="text-nowrap">#</th>--%>
								<th class="text-nowrap">Mã GD</th>
								<th class="text-nowrap">Mã Ref</th>
								<th class="text-nowrap">Thời gian GD</th>
								<th class="text-nowrap">Loại ví</th>
								<th class="text-nowrap">Khách hàng</th>
								<th class="text-nowrap">Điện thoại</th>
								<th class="text-nowrap">Tài khoản</th>
								<th class="text-nowrap">Sản phẩm</th>
								<th class="text-nowrap" style="text-align: right;">Mệnh giá</th>
								<th class="text-nowrap" style="text-align: right;">Số lượng</th>
								<th class="text-nowrap" style="text-align: right;">Thành tiền</th>
								<th class="text-nowrap" style="text-align: right;">Chiết khấu (%)</th>
								<th class="text-nowrap" style="text-align: right;">Số tiền</th>
								<th class="text-nowrap">Thời gian kết thúc</th>
								<th class="text-nowrap">Trạng Thái</th>
								<!-- <th class="text-nowrap">Thao tác</th> -->
							</tr>
						<thead>
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
