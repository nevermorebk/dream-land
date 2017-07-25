<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<section class="content-header">
    <h1>
        Nghiệp vụ Cập nhật Giao dịch Topup<%--<small>Bù trừ tiền</small>--%>
    </h1>
    <ol class="breadcrumb">
        <li><a href="${pageContext.request.contextPath }/home"><i
                class="fa fa-dashboard"></i> Trang chủ</a></li>
        <%--<li><a href="#">Nghiệp vu</a></li>--%>
        <li class="active"><a
                href="${pageContext.request.contextPath}/statement/add-cash">Nghiệp vụ Cập nhật Giao dịch Topup
            mặt</a></li>
    </ol>
</section>

<section class="content cotainer" style="width: 60%; padding:25px;margin-left: -0.7%;">
    <div class="row pay-row">
        <div class="col-xs-12  col-md-6">
            <form class="form-horizontal" >	
                <div class="form-group">
                    <label class=" col-md-5" for="transactionId">Mã GD:</label>
                    <div class=" col-md-7" >
                        <span id="transactionId">${transactionId}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="partner">Loại ví:</label>
                    <div class=" col-md-7" >
                        <span id="partner">${partner}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="fullName">Tên khách hàng:</label>
                    <div class=" col-md-7" >
                        <span id="fullName">${fullName}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="phone">Số điện
                        thoại:</label>
                    <div class=" col-md-7" >
                        <span id="phone">${phone}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="accountNo">Số tài khoản:</label>
                    <div class=" col-md-7" >
                        <span id="accountNo">${accountNo}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="issuer">Sản phẩm:</label>
                    <div class=" col-md-7" >
                        <span id="issuer">${issuer}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="denomination">Mệnh giá:</label>
                    <div class=" col-md-7" >
                        <span id="denomination"></span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="rate">Chiết khấu:</label>
                    <div class=" col-md-7" >
                        <span id="rate">${rate}</span>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-xs-12 col-md-6">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class=" col-md-5" for="amount">Số tiền GD thực tế:</label>
                    <div class=" col-md-7" >
                        <span id="amount"></span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="targetPhone">SĐT nhận:</label>
                    <div class=" col-md-7" >
                        <span id="targetPhone">${targetPhone}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="requestTime">Thời gian gửi:</label>
                    <div class=" col-md-7" >
                        <span id="requestTime">${requestTime}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5" for="completeTime">Thời gian trả lời:</label>
                    <div class=" col-md-7" >
                        <span id="completeTime">${completeTime}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class=" col-md-5">Mã lỗi:</label>
                    <div class=" col-md-7" >
                        <span id="fromProvider" >From Provider: ${fromProvider}</span><br/>
                    </div>
                    <label class="col-md-5"></label>
                    <div class=" col-md-7	">
                        <span id="toPartner" >From Partner: ${fromPartner}</span>
                    </div>
                </div>
                <div class="form-group" style="    padding-top: 7.5%;" >
                    <label class=" col-md-5" for="status">Trạng thái:</label>
                    <div class="col-md-7">
                    <select class="form-control" id="status" name="status" style="width: 100%;    margin-top: -4%;">
                        <!-- Get Data via AJAX -->
                    </select>
                    </div>
                </div>
            </form>

        </div>
    </div>

    <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12 text-center">
            <button type="button" class="btn btn-blue btn-flat" id="cancel"
                    name="cancel">
                <i class="fa fa-refresh"></i>&nbsp;&nbsp;Hủy
            </button>
            <button type="button" class="btn btn-blue btn-flat" id="update"
                    name="update">
                <i class="fa fa-search"></i>&nbsp;&nbsp;Cập nhật
            </button>

        </div>
    </div>
</section>
