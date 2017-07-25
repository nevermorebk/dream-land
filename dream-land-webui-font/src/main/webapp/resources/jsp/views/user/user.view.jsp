<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@	taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<section class="content-header">
	<h1>
		Khách hàng <%--<small>Người dùng</small>--%>
	</h1>
	<ol class="breadcrumb">
		<li><a href="${pageContext.request.contextPath}/"><i
				class="fa fa-dashboard"></i> Trang chủ</a></li>
		<%--<li><a href="#">Quản lý</a></li>--%>
		<li class="active"><a
			href="${pageContext.request.contextPath}/user">Khách hàng</a></li>
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
	<div class="row" id="transfer-search-form">
		<!-- Date -->
		<div class="col-xs-12 col-md-3">
			<div class="form-group">
				<div class="input-group date">
					<div class="input-group-addon">
						<i class="fa fa-calendar"></i>
					</div>
					<input placeholder="Ngày khởi tạo từ" type="text"
						class="form-control pull-right" id="fromDate" name="fromDate" value="${ fromDate }">
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-md-3">
			<div class="form-group">
				<div class="input-group date">
					<div class="input-group-addon">
						<i class="fa fa-calendar"></i>
					</div>
					<input placeholder="Đến ngày" type="text"
						class="form-control pull-right" id="toDate" name="toDate" value="${ toDate }">
				</div>
			</div>
		</div>

		<!-- STATUS -->
		<div class="col-xs-12 col-md-3">
			<div class="form-group">
				<select class="form-control" id="status" name="status">
					<!-- Bind via AJAX -->
				</select>
			</div>
		</div>

		<!-- KEY WORD -->
		<div class="col-xs-12 col-md-3">
			<div class="form-group">
				<input placeholder="Nhập SĐT, STK"
					type="text" class="form-control" id="keyword" name="keyword"
					autocomplete="on"
					value="${phone}">
			</div>
		</div>
	</div>
	<!-- BUTTON -->
	<div class="row" style="margin-bottom: 10px;">
		<div class="col-md-12 text-center">
			<button type="button" class="btn btn-blue btn-flat" name="search"><i class="fa fa-search"></i>&nbsp;&nbsp;Tìm
				kiếm</button>
			<button type="button" class="btn btn-blue btn-flat" name="export"><i
                    class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất
				báo cáo</button>
				<button type="button" class="btn btn-blue btn-flat" name="reset"><i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại</button>
		</div>
	</div>

	<!-- DATA TABLE -->
	<div class="row" id="user-table">
		<div class="col-md-12">
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
									<%--<th class='text-nowrap col-md-1'>#</th>--%>
									<th class='text-nowrap col-md-1'>Ngày tạo</th>
									<th class='text-nowrap col-md-1'>Họ tên</th>
									<th class='text-nowrap col-md-1'>Số điện thoại</th>
									<th class='text-nowrap col-md-1'>Email</th>
									<th class='text-nowrap col-md-2'>Địa chỉ</th>
									<th class='text-nowrap col-md-1'>Quận/Huyện</th>
									<th class='text-nowrap col-md-1'>Tỉnh/Thành phố</th>
									<th class='text-nowrap col-md-1'>Trạng thái</th>
									<th class='text-nowrap col-md-1'>Chức năng</th>
								</tr>
							</thead>
							<tbody id="userTableBody">
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
<div class="modal fade" id="user-profile-form-modal" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"></h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-12 col-md-6">
						<div class="form-group">
							<label for="createdDate">Ngày đăng ký</label> <input type="text"
								name="createdDate" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="fullName">Họ Tên</label> <input type="text"
								name="fullName" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="phone">Số điện thoại</label> <input type="text"
								name="phone" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="email">Email</label> <input type="text" name="email"
								class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="address">Địa chỉ</label> <input type="text"
								name="address" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="district">Quận/Huyện</label> <input type="text"
								name="district" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="province">Tỉnh/TP</label> <input type="text"
								name="province" class="form-control" disabled="disabled" />
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="gender">Giới tính</label> <input type="text"
								name="gender" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="birthday">Ngày sinh</label> <input type="text"
								name="birthday" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="identityCard">Số CMT</label> <input type="text"
								name="identityCard" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="dateOfIdentity">Ngày cấp</label> <input type="text"
								name="dateOfIdentity" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="placeOfBirth">Nơi cấp</label> <input type="text"
								name="placeOfBirth" class="form-control" disabled="disabled" />
						</div>
						<div class="form-group">
							<label for="status">Trạng thái</label> <input type="text"
								class="form-control" name="status" disabled="disabled" />
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-blue btn-flat" data-dismiss="modal">Quay
					lại</button>
			</div>
		</div>
	</div>
</div>
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
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
			<button type="button" class="btn btn-blue btn-flat" data-dismiss="modal">Hủy
					bỏ</button>
				<button type="button" class="btn btn-blue btn-flat" name="confirm-form">Đồng
					ý</button>
			</div>
		</div>
	</div>
</div>

