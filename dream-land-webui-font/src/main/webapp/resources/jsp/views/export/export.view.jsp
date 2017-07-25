<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@	taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<section class="content-header">
	<h1>
		File đã xuất<%--<small>file đã xuất</small>--%>
	</h1>
	<ol class="breadcrumb">
		<li><a href="${pageContext.request.contextPath}/"><i
				class="fa fa-dashboard"></i> Trang chủ</a></li>
		<%--<li><a href="#">Quản lý</a></li>--%>
		<li class="active"><a
			href="${pageContext.request.contextPath}/export">File đã xuất</a></li>
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
	<!-- DATA TABLE -->
	<div class="row" id="exported-file-table">
		<div class="col-xs-12 col-md-12">
			<div class="box">
				<div class="box-header"></div>
				<div class="box-body table-responsive">
					<table class="table table-hover">
						<thead>
							<tr>
								<th class='text-nowrap col-md-1'>#</th>
								<th class='text-nowrap col-md-1'>Tên</th>
								<th class='text-nowrap col-md-1'>Độ lớn</th>
								<th class='text-nowrap col-md-1'>Ngày tạo</th>
								<th class='text-nowrap col-md-1'>#</th>
							</tr>
						<thead>
						<tbody>
							<!-- Bind data via Ajax -->
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


