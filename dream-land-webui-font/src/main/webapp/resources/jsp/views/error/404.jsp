<%@ page contentType="text/html; charset=UTF-8"%>
<section class="content-header">
	<ol class="breadcrumb">
		<li><a href="${pageContext.request.contextPath}/home"><i
				class="fa fa-dashboard"></i> Home</a></li>
		<li class="active">404 error</li>
	</ol>
</section>
<section class="content">
	<div class="error-page">
		<h2 class="headline text-red">403</h2>
		<div class="error-content">
			<h3>
				<i class="fa fa-warning text-red"></i> Oops! Không tìm thấy trang.
			</h3>
			<p>
				Trang không tồn tại! <a
					href="${pageContext.request.contextPath}/home">quay lại
					dashboard</a>.
			</p>
			<form class="search-form">
				<div class="input-group">
					<input type="text" name="search" class="form-control"
						placeholder="Search">
					<div class="input-group-btn">
						<button type="submit" name="submit"
							class="btn btn-blue btn-flat">
							<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>
