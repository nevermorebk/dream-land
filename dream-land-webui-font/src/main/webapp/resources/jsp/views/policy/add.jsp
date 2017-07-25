<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="content-wrapper">
	<div class="box box-primary">
		<div class="box-header with-border">
			<h3 class="box-title" style="font-size: 200%">Danh sách chính
				sách</h3>
		</div>
		<!-- /.box-header -->
		<!-- form start -->
		<div class="box-body">
			<div class="form-group" style="margin-left: 15px">
				<label>Tên chính sách</label> <input type="text"
					class="form-control" id="name" placeholder="Tên chính sách">
			</div>
			<div class="form-group">
				<div class="col-md-4">
					<label>Từ ngày:</label>
					<div class="input-group date">
						<div class="input-group-addon">
							<i class="fa fa-calendar"></i>
						</div>
						<input type="text" class="form-control pull-right" id="fromDate">
					</div>
				</div>
				<div class="col-md-2"></div>
				<div class="col-md-4">
					<label>Đến ngày:</label>
					<div class="input-group date">
						<div class="input-group-addon">
							<i class="fa fa-calendar"></i>
						</div>
						<input type="text" class="form-control pull-right" id="toDate">
					</div>
				</div>
			</div>

			<div class="form-group">
				<div class="col-md-4">
					<label style="float: left;">Dịch vụ</label> <select
						class="form-control">
						<option>ChargingTelco</option>
						<option>ChargingGameco</option>
						<option>BuyCardTelco</option>
					</select>
				</div>
				<div class="col-md-2"></div>
				<div class="col-md-4">
					<label style="float: left;">Trạng thái</label> <select
						class="form-control">
						<option>Khóa</option>
						<option>Mở</option>
						<option>Đang áp dụng</option>
					</select>
				</div>
				<div class="col-md-2"></div>
			</div>


			<!-- /.box-body -->

			<div class="col-md-12" style="margin-top: 30px">
				<button type="submit" onclick="search()" class="btn btn-primary"
					style="float: right; width: 100px; margin-left: 30px">Tìm
					kiếm</button>
				<button type="submit" onclick="cancel()" class="btn btn-primary"
					style="float: right; width: 100px;">Hủy</button>
			</div>
			<div class="col-md-12">
				<div class="box-header">
					<div class="box-tools">
						<ul class="pagination pagination-sm no-margin pull-right">
							<li><a href="#">&laquo;</a></li>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">&raquo;</a></li>
						</ul>
					</div>

				</div>
				<div class="box-tools" style="float: left; margin-bottom: 20px">
		<!-- 			<button type="submit" onclick="" class="btn btn-primary"
						style="float: right; width: 80px;" ></button> -->
					<button type="submit" style="border: 0; background: transparent" data-toggle="modal"
						data-target="#myModal">
						<img src="../images/add_icon.png" width="25" height="25" alt="submit" />
					</button>
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