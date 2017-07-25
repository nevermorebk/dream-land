<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="sec"
           uri="http://www.springframework.org/security/tags" %>

<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="dist/img/user2-160x160.jpg" class="img-circle"
                     alt="User Image">
            </div>
            <div class="pull-left info">
                <p>${pageContext.request.userPrincipal.name}</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <!-- search form -->
        <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <!-- <input type="text" name="q" class="form-control"
                    placeholder="Tìm kiếm..."> <span class="input-group-btn">
                    <button type="submit" name="search" id="search-btn"
                        class="btn btn-flat">
                        <i class="fa fa-search"></i>
                    </button>
                </span> -->
            </div>
        </form>
        <!-- /.search form -->

        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <!-- <li class="header">DANH SÁCH MENU CHÍNH</li> -->

            <!-- li class="treeview"><a href="#"> <i
                    class="fa fa-hourglass-half"></i> <span>Vận hành</span> <span
                    class="pull-right-container"> <i
                        class="fa fa-angle-left pull-right"></i>
                </span>
            </a>
                <ul class="treeview-menu">
                    <li id=""><a href="#"> <i class="fa fa-search"></i> Tra
                            cứu
                    </a></li>
                </ul></li-->

            <%--<li><a href="#"> <i class="fa fa-history"></i>Lịch sử giao--%>
            <%--dịch <span class="pull-right-container"> <i--%>
            <%--class="fa fa-angle-left pull-right"></i>--%>
            <%--</span>--%>
            <%--</a>--%>
            <%--<ul class="treeview-menu">--%>
            <li id="user-menu"><a
                    href="${pageContext.request.contextPath}/user/view?phone="> <i
                    class="fa fa-users"></i> Khách hàng
            </a></li>

            <li id="account-menu"><a
                    href="${pageContext.request.contextPath}/account/list"> <i
                    class="fa fa-money"></i> Tài khoản
            </a></li>

            <li id="topupaccount-menu"><a
                    href="${pageContext.request.contextPath}/transaction/topup-account">
                <i class="fa fa-circle-o"></i> Nộp tiền mặt
            </a></li>

            <li id="deposit-menu"><a
                    href="${pageContext.request.contextPath}/transaction/deposit">
                <i class="fa fa-circle-o"></i> Nạp tiền ngân hàng
            </a></li>

            <li id="charging-menu"><a
                    href="${pageContext.request.contextPath}/transaction/charging">
                <i class="fa fa-circle-o"></i> Đổi thẻ cào
            </a></li>

            <li id="transfer-menu"><a
                    href="${pageContext.request.contextPath}/transaction/transfer">
                <i class="fa fa-circle-o"></i> Chuyển tiền
            </a></li>

            <li id="buycardtelco-menu"><a
                    href="${pageContext.request.contextPath}/transaction/buy-card-telco">
                <i class="fa fa-circle-o"></i> Pin Code
            </a></li>

            <li id="topuptelco-menu"><a
                    href="${pageContext.request.contextPath}/transaction/topup-telco">
                <i class="fa fa-circle-o"></i> Topup
            </a></li>

            <li id="offset-menu"><a
                    href="${pageContext.request.contextPath}/transaction/offset"> <i
                    class="fa fa-circle-o"></i> Bù trừ GQKN
            </a></li>

            <li id="withdraw-menu"><a
                    href="${pageContext.request.contextPath}/transaction/withdraw"> <i
                    class="fa fa-circle-o"></i> Rút tiền qua Đại Lý
            </a></li>

            <li id="cheque-menu"><a
                    href="${pageContext.request.contextPath}/transaction/cheque?accountNo=">
                <i class="fa fa-circle-o"></i> Sao kê
            </a></li>

            <li id="balance-menu"><a
                    href="${pageContext.request.contextPath}/account/balance"> <i
                    class="fa fa-circle-o"></i> Số dư tài khoản
            </a></li>


            <%--</ul></li>--%>

            <%--<li class="treeview"><a href="#"> <i class="fa fa-cogs"></i>--%>
            <%--<span>Cấu hình</span> <span class="pull-right-container"> <i--%>
            <%--class="fa fa-angle-left pull-right"></i>--%>
            <%--</span>--%>
            <%--</a>--%>
            <%--<ul class="treeview-menu">--%>
            

            <sec:authorize access="hasAnyRole('ACCOUNTANT')">
            <li id="clearing-menu"><a
                    href="${pageContext.request.contextPath}/statement/add-cash">
                <i class="fa fa-circle-o"></i> Nghiệp vụ Nộp tiền mặt
            </a></li>
            </sec:authorize>
            <li id="otp-menu"><a
                    href="${pageContext.request.contextPath}/otp/search"> <i
                    class="fa fa-qrcode"></i> SMS OTP
            </a></li>
            <li id="export-menu"><a
                    href="${pageContext.request.contextPath}/export/view"> <i
                    class="fa fa-qrcode"></i> File đã xuất
            </a></li>

            <%--</ul></li>--%>

            <%--<li><a href="#"> <i class="fa fa-balance-scale"></i> Nghiệp--%>
            <%--vụ <span class="pull-right-container"> <i--%>
            <%--class="fa fa-angle-left pull-right"></i>--%>
            <%--</span>--%>
            <%--</a>--%>
            <%--<ul class="treeview-menu">--%>

            <%--</ul></li>--%>
            <%--</ul>--%>

    </section>
    <!-- /.sidebar -->
</aside>