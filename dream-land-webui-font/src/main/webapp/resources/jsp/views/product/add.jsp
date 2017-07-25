<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<div class="box box-primary">
		<div class="box-header with-border">
			<div class="modal fade" id="issuerModal" role="dialog"
				style="margin-top: 30px !important;">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
							<h4 class="modal-title" style="float: left;">Thêm mới nhà
								phát hành</h4>
							<label id="accountNo" style="margin: 5px 0 0 5px;"></label>
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

							<button type="submit" onclick="cancel()" class="btn btn-blue"
								style="float: right; width: 130px; margin-right: 20px"
								data-dismiss="modal">Hủy</button>
						</div>
					</div>

				</div>
			</div>

			<div class="modal fade" id="productModal" role="dialog"
				style="margin-top: 30px !important;">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
							<h4 class="modal-title" style="float: left;">Thêm mới sản
								phẩm</h4>
							<label id="accountNo" style="margin: 5px 0 0 5px;"></label>
						</div>
						<div class="modal-body">
							<div class="form-group">

								<label style="float: left;">Nhà phát hành</label> <select
									class="form-control">
									<option>Viettel</option>
									<option>Vinaphone</option>
									<option>Mobiphone</option>
								</select>
							</div>

							<div class="form-group">
								<label>Mã sản phẩm</label> <input type="text"
									class="form-control" id="name" placeholder="Mã sản phẩm">
							</div>

							<div class="form-group">
								<label>Mệnh giá</label> <input type="text" class="form-control"
									id="name" placeholder="Mệnh giá">
							</div>
						</div>

						<div class="box-footer">
							<button type="submit" onclick="add()" class="btn btn-blue"
								style="float: right; width: 130px;" data-dismiss="modal">Thêm</button>

							<button type="submit" onclick="submitAndContinue()"
								class="btn btn-primary"
								style="float: right; width: 130px; margin-right: 20px"
								data-dismiss="modal">Thêm và tiếp tục</button>

							<button type="submit" onclick="cancel()" class="btn btn-blue"
								style="float: right; width: 130px; margin-right: 20px"
								data-dismiss="modal">Hủy</button>
						</div>
					</div>

				</div>
			</div>
			<div class="box-header with-border">
				<h3 class="box-title" style="font-size: 150%">Quản lý sản phẩm</h3>
			</div>
			<!-- /.box-header -->
			<!-- form start -->
			<div class="box-body">
				<div class="col-md-6">
					<div class="box" style="float: left;">
						<div class="box-header">
							<h3 class="box-title">Danh sách nhà phát hành</h3>
						</div>
						<div class="box-tools" style="float: left; margin-bottom: 20px; margin-left: 5px">
							<img src="../images/add_icon.png" width="22" height="22"
								data-toggle="modal" data-target="#issuerModal" />
						</div>

						<!-- /.box-header -->
						<div class="box-body no-padding">
							<table class="table">
								<tr>
									<th style="width: 10px">#</th>
									<th>Mã nhà phát hành</th>
									<th>Tên nhà phát hành</th>
									<th>Thao tác</th>
								</tr>
								<tr>
									<td><input type="radio" name="optradio"></td>
									<td>VTT</td>
									<td>Viettel</td>
									<td><a href="#" style="margin-right: 10px">Xóa</a><a
										href="#" style="margin-right: 10px">Sửa</a><a href="#"
										style="margin-right: 10px">Khóa</a></td>
								</tr>
								<tr>
									<td><input type="radio" name="optradio"></td>
									<td>VNP</td>
									<td>Vinaphone</td>
									<td><a href="#" style="margin-right: 10px">Xóa</a><a
										href="#" style="margin-right: 10px">Sửa</a><a href="#"
										style="margin-right: 10px">Khóa</a></td>
								</tr>
								<tr>
									<td><input type="radio" name="optradio"></td>
									<td>VMS</td>
									<td>Mobiphone</td>
									<td><a href="#" style="margin-right: 10px">Xóa</a><a
										href="#" style="margin-right: 10px">Sửa</a><a href="#"
										style="margin-right: 10px">Khóa</a></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="col-md-4" style="float: right;">
					<div class="box" style="float: left;">
						<div class="box-header">
							<h3 class="box-title">Danh sách sản phẩm</h3>
						</div>
						<div class="box-tools" style="float: left; margin-bottom: 20px; margin-left: 5px">
							<img src="../images/add_icon.png" width="22" height="22"
								data-toggle="modal" data-target="#productModal" />
						</div>
						<!-- /.box-header -->
						<div class="box-body no-padding">
							<table class="table">
								<tr>
									<th>Mã sản phẩm</th>
									<th>Mệnh giá</th>
									<th>Thao tác</th>
								</tr>
								<tr>
									<td>VTT10</td>
									<td>10.000</td>
									<td><a href="#" style="margin-right: 10px">Xóa</a><a
										href="#" style="margin-right: 10px">Sửa</a><a href="#"
										style="margin-right: 10px">Khóa</a></td>
								</tr>
								<tr>
									<td>VTT20</td>
									<td>20.000</td>
									<td><a href="#" style="margin-right: 10px">Xóa</a><a
										href="#" style="margin-right: 10px">Sửa</a><a href="#"
										style="margin-right: 10px">Khóa</a></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- /.content-wrapper -->
