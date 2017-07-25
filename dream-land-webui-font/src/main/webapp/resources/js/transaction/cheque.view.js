(function (){

	var ChequeView, _query, _page, _table;

    var _menu = BackendAdminPayDee._menu;
	var _datepicker = BackendAdminPayDee._datepicker;
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _currency = BackendAdminPayDee._currency;
	var _pageCommon = BackendAdminPayDee._page;
	var _transactionType = TransactionCommon._type;

    _menu.activeMenu('cheque-menu');
	_datepicker.init('fromDate');
	_datepicker.init('toDate');

	ChequeView = window.ChequeView = {};

	ChequeView.Query = (function() {
		function Query() {
			this.fromDate = $('input[name="fromDate"]');
			this.toDate = $('input[name="toDate"]');
			this.keyword = $('input[name="keyword"]');

			this.btnSearch = $('button[id="search"]');
			this.btnExport = $('button[id="export"]');
			this.btnReset = $('button[id="reset"]');

			this.btnSearch.bind('click', {context: this}, function(e) {
				_pageCommon.resetNumber();
				e.data.context.search();
			});

			this.btnExport.bind('click', {context: this}, function(e) {
				_pageCommon.resetNumber();
				e.data.context.exportData();
			});

			this.btnReset.bind('click', {context: this}, function(e) {
				e.data.context.reset();
			});
		}

		Query.prototype.search = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			_page.loadData();
		};

		Query.prototype.validateRequest = function() {
			if(!_datepicker.validateDuration(_query.fromDate.val(), _query.toDate.val())) return false;

			if (_query.keyword.val() === undefined || _query.keyword.val() === "") {
				_notifyForUser.error('Bạn chưa nhập số tài khoản!');
				_notifyForUser.show();
				_query.keyword.focus();
				return false;
			}
			
			return true;
		};

		Query.prototype.makeRequest = function() {
			_query.request = {
					fromDate:_query.fromDate.val(),
					toDate:_query.toDate.val(),
					keyword:_query.keyword.val(),
					pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
					pageSize: _pageCommon.defaultSize
			};
		};

		Query.prototype.exportData = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			var url = BASE_URL + "/transaction/export-cheque";
			console.log("call ajax export data with url: " + url);
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(_query.request)
			}).done(function(data) {
				console.log(data);
				if(data === null || data === '' || data !== 'done') {
					_notifyForUser.error("Thực hiên xuất sao kê giao dịch thất bại!");
				} else {
					_notifyForUser.ok("Thực hiên xuất sao kê giao dịch thành công!");
				}
				_notifyForUser.show();
			}).fail(function(data) {
				console.log(data);
				console.log("Đã xảy ra lỗi khi thực hiện xuất sao kê giao dịch!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất sao kê giao dịch!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Export Cheque!" );
			});
		};

		Query.prototype.reset = function() {
			_query.fromDate.val('');
			_query.toDate.val('');
			_query.keyword.val('');
		};

		return Query;
	})();

	ChequeView.Table = (function() {

		function Table() {
			this.el = $('#cheque-table');
			this.data = [];
			this.tableEl = this.el.find('table');
		}

		Table.prototype.makeTable = function() {
			this.tableEl.children('tbody').remove();
			this.tableEl.append(this.makeBody());
		};

		Table.prototype.makeBody = function() {
			var tbody = $('<tbody>');
			$.each(this.data, function(i, o) {
				tbody.append($('<tr>')
                   		 .append($('<td>', {"class": "text-nowrap"}).append(o.transactionId))
						.append($('<td>', {"class": "text-nowrap"}).append(o.completeTime))
						.append($('<td>', {"class": "text-nowrap"}).append(_transactionType.toText(o.transactionType)))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.amount)))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.afterBalance)))
				);
			});
			return tbody;
		};

		return Table;
	})();

	ChequeView.Page = (function() {

		function Page() {
			this.paginationEl = _table.el.find('ul.pagination');
		}

		Page.prototype.loadData = function() {
			var url = BASE_URL + "/transaction/cheque";
			console.log("Page load data with url: " + url);
			var self = this;
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(_query.request),
				dataType: "json"
			}).done(function(data) {
				console.log(data);
				_pageCommon.number = data.pageNumber;
				_pageCommon.total = data.pagesAvailable;
				_pageCommon.list = _pageCommon.calculatePage(data.pageNumber, data.pagesAvailable);
				_table.data = data.pageItems;
				_table.makeTable();
				_pageCommon.pagination(self.paginationEl, ChequeView._query);
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm sao kê giao dịch!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm giao dịch!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Search Cheque!" );
			});
		};

		return Page;
	})();

	_query = new ChequeView.Query();
	_table = new ChequeView.Table();
	_page = new ChequeView.Page();

    var accountNo = location.search.split('accountNo=')[1];
    if( accountNo !== ""){
        _query.search();
    }

	ChequeView._query = _query;

}).call(this);