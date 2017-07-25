<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page language="java" pageEncoding="UTF-8"%><%@ page
        contentType="text/html;charset=UTF-8"%><%@ taglib
        uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

<section class="content-header">
    <h1>
        Số dư tài khoản

    </h1>
    <ol class="breadcrumb">
        <li>
            <a href="${pageContext.request.contextPath}/"><i class="fa fa-dashboard"></i> Trang chủ</a>
        </li>
        <%--<li>
            <a href="#">Giao dịch</a>
        </li>--%>
        <li class="active">
            <a href="${pageContext.request.contextPath}/transaction/balance">Số dư tài khoản </a>
        </li>

    </ol>
</section>
<section class="content">

    <div class="row">
        <!-- Date -->
        <div class="col-xs-6 col-md-3">
            <div class="form-group">
                <div class="input-group date">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                    <input placeholder="Từ ngày" type="text"
                           class="form-control pull-right" id="fromDate" name="fromDate" value="${fromDate }">
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-md-3">
            <div class="form-group">
                <div class="input-group date">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                    <input placeholder="Đến ngày" type="text"
                           class="form-control pull-right" id="toDate" name="toDate"  value="${toDate }">
                </div>
            </div>
        </div>

        <!-- PARTNER NAME -->
        <div class="col-xs-6 col-md-3">
            <div class="form-group">
                <select class="form-control" id="partner" name="partner">
                    <option value="">Loại ví</option>
                    <!-- Get Data via AJAX -->
                </select>
            </div>
        </div>

        <!-- KEY WORD -->
        <div class="col-xs-6 col-md-3">
            <div class="form-group">
                <input placeholder="Tìm kiếm theo : Tên chủ ví/Số điện thoại/Số tài khoản"
                       type="text" class="form-control" id="keyword" name="keyword" autocomplete="on">
            </div>
        </div>
        <div class="col-xs-12 text-center">
            <div class="form-group">
                <button type="button" class="btn btn-blue btn-flat" id="view-balance" name="view-balance">
                    <i class="fa fa-search"></i>&nbsp;&nbsp;Tìm kiếm
                </button>
                <button type="button" class="btn btn-blue btn-flat" id="export-balance" name="export-balance">
                    <i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Xuất báo cáo
                </button>
                <button type="button" class="btn btn-blue btn-flat" id="reset-balance">
                    <i class="fa fa-refresh"></i>&nbsp;&nbsp;Đặt lại
                </button>
            </div>
        </div>


    </div>

    <!-- Bind via Ajax -->
    <%--<div class="row" id="chequeData">--%>
    <%--</div>--%>
    <div class="row">
        <c:if test="${message != null }">
            <div class="row" id="alert">
                <div class="col-md-12">
                    <div class="alert alert-danger alert-dismissible">
                        <h4>${message }</h4>
                    </div>
                </div>
            </div>
        </c:if>
  

    <div class="col-md-12" id="balance-table">
        <div class="box" style="margin: 0px 0px 0px 0px">
            <div class="box-body" >
                <div class="box-footer clearfix" >
                    <ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
                        <!-- Bind via AJAX -->
                    </ul>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered table-hover table-striped">
                        <thead>
                        <tr>
                            <td  style="text-align: center"><b>Tổng</b></td>
                            <td style="text-align: left" ><a id="totalAccount"></a></td>
                            <td></td>
                            <td style="text-align: right"><a id="sumOpen"></a></td>
                            <td style="text-align: right"><a id="increase"></a></td>
                            <td style="text-align: right"><a id="decrease"></a></td>
                            <td style="text-align: right"><a id="sumClose"></a></td>
                        </tr>
                        <tr>
                            <%--<th class='text-nowrap col-md-1'>#</th>--%>
                            <th class='text-nowrap col-md-2'>Tài khoản</th>
                            <th class='text-nowrap col-md-2'>Khách hàng</th>
                            <th class='text-nowrap col-md-2'>Điện thoại</th>
                            <th class='text-nowrap col-md-2' style="text-align: right;">Số dư đầu kì</th>
                            <th class='text-nowrap col-md-2' style="text-align: right;">Tăng</th>
                            <th class='text-nowrap col-md-2' style="text-align: right;">Giảm</th>
                            <th class='text-nowrap col-md-2' style="text-align: right;">Số dư cuối kì</th>
                        </tr>
                        </thead>
                        <tbody id="accountTableBody">
                        <!-- Bind via AJAX -->
                        </tbody>
                    </table>
                </div>

                <!-- page navigation -->
                <div class="box-footer clearfix" >
                    <ul class="pagination pagination-sm no-margin pull-right" id="pagination-blue">
                        <!-- Bind via AJAX -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
      </div>
</section>
