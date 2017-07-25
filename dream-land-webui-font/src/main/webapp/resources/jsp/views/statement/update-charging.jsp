<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<section class="content-header">
    <h1>
        Cập nhật GD Đổi thẻ cào<%--<small>Bù trừ tiền</small>--%>
    </h1>
    <ol class="breadcrumb">
        <li><a href="${pageContext.request.contextPath }/home"><i
                class="fa fa-dashboard"></i> Trang chủ</a></li>
        <%--<li><a href="#">Nghiệp vu</a></li>--%>
        <li class="active"><a
                href="${pageContext.request.contextPath}/transaction/update-charging?id=${id}&issuer=${issuer}&status=${status}&rate=${rate}&denomination=${denomination}">Cập nhật GD Đổi thẻ cào</a></li>
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
                    <label class=" col-md-5" for="cardSerial">Serial:</label>
                    <div class=" col-md-7" >
                        <span id="cardSerial">${cardSerial}</span>
                    </div>
                </div>
                    <div class="form-group" >
                    <label class=" col-md-5" for="cardCode">Mã thẻ:</label>
                    <div class=" col-md-7" >
                        <span id="cardCode">${cardCode}</span>
                    </div>
                </div>
                	  </form>
        </div>
                <div class="col-xs-12 col-md-6">
                            <form class="form-horizontal">
                
         		  <div class="form-group" >
                    <label class=" col-md-5" for="product">Mệnh giá:</label>
                    <div class="col-md-7" style="margin-top:-3%">
                    <select class="form-control" id="product" name="product" style="width: 150%">
                    	<option value="-1">Mệnh giá</option>
                        <option value="0">0</option>
                        <!-- Get Data via AJAX -->
                    </select>
                    </div>
                </div>
         			<div class="form-group">
                    <label class=" col-md-5" for="rate">Phí đổi thẻ:</label>
                    <div class=" col-md-7" >
                        <span id="rate">${rate}</span>
                    </div>
                </div>
                  <div class="form-group" >
                    <label class=" col-md-5" for="amount">Số tiền nạp thực tế:</label>
                    <div class=" col-md-7" >
                        <span id="amount">${amount}</span>
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
                  <div class="form-group" >
                    <label class=" col-md-5" for="status">Trạng thái:</label>
                    <div class="col-md-7">
                    	 <span id="status" >${status}</span>
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
