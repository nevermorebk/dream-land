<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<section class="content-header">
	<h1>
		Nghiệp vụ Nộp tiền mặt<%--<small>Bù trừ tiền</small>--%>
	</h1>
	<ol class="breadcrumb">
		<li><a href="${pageContext.request.contextPath }/home"><i
				class="fa fa-dashboard"></i> Trang chủ</a></li>
		<%--<li><a href="#">Nghiệp vu</a></li>--%>
		<li class="active"><a
			href="${pageContext.request.contextPath}/statement/add-cash">Nghiệp vụ Nộp tiền mặt</a></li>
	</ol>
</section>

<section class="content" style="padding:25px;margin-left:-0.7%">
	<div class="row">
		<div class="col-md-6 col-sm-12">
			<form class="form-horizontal" id="form-clearing">
				<div class="form-group">
					<label class=" col-sm-3" for="accountNo">Số
						tài khoản:</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" name="accountNo"
							id="accountNo" placeholder="Số tài khoản:">
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="fullName">Tên
						chủ tài khoản:</label>
					<div class="col-sm-9">
						<span id="fullName"></span>
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="phone">Số điện
						thoại:</label>
					<div class="col-sm-9">
						<span id="phone"></span>
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="accountType">Loại
						tài khoản:</label>
					<div class="col-sm-9">
						<span id="accountType"></span>
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="accountStatus">Trạng
						thái:</label>
					<div class="col-sm-9">
						<span id="accountStatus"></span>
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="partner">Tên ví:</label>
					<div class="col-sm-9">
						<span id="partner"></span>
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="amount">Loại bù
						trừ</label>
					<div class="col-sm-9">
						<label class="radio-inline"><input type="radio"
							name="typeCash" value="DEPOSIT">Cộng</label> <label
							class="radio-inline"><input type="radio" name="typeCash"
							value="WITHDRAW">Trừ</label>
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="amount">Số tiền:</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="amount" name="amount"
							placeholder="Số tiền" value="1">
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="textMoney">Bằng
						chữ:</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="textMoney"
							name="textMoney">
					</div>
				</div>
				<div class="form-group">
					<label class=" col-sm-3" for="description">Diễn giải:</label>
					<div class="col-sm-9">
						<textarea class="form-control" id="description" name="description"></textarea>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-4 col-sm-9">
						<a href="${referer}" class="btn btn-blue btn-flat">Quay lại</a>
						<button type="button" class="btn btn-blue btn-flat" id="confirm"
							name="confirm">Xác nhận</button>
						<a id="reset" class="btn btn-flat btn-blue"> <i class="fa"></i>&nbsp;&nbsp;Đặt lại</a>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>
