<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="tilesx" uri="http://tiles.apache.org/tags-tiles-extras"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="_csrf" content="${_csrf.token}" />
	<meta name="_csrf_header" content="${_csrf.headerName}" />
	<title><tiles:insertAttribute name="title" /></title>
	<link href="${pageContext.request.contextPath }/images/logo_paydee.png" rel="shortcut icon" />
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

	<%-- <tilesx:useAttribute id="listCss" name="stylesheets" classname="java.util.List" />
	<c:forEach var="item" items="${listCss}">
		<link rel="stylesheet" href='<tiles:insertAttribute value="${item}" flush="true" />' type="text/css">
	</c:forEach> --%>
	
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

	<script type="text/javascript">
  		var BASE_URL = "${pageContext.request.contextPath}";
		console.log(BASE_URL);
  	</script>
</head>
<body class="hold-transition skin-blue sidebar-mini">

	<div class="wrapper">

		<tiles:insertAttribute name="header" />

		<tiles:insertAttribute name="sidebar" />

		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">

			<div class="row">
				<div class="col-md-12 notify-for-user" style="display: none;"></div>
			</div>

			<tiles:insertAttribute name="body" />

		</div>

		<tiles:insertAttribute name="footer" />

	</div>

	<%-- <tilesx:useAttribute id="listJs" name="scripts" classname="java.util.List" />
	<c:forEach var="item" items="${listJs}">
		<script type="text/javascript" src='<tiles:insertAttribute value="${item}" flush="true" />'></script>
	</c:forEach> --%>
	
	<tilesx:useAttribute id="listJs" name="scripts" classname="java.util.List" />
	<c:forEach var="item" items="${listJs}">
		<script src="${pageContext.request.contextPath }${item}"></script>
	</c:forEach>
</body>
</html>