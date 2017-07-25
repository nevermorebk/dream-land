(function (){
	var TopupAccountView, _query, _page, _table;

	var _menu = BackendAdminPayDee._menu;
	var _datepicker = BackendAdminPayDee._datepicker;
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _currency = BackendAdminPayDee._currency;
	var _pageCommon = BackendAdminPayDee._page;
	var _partner = BackendAdminPayDee._partner;
	var _accountType = AccountCommon._type;

	_menu.activeMenu('topupaccount-menu');
	
	_datepicker.init('fromDate');
	_datepicker.init('toDate');
	
	_partner.init();
	_accountType.init();

	TopupAccountView = window.TopupAccountView = {};

	TopupAccountView.Query = (function() {
		function Query() {
			this.fromDate = $('input[name="fromDate"]');
			this.toDate = $('input[name="toDate"]');
			this.transactionId = $('input[name="transactionId"]');
			this.accountNo = $('input[name="accountNo"]');
			this.userName = $('input[name="userName"]');

			this.aSearch = $('a[id="search"]');
			this.aExport = $('a[id="export"]');
			this.aReset = $('a[id="reset"]');
			
			this.aSearch.bind('click', {context: this}, function(e) {
				_pageCommon.resetNumber();
				e.data.context.search();
			});

			this.aExport.bind('click', {context: this}, function(e) {
				//_pageCommon.resetNumber();
				e.data.context.exportData();
			});

			this.aReset.bind('click', {context: this}, function(e) {
				_pageCommon.resetNumber();
				e.data.context.reset();
			});
		}

		Query.prototype.search = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			_page.loadData();
		};

        Query.prototype.validateRequest = function() {
            return _datepicker.validateDuration(_query.fromDate.val(), _query.toDate.val());
        };
		
		Query.prototype.makeRequest = function() {
			_query.request = {
					fromDate:_query.fromDate.val(),
					toDate:_query.toDate.val(),
					partner:_partner.current < 0 ? null : _partner.current,
					accountType:_accountType.current < 0 ? null : _accountType.current,
					transactionId:_query.transactionId.val(),
					accountNo:_query.accountNo.val(),
					userName:_query.userName.val(),
					pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
					pageSize: _pageCommon.defaultSize
			};
		};

		Query.prototype.exportData = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			
			var url = BASE_URL + "/transaction/export-topup-account";
			console.log("topup account export with url: " + url);
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(_query.request)
			}).done(function(data) {
				console.log(data);
				if(data === null || data === '' || data !== 'done') {
					_notifyForUser.error("Thực hiên xuất giao dịch bù trừ tiền thất bại!");
				} else {
					_notifyForUser.ok("Thực hiên xuất giao dịch bù trừ tiền thành công!");
				}
				_notifyForUser.show();
			}).fail(function(data) {
				console.log(data);
				console.log("Đã xảy ra lỗi khi thực hiện xuất giao dịch bù trừ tiền!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất giao dịch bù trừ tiền!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Export Topup Account!" );
			});
		};

		Query.prototype.reset = function() {
			console.log("call function reset()");
			_query.fromDate.val('');
			_query.toDate.val('');
			_query.transactionId.val('');
			_query.accountNo.val('');
			_query.userName.val('');
			
			_accountType.accountTypeEl.val("-1").trigger('change.select2');
			_partner.partnerEl.val("-1").trigger('change.select2');
			
			_accountType.current = -1;
			_partner.current = -1;
			
		};

		return Query;
	})();

	TopupAccountView.Table = (function() {

		function Table() {
			this.el = $('#topup-account-table');
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
				var _actionMenu = new BackendAdminPayDee.ActionMenu();
				_actionMenu.addMenu('fa-bar-chart', "Chi tiết", '#', 'alert("Đã click chi tiết!")');
				// var accountDetail = "<strong>" + o.fullName + "</strong><br/>" + o.phone + "<br/><strong>" + o.accountNo + "</strong>";
                var tooltip = "<b>- Nội dung:</b> " + (o.message ==null ? "": o.message);
				tbody.append($('<tr>')
						// .append($('<td>', {"class": "text-nowrap"}).append(i + 1 + _pageCommon.number * _pageCommon.defaultSize))
					 	.append($('<td>', {"class": "text-nowrap"}).append(o.id))
                    	.append($('<td>', {"class": "text-nowrap"}).append(o.requestTime))
						.append($('<td>', {"class": "text-nowrap"}).append(o.partner))
						.append($('<td>', {"class": "text-nowrap"}).append(_accountType.toText(o.accountType)))
					    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.phone+'>'+ o.fullName+'</a>'))
					    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.phone+'>'+ o.phone+'</a>'))
						.append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/transaction/cheque?accountNo='+o.accountNo+'>'+ o.accountNo+'</a>'))
					.append($('<td style=\"text-align: right;\">', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(_table.toIconBy(o.cashType) + _currency.formatCurrency(o.money))))
						.append($('<td style=\"text-align: center;\">', {"class": "text-nowrap"}).append(o.userName))
				);
			});
			return tbody;
		};

		Table.prototype.toIconBy = function(typecash) {
			switch (typecash) {
			case "DEPOSIT":
				return "+";
			/*case "WITHDRAW":
				return "-";*/
			default:
				return "";
			}
		};

		return Table;
	})();

	TopupAccountView.Page = (function() {

		function Page() {
			this.paginationEl = _table.el.find('ul.pagination');
		}

		Page.prototype.loadData = function() {
			var url = BASE_URL + "/transaction/topup-account";
			console.log("Page load data with url: " + url);
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
				_pageCommon.pagination(_page.paginationEl, TopupAccountView._query);
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch bù trừ tiền!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch bù trừ tiền!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Search Topup Account!" );
			});
		};

		return Page;
	})();

	_query = new TopupAccountView.Query();
	_table = new TopupAccountView.Table();
	_page = new TopupAccountView.Page();

	TopupAccountView._query = _query;
	_query.search();

}).call(this);