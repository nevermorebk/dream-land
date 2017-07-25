<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<section class="content-header">
	<h1>
		Đổi thẻ cào <%--<small>Nạp tiền thẻ cào</small>--%>
	</h1>
	<ol class="breadcrumb">
		<li>
			<a href="${pageContext.request.contextPath }/home"><i class="fa fa-dashboard"></i> Trang chủ</a>
		</li>
		<%--<li>
			<a href="#">Giao dịch</a>
		</li>--%>
		<li class="active">
			<a href="${pageContext.request.contextPath}/transaction/charging">Đổi thẻ cào</a>
		</li>
	</ol>
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-10 col-md-2" style="width: 16%">
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

		<div class="col-xs-10 col-md-2" style="width: 16%">
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
		
		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
				<select class="form-control" id="status" name="status" style="width: 100%;"></select>
			</div>
		</div>
		
		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
                 <input class="form-control" placeholder="Mã GD PayDee" type="text" 
                 		id="transactionId" name="transactionId">
			</div>
		</div>
		
		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
                 <input class="form-control" placeholder="Mã Ref" type="text" 
                 		id="requestId" name="requestId">
			</div>
		</div>
		
		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
				<select class="form-control" id="partner" name="partner" style="width: 100%;">
					<option value="-1">Loại ví</option>
					<!-- Get Data via AJAX -->
				</select>
			</div>
		</div>
		
		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
                 <input class="form-control" placeholder="Số tài khoản" type="text" 
                 		id="accountNo" name="accountNo">
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

		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
				<select class="form-control" id="issuer" name="issuer" style="width: 100%;">
					<option value="-1">Sản phẩm</option>
					<!-- Get Data via AJAX -->
				</select>
			</div>
		</div>

		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
				<select class="form-control" id="product" name="product" style="width: 100%;">
					<option value="-1">Mệnh giá</option>
					<!-- Get Data via AJAX -->
				</select>
			</div>
		</div>

		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
                 <input class="form-control" placeholder="Serial" type="text" 
                 		id="cardSerial" name="cardSerial">
               </div>
		</div>

		<div class="col-xs-10 col-md-2" style="width: 16%">
			<div class="form-group">
                 <input class="form-control" placeholder="Mã thẻ" type="text" 
                 		id="cardCode" name="cardCode">
               </div>
		</div>
	</div>
	
	<div class="row" style="margin-bottom: 10px;">
		<div class="col-md-12 text-center">
			<button type="button" class="btn btn-blue btn-flat" id="search-charging" name="search-charging">
				<i class="fa fa-search"></i>&nbsp;&nbsp;Tìm kiếm
			</button>
			<button type="button" class="btn btn-blue btn-flat" id="to-excel-charging" name="to-excel-charging">
				<i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất báo cáo
			</button>
			
			<button type="button" class="btn btn-blue btn-flat" id="reset-charging" name="reset-charging">
				<i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại
			</button>
		</div>
	</div>
	
	<div class="row" id="search-charging-table">
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
								<th class="text-nowrap" style="text-align: center;">Thời gian GD</th>
								<th class="text-nowrap">Loại ví</th>
								<th class="text-nowrap">Khách hàng</th>
								<th class="text-nowrap">Điện thoại</th>
								<th class="text-nowrap">Tài khoản</th>
								<th class="text-nowrap">Sản phẩm</th>
								<th class="text-nowrap" style="text-align: center;" >Serial</th>
								<th class="text-nowrap" style="text-align: center;" >Mã thẻ</th>
								<th class="text-nowrap" style="text-align: right;">Mệnh giá</th>
								<th class="text-nowrap" style="text-align: right;">Phí đổi thẻ (%)</th>
								<th class="text-nowrap" style="text-align: right;">Số tiền</th>
								<th class="text-nowrap" style="text-align: center;">Thời gian KT</th>
								<th class="text-nowrap">Trạng thái</th>
								<th class="text-nowrap">Chức năng</th>
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