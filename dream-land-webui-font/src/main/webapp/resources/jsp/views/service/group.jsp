<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="content-wrapper">
	<div class="box box-primary">
		<div class="modal fade" id="myModal" role="dialog"
			style="margin-top: 30px !important;">
			<div class="modal-dialog">

				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" style="float: left;">Thêm mới dịch vụ</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label>Mã nhà phát hành</label> <input type="text"
								class="form-control" id="name" placeholder="Mã nhà phát hành">
						</div>

						<div class="form-group">
							<label>Tên nhà phát hành</label> <input type="text"
								class="form-control" id="name" placeholder="Tên nhà phát hành">
						</div>
					</div>

					<div class="box-footer">
						<button type="submit" onclick="add()" class="btn btn-primary"
							style="float: right; width: 130px;" data-dismiss="modal">Thêm</button>

						<button type="submit" onclick="submitAndContinue()"
							class="btn btn-primary"
							style="float: right; width: 130px; margin-right: 20px"
							data-dismiss="modal">Thêm và tiếp tục</button>

						<button type="submit" onclick="cancel()" class="btn btn-primary"
							style="float: right; width: 130px; margin-right: 20px"
							data-dismiss="modal">Hủy</button>
					</div>
				</div>

			</div>
		</div>
		<div class="box-header with-border">
			<h3 class="box-title" style="font-size: 150%">Quản lý Dịch vụ</h3>
		</div>
		<!-- /.box-header -->
		<!-- form start -->
		<div class="box-body">
			<div class="box">
				<div class="box-header">
					<h3 class="box-title">Danh sách dịch vụ</h3>

					<div class="box-tools">
						<ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
							<li><a href="#">&laquo;</a></li>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">&raquo;</a></li>
						</ul>
					</div>

				</div>
				<div class="box-tools"
					style="float: left; margin-bottom: 20px; margin-left: 5px">
					<img src="../images/add_icon.png" width="22" height="22"
						data-toggle="modal" data-target="#myModal" />
				</div>
				<!-- /.box-header -->
				<div class="box-body no-padding">
					<table class="table">
						<tr>
							<th style="width: 10px">#</th>
							<th>Mã dịch vụ</th>
							<th>Tên dịch vụ</th>
							<th>Thao tác</th>
						</tr>
						<tr>
							<td>1.</td>
							<td>Charging Telco</td>
							<td>Nạp tiền bằng thẻ điện thoại</td>
							<td><a href="#" style="margin-right: 10px">Xóa</a><a
								href="#" style="margin-right: 10px">Sửa</a><a href="#"
								style="margin-right: 10px">Khóa</a></td>
						</tr>
						<tr>
							<td>2.</td>
							<td>ChargingGameco</td>
							<td>Nạp tiền bằng thẻ game</td>
							<td><a href="#" style="margin-right: 10px">Xóa</a><a
								href="#" style="margin-right: 10px">Sửa</a><a href="#"
								style="margin-right: 10px">Khóa</a></td>
						</tr>
					</table>
				</div>
				<!-- /.box-body -->
			</div>
		</div>
	</div>
</div>
