var _menu = BackendAdminPayDee._menu;
var _datepicker = BackendAdminPayDee._datepicker;
var _currency = BackendAdminPayDee._currency;
var _partner = BackendAdminPayDee._partner;
var _notifyForUser = BackendAdminPayDee._notifyForUser;
var pagination = new Pagination();
_menu.activeMenu('transfer-menu');
_datepicker.init('fromDate');
_datepicker.init('toDate');
_partner.init();

function toExcel() {
	var fDate = $('#fromDate').val();
	var tDate = $('#toDate').val();
	$("table").tableExport(
			{
				bootstrap : true,
				headings : true,
				footers : true,
				formats : [ "xlsx", "csv" ],
				fileName : "LICH_SU_CHUYEN_TIEN_" + "TU_NGAY_" + fDate + "_"+ "DEN_NGAY_" + tDate,
				position : "top",
				ignoreRows : null,
				ignoreCols : null
			},  true);
}

function search(pageNumber) {
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var transactionId = $('#transactionId').val();
	var partnerName = _partner.current < 0 ? null : _partner.current;
	var sourceAccountNo = $('#sourceAccountNo').val();
	var targetAccountNo = $('#targetAccountNo').val();
	var pageIndex = pageNumber == undefined ? 1 : pageNumber;

	if (fromDate != null && fromDate.trim().length > 0 && toDate != null && toDate.trim().length > 0) {
		if (Date.parse(ISOformat(fromDate)) > Date.parse(ISOformat(toDate))) {
			alert('Bạn cần phải nhập ngày bắt đầu nhỏ hơn hoặc bằng ngày kết thúc');
			return;
		}
		if(Date.parse(ISOformat(fromDate)) > new Date().getTime()){
			alert('Bạn cần phải nhập ngày bắt đầu nhỏ hơn hoặc bằng ngày hiện tại.');
			return;
		}
	}

	// Call service
	var request = {
		fromDate : fromDate,
		toDate : toDate,
		transactionId : transactionId,
		partnerName : partnerName,
		sourceAccountNo : sourceAccountNo,
		targetAccountNo : targetAccountNo,
		pageNumber : pageIndex
	};
	var url = BASE_URL + "/transaction/transfer";
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : JSON.stringify(request),
	}).done(function(data) {
				console.log(JSON.stringify(data));
				if(data.pageItems.length == 0){
					_notifyForUser.error("Không có dữ liệu!");
					_notifyForUser.show();
					return;
				}
				if(typeof data === 'string'){
					_notifyForUser.error(data);
					_notifyForUser.show();
					return;
				}
				showTable(data);
				pagination.setData(data);
				pagination.show();
//				showPagination(data);
	}).fail(function(data){
		console.log("Error: " + JSON.stringify(data));
		if(data.status == 500 || data.status == 404){
			_notifyForUser.error("Kết nối server thất bại! Xin thử lại.");
			_notifyForUser.show();
			return;
		}
		_notifyForUser.error(data.responseText);
		_notifyForUser.show();
	});
}

function showTable(data) {
	$('caption').empty();
	$('#transferTableBody').empty();
	$.each(data.pageItems, function(idx, obj) {
		idx = idx + 1 + data.pageNumber * 10;
		amount = (obj.amount + "").replace("-", "");
		$("#transferTable").find('tbody').append(
				$("<tr>").append($("<td>").text(idx)).append(
						$("<td>").text(obj.id)).append(
						$("<td>").text(obj.partnerName)).append(
						$("<td align='right'>").text(_currency.formatCurrency(amount))).append(
						$("<td>").text(obj.completeTime)).append(
						$("<td>").html(obj.sourceAccNo + '<br>' + '<b>'+obj.sourceFullName+'</b>' + '<br>' + obj.sourcePhone)).append(
						$("<td>").html(obj.targetAccNo + '<br>' + '<b>'+obj.targetFullName+'</b>'  + '<br>' + obj.targetPhone)));
	});
}

function ISOformat(dateStr) {
	var arrayDate = dateStr.split("/");
	return arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
}
