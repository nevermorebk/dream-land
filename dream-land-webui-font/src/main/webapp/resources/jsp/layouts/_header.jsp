<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<header class="main-header">
	<!-- Logo -->
	<a href="${pageContext.request.contextPath }/home" class="logo"> <!-- mini logo for sidebar mini 50x50 pixels -->
		<span class="logo-mini"><b>P</b>AYD</span> <!-- logo for regular state and mobile devices -->
		<span class="logo-lg"><b>Pay</b>Dee</span>
	</a>
	<!-- Header Navbar: style can be found in header.less -->
	<nav class="navbar navbar-static-top">
		<!-- Sidebar toggle button-->
		<a href="#" class="sidebar-toggle" data-toggle="offcanvas"
			role="button"> <span class="sr-only">Toggle navigation</span>
		</a>

		<div class="navbar-custom-menu">
			<ul class="nav navbar-nav">
				<!-- User Account: style can be found in dropdown.less -->
				<li class="dropdown user user-menu">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
						<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image"> 
						<span class="hidden-xs">${pageContext.request.userPrincipal.name}</span>
					</a>
					<ul class="dropdown-menu">
						<!-- User image -->
						<li class="user-header">
							<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
							<p>
								Admin PayDee <small>Đăng ký: 03/04/2017</small>
							</p>
						</li>
						<!-- Menu Body -->
						<li class="user-body">
							<div class="row">
								<div class="col-xs-4 text-center">
									<a href="#">Followers</a>
								</div>
								<div class="col-xs-4 text-center">
									<a href="#">Sales</a>
								</div>
								<div class="col-xs-4 text-center">
									<a href="#">Friends</a>
								</div>
							</div>
						</li>
						<!-- Menu Footer-->
						<li class="user-footer">
							<div class="pull-left">
								<a href="#" class="btn btn-default btn-flat">Tài khoản</a>
							</div>
							<div class="pull-right">
								<form action="${pageContext.request.contextPath}/logout" method="post" id="logoutForm">
									<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
								</form>
								<script>
									function formSubmit() {
										document.getElementById("logoutForm").submit();
									}
								</script>
								<c:if test="${pageContext.request.userPrincipal.name != null}">
									<a href="javascript:formSubmit()" class="btn btn-default btn-flat"> Thoát</a>
								</c:if>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</nav>
</header>