<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles-extras" prefix="tilesx"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><tiles:insertAttribute name="title" /></title>
	<link href="${pageContext.request.contextPath }/images/logo_paydee.png" rel="shortcut icon" />
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

	<tilesx:useAttribute id="listCss" name="stylesheets" classname="java.util.List" />
	<c:forEach var="item" items="${listCss}">
		<link rel="stylesheet" href="${pageContext.request.contextPath}${item}" />
	</c:forEach>
	
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body class="hold-transition login-page">
	<div class="login-box">
		<div class="login-logo">
			<a href="#"><b>Pay</b>Dee</a>
		</div>
		<div class="login-box-body">
			<p class="login-box-msg">Đăng nhập để bắt đầu phiên làm việc</p>
			<font color="red">${error}</font> <font color="green">${msg}</font>
			<form action="${pageContext.request.contextPath}/login" method="post">
				<div class="form-group has-feedback">
					<input type="text" class="form-control" name="username" placeholder="Tên đăng nhập"> 
					<span class="glyphicon glyphicon-user form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" class="form-control" name="password" placeholder="Mật khẩu"> 
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div class="row">
					<div class="col-xs-7 col-md-8">
						<div class="checkbox icheck">
							<label> 
								<input type="checkbox" name="remember-me-param">&nbsp;&nbsp;Ghi nhớ đăng nhập
							</label>
						</div>
					</div>
					<div class="col-xs-5 col-md-4">
						<button type="submit" class="btn btn-blue btn-flat">Đăng nhập</button>
					</div>
				</div>
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			</form>
		</div>
	</div>

	<tilesx:useAttribute id="listJs" name="scripts" classname="java.util.List" />
	<c:forEach var="item" items="${listJs}">
		<script src="${pageContext.request.contextPath }${item}"></script>
	</c:forEach>
	<script>
		$(function() {
			$('input').iCheck({
				checkboxClass : 'icheckbox_square-blue',
				radioClass : 'iradio_square-blue',
				increaseArea : '20%' // optional
			});
		});
	</script>
</body>
</html>
