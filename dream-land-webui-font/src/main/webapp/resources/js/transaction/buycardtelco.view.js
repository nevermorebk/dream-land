(function (){
	var BuycardtelcoView, _query, _page, _table;

	var _menu = BackendAdminPayDee._menu;
	var _datepicker = BackendAdminPayDee._datepicker;
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _currency = BackendAdminPayDee._currency;
	var _pageCommon = BackendAdminPayDee._page;
	var _partner = BackendAdminPayDee._partner;

	_menu.activeMenu('buycardtelco-menu');
	_datepicker.init('fromDate');
	_datepicker.init('toDate');
	_partner.init();

	var _status = TransactionCommon._status;
	var _provider = TransactionCommon._provider;
	var _issuer = TransactionCommon._issuer;
	var _product = TransactionCommon._product;

	_status.init();
	//_provider.init();
	_issuer.init();
	_product.init();

	BuycardtelcoView = window.BuycardtelcoView = {};

	BuycardtelcoView.Query = (function() {
		function Query() {
			this.fromDate = $('input[name="fromDate"]');
			this.toDate = $('input[name="toDate"]');
			this.transactionId = $('input[name="transactionId"]');
			this.accountNo = $('input[name="accountNo"]');
			this.requestId = $('input[name="requestId"]');
			this.aSearch = $('a[id="search"]');
			this.aExport = $('a[id="export"]');
			this.aReset = $('a[id="reset"]');

			this.aSearch.bind('click', {context: this}, function(e) {
				_pageCommon.resetNumber();
				e.data.context.search();
			});

			this.aExport.bind('click', {context: this}, function(e) {
				e.data.context.exportData();
			});

			this.aReset.bind('click', {context: this}, function(e) {
				e.data.context.reset();
			});
		}

		Query.prototype.search = function() {
			if (!_query.validateRequest()) return;
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
					transactionId:_query.transactionId.val(),
					accountNo:_query.accountNo.val(),
					requestId:_query.requestId.val(),
					status:_status.current < 0 ? null : _status.current,
							provider:_provider.current < 0 ? null : _provider.current,
									partner:_partner.current < 0 ? null : _partner.current,
											issuer:_issuer.current < 0 ? null : _issuer.current,
													denomination:_product.current < 0 ? null : _product.current,
															pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
																	pageSize: _pageCommon.defaultSize
			};
		};

		Query.prototype.exportData = function() {
			if (!_query.validateRequest()) return;
			_query.makeRequest();
			var url = BASE_URL + "/transaction/export-buy-card-telco";
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
					_notifyForUser.error("Thực hiên xuất giao dịch mua thẻ cào thất bại!");
				} else {
					_notifyForUser.ok("Thực hiên xuất giao dịch mua thẻ cào thành công!");
				}
				_notifyForUser.show();
			}).fail(function(data) {
				console.log(data);
				console.log("Đã xảy ra lỗi khi thực hiện xuất giao dịch mua thẻ cào!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất giao dịch mua thẻ cào!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Export Buycard!" );
			});
		};

		Query.prototype.reset = function() {
			console.log("call function reset()");
			_query.fromDate.val('');
			_query.toDate.val('');
			_query.transactionId.val('');
			_query.accountNo.val('');
			_query.requestId.val('');
			_status.statusEl.val("-1").trigger('change.select2');
			_provider.providerEl.val("-1").trigger('change.select2');
			_partner.partnerEl.val("-1").trigger('change.select2');
			_issuer.issuerEl.val("-1").trigger('change.select2');
			_product.productEl.val("-1").trigger('change.select2');

			_status.current = -1;
			_provider.current = -1;
			_partner.current = -1;
			_issuer.current = -1;
			_product.current = -1;
		};

		return Query;
	})();

	BuycardtelcoView.Table = (function() {

		function Table() {
			this.el = $('#buycard-table');
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
				_actionMenu.addMenu('fa-bar-chart', "Xử lý giao dịch", '#', 'BuycardtelcoView._table.recheck('+ o.transactionId +')');
				// var accountDetail = "<strong>" + o.fullName + "</strong><br/>" + o.phone + "<br/><strong>" + o.account + "</strong>";
				var tooltip = "<b>- To Partner:</b> " + o.responseToPartner + "<br/><b>- From Provider:</b> " + o.responseFromProvider;
				var issuer = _issuer.get(o.issuer);
				tbody.append($('<tr>')
						// .append($('<td>', {"class": "text-nowrap"}).append(i + 1 + _pageCommon.number * _pageCommon.defaultSize))
						.append($('<td>', {"class": "text-nowrap"}).append(o.transactionId))
						.append($('<td>', {"class": "text-nowrap"}).append(o.requestId))
						.append($('<td>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(o.requestTime)))
						.append($('<td>', {"class": "text-nowrap"}).append(o.partner))
						.append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.phone+'>'+ o.fullName+'</a>'))
						.append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.phone+'>'+ o.phone+'</a>'))
						.append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/transaction/cheque?accountNo='+o.account+'>'+ o.account+'</a>'))
						// .append($('<td>', {"class": "text-nowrap"}).append(o.provider))
						.append($('<td align=\'center\'>', {"class": "text-nowrap"}).append(issuer === undefined ? "" : issuer.name))
						.append($('<td align=\'center\'>', {"class": "text-nowrap"}).append(o.denomination))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(o.quantity))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.money)))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(o.rate !== null ? o.rate : "0.0" ))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.readMoney)))

						.append($('<td>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(o.completeTime)))
						.append($('<td>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(_status.toText(o.status))))
						.append(o.status===0 ? $('<td>').append(_actionMenu.toHtml()) : $('<td>'))
				);
			});
			return tbody;
		};

		Table.prototype.recheck = function(id) {
			var url = BASE_URL + "/transaction/recheck/id=" + id;
			console.log('recheck url: ' + url);
			$.ajax({
				url: url,
				async: false,
				type: 'GET'
			}).done(function(data) {
				console.log(data);
				if(data.code != ErrorCode.SUCCESS){
					_notifyForUser.error(data.message);
					_notifyForUser.show();
				} else {
					_notifyForUser.ok("Xử lý giao dịch nghi vấn thành công!");
					_notifyForUser.show();
					setTimeout(() => {
						_query.search();
					}, 2000);
				}
				/*if(data === 'ok') {
					_notifyForUser.ok("Xử lý giao dịch nghi vấn thành công!");
					_notifyForUser.show();
					setTimeout(() => {
						_query.search();
					}, 2000);
				} else {_notifyForUser.error(data);
				_notifyForUser.show();
				}*/
			});
		};

		return Table;
	})();

	BuycardtelcoView.Page = (function() {

		function Page() {
			this.paginationEl = _table.el.find('ul.pagination');
		}

		Page.prototype.loadData = function() {
			var url = BASE_URL + "/transaction/buy-card-telco";
			console.log("Page load data with url: " + url);
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(_query.request),
				dataType: "json"
			}).done(function(data) {
				console.log(JSON.stringify(data));
				_pageCommon.number = data.pageNumber;
				_pageCommon.total = data.pagesAvailable;
				_pageCommon.list = _pageCommon.calculatePage(data.pageNumber, data.pagesAvailable);
				_table.data = data.pageItems;
				_table.makeTable();
				_pageCommon.pagination(_page.paginationEl, BuycardtelcoView._query);
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch Mua thẻ điện thoại!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch Mua thẻ điện thoại!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Search BuyCard!" );
			});
		};

		return Page;
	})();

	_query = new BuycardtelcoView.Query();
	_table = new BuycardtelcoView.Table();
	_page = new BuycardtelcoView.Page();

	BuycardtelcoView._query = _query;
	BuycardtelcoView._table = _table;
	_query.search();

}).call(this);