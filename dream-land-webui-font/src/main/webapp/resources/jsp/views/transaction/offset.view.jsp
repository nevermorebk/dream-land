<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<section class="content-header">
	<h1>
		Lịch sử bù trừ GQKN
	</h1>
	<ol class="breadcrumb">
		<li>
			<a href="${pageContext.request.contextPath}/"><i class="fa fa-dashboard"></i> Trang chủ</a>
		</li>
		<%--<li>
			<a href="#">Giao dịch</a>
		</li>--%>
		<li class="active">
			<a href="${pageContext.request.contextPath}/transaction/offset">Lịch sử bù trừ GQKN</a>
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
	<div class="row" id="offset-search-form" >
			<!-- Date -->
			<div class="col-xs-12 col-md-2" style="width: 14%">
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
			<div class="col-xs-12 col-md-2" style="width: 14%">
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
			<!-- OFFSET TRANSACTION ID -->
			<div class="col-xs-12 col-md-2" style="width: 12%">
				<div class="form-group">
					<input type="text" class="form-control" name="transactionId" 
					id="transactionId" placeholder="Mã GD" value="">
				</div>
			</div>
			
			<!-- PARTNER -->
			<div class="col-xs-12 col-md-2" style="width: 12%">
				<div class="form-group">
					<select class="form-control" id="partner" name="partner">
						<option value="-1">Loại ví</option>
						<!-- Get Data via AJAX -->
					</select>
				</div>
			</div>
			<!-- PAYDEE ACCOUNT -->
			<div class="col-xs-12 col-md-2" style="width: 12%">
				<div class="form-group">
					<input type="text" class="form-control" name="accountId" 
					id="accountId" placeholder="Số TK" value="">
				</div>
			</div>
			<!-- USER -->
			<div class="col-xs-12 col-md-2" style="width: 12%">
				<div class="form-group">
					<input type="text" class="form-control" name="userId"
					id="userId" placeholder="Người thực hiện" value="">
				</div>
			</div>
			<!-- ORIGINAL TRANSACTION ID -->
			<div class="col-xs-12 col-md-2" style="width: 12%">
				<div class="form-group">
					<input type="text" class="form-control" name="originalTransId"
					id="originalTransId" placeholder="Mã GD gốc" value="">
				</div>
			</div>
			<!-- ORIGINAL TRANSACTION TYPE -->
			<div class="col-xs-12 col-md-2" style="width: 12%">
				<div class="form-group">										
					<select class="form-control" id="originalTransType" name="originalTransType">
						<option value="-1">Loại GD Gốc</option>
						<!-- Get Data via JS -->
					</select>
				</div>
			</div>
	</div>
	
	<div class="row" style="margin-bottom: 10px;">
		<div class="col-md-12 text-center">
			<button type="button" class="btn btn-blue btn-flat" id="search-transaction" name="search-transaction">
				<i class="fa fa-search"></i>&nbsp;&nbsp;Tìm kiếm
			</button>
			<button type="button" class="btn btn-blue btn-flat" id="to-excel-transaction" name="to-excel-transaction">
				<i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất báo cáo
			</button> 
			<button type="button" class="btn btn-blue btn-flat" id="reset-transaction" name="reset-transaction">
				<i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại
			</button>
		</div>
	</div>

	<div class="row" id="transactionTable">
		<div class="col-xs-12 col-md-12">
			<div class="box">
				<div class="box-footer clearfix" id="pagination">
					<ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
						<!-- Bind data via Ajax -->
					</ul>
				</div>
				<%--<div class="box-header"></div>--%>
				<div class="box-body table-responsive">
					<table class="table table-hover">
						<thead>
							<tr>
								<%--<th class="text-nowrap">#</th>--%>
								<th class="text-nowrap" style="text-align: left; width: 10%">Mã GD</th>								
								<th class="text-nowrap" style="text-align: left;">Thời gian GD</th>																
								<th class="text-nowrap" style="text-align: left;">Loại ví</th>
								<th class="text-nowrap" style="text-align: left;">Khách hàng</th>
								<th class="text-nowrap" style="text-align: left;">Điện thoại</th>								
								<th class="text-nowrap" style="text-align: left;">Tài khoản</th>
								<th class="text-nowrap" style="text-align: left;">Mã GD gốc</th>
								<th class="text-nowrap" style="text-align: left;">Loại GD gốc</th>
								<th class="text-nowrap" style="text-align: right;">Số tiền</th>
								<th class="text-nowrap" style="text-align: right;">Người thực hiện</th>
							</tr>
						</thead>
						<tbody id="transactionTableBody">
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