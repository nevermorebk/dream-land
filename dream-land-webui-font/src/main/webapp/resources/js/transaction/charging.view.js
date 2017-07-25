(function() {
	var ChargingView, _query, _table, _page;

	var _menu = BackendAdminPayDee._menu;
	var _datepicker = BackendAdminPayDee._datepicker;
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _currency = BackendAdminPayDee._currency;
	var _pageCommon = BackendAdminPayDee._page;
	var _partner = BackendAdminPayDee._partner;

	_menu.activeMenu('charging-menu');
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

	ChargingView = window.ChargingView = {};

	ChargingView.Query = (function() {

		function Query() {
			this.fromDate = $('input[name="fromDate"]');
			this.toDate = $('input[name="toDate"]');
			this.transactionIdEl = $('input[name="transactionId"]');
			this.accountNoEl = $('input[name="accountNo"]');
			this.requestIdEl = $('input[name="requestId"]');
			this.cardSerialEl = $('input[name="cardSerial"]');
			this.cardCodeEl = $('input[name="cardCode"]');

			this.btnSearch = $('button[name="search-charging"]');
			this.btnExcel = $('button[name="to-excel-charging"]');
			this.btnReset = $('button[name="reset-charging"]');

            //var request = undefined;

			this.btnExcel.on('click', { context: this }, function(e) {
				e.data.context.exportData();
			});

			this.btnSearch.on('click', { context: this }, function(e) {
				_pageCommon.resetNumber();
				e.data.context.search();
			});

			this.btnReset.on('click', { context: this }, function(e) {
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
					fromDate: _query.fromDate.val(),
					toDate: _query.toDate.val(),
					transactionId: _query.transactionIdEl.val(),
					partnerId: _partner.current < 0 ? null : _partner.current,
					accountNo: _query.accountNoEl.val(),
					requestId: _query.requestIdEl.val(),
					providerCode: _provider.current < 0 ? null : _provider.current,
					issuer: _issuer.current < 0 ? null : _issuer.current,
					cardSerial: _query.cardSerialEl.val(),
					cardCode: _query.cardCodeEl.val(),
					price: _product.current < 0 ? null : _product.current,
					status: _status.current < 0 ? null : _status.current,
					pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
					pageSize: _pageCommon.defaultSize
			};
		};

		Query.prototype.exportData = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			console.log(JSON.stringify(_query.request));
			var url = BASE_URL + "/transaction/charging-export";
			console.log("charging export with url: " + url);
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(_query.request)
			}).done(function(data) {
				console.log(JSON.stringify(data));
				if(data === null || data === '' || data !== 'done') {
					_notifyForUser.error("Thực hiên xuất thất bại!");
				} else {
					_notifyForUser.ok("Thực hiên xuất thành công!");
				}
				_notifyForUser.show();
			}).fail(function(data) {
				console.log(data);
				console.log("Đã xảy ra lỗi khi thực hiện xuất ");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất !');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Export Charging Account!" );
			});

		};

		Query.prototype.reset = function() {
			_query.fromDate.val('');
			_query.toDate.val('');
			_query.transactionIdEl.val('');
			_query.accountNoEl.val('');
			_query.requestIdEl.val('');
			_query.cardSerialEl.val('');
			_query.cardCodeEl.val('');
			_provider.providerEl.val("-1").trigger('change.select2');
			_partner.partnerEl.val("-1").trigger('change.select2');
			_issuer.issuerEl.val("-1").trigger('change.select2');
			_product.productEl.val("-1").trigger('change.select2');
			_status.statusEl.val("-1").trigger('change.select2');
			
			_partner.current = -1;
			_provider.current = -1;
			_issuer.current = -1;
			_product.current = -1;
			_status.current = -1;
		};
		return Query;
	})();

	ChargingView.Table = (function() {

		function Table() {
			this.el = $('#search-charging-table');
			this.data = [];
			this.tableEl = this.el.find('table');
		}

		Table.prototype.makeTable = function() {
			this.tableEl.children('tbody').remove();
			this.tableEl.append(this.makeBody());
		};

		Table.prototype.makeBody = function() {
			var tbody = $('<tbody>');
			$.each(this.data, function(idx, obj) {
				var _actionMenu = new BackendAdminPayDee.ActionMenu();	// Phải khởi tạo đối tượng mới.
				_actionMenu.addMenu('fa-bar-chart', "Chi tiết", '#', 'alert("Đã click chi tiết!")');
				// var accountDetail = "<strong>" + obj.fullName + "</strong><br/>" + obj.phoneNumber + "<br/><strong>" + obj.accountNo + "</strong>";
				var tooltip;
				if(obj.username === null){
					tooltip = "<b>- To Partner:</b> " + obj.responseToPartner + "<br/><b>- From Provider:</b> " + obj.responseFromProvider;
				} else {
					tooltip = "<b>- To Partner:</b> " + obj.responseToPartner + "<br/><b>- From Provider:</b> " + obj.responseFromProvider + "<br/><b>- User:</b> " + obj.username +"<br/><b>- Time:</b>" + obj.time;
				}
				var issuer = _issuer.get(obj.issuer);
				tbody.append($('<tr>')
						// .append($('<td>', {"class": "text-nowrap"}).append(idx + 1 + _pageCommon.number * _pageCommon.defaultSize))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.transactionId))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.requestId))
						.append($('<td>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(obj.requestTime)))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.partnerName))
                    	.append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+obj.phoneNumber+'>'+ obj.fullName+'</a>'))
						.append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+obj.phoneNumber+'>'+ obj.phoneNumber+'</a>'))
					    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/transaction/cheque?accountNo='+obj.accountNo+'>'+ obj.accountNo+'</a>'))
						// .append($('<td>', {"class": "text-nowrap"}).append(obj.provider !== null ? obj.provider : ""))
						.append($('<td>', {"class": "text-nowrap"}).append(issuer === undefined ? "" : issuer.name))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(obj.cardSerial))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(obj.cardCode))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(obj.denomination)))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(obj.rate !== 'null' ? obj.rate : "0.0"))
                    	.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(obj.amount === null? "0" :_currency.formatCurrency(obj.amount)))
						.append($('<td>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(obj.completeTime)))
						.append($('<td>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(_status.toText(obj.status))))
                    	.append(obj.status===4 ? $('<td>') : $('<td>', {"class": "text-nowrap"}).append($("<a target='_blank'>").attr('href', BASE_URL + '/transaction/update-charging?id=' + idx +'&issuer='+ (issuer === undefined ? "" : issuer.name) +'&status='+ obj.status+'&rate='+ (obj.rate !== 'null' ? obj.rate : "0")+'&code='+ obj.issuer+'&denomination='+ obj.denomination).text("Cập nhật"))));
			});
			return tbody;
		};

		Table.prototype.showOption = function () {
            $.each(this.data, function (i, o) {
                var select = $("#" + i);
                switch (o.status) {
                    case 1: {
                        select.attr('data-accountNo',o.accountNo).attr('href',"/")

                    }
                    case 0,2:{
                        select.attr('data-accountNo',o.accountNo).attr('href',"/")
                    }
                }
            });
        };

		return Table;
	})();

	ChargingView.Page = (function() {

		function Page() {
			this.paginationEl = _table.el.find('ul.pagination');
		}

		Page.prototype.loadData = function() {
			var url = BASE_URL + "/transaction/charging";
			console.log(JSON.stringify(_query.request));
			$.ajax({
				async: true,
				url: url,
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(_query.request),
				dataType: "json"
			}).done(function(data) {
				console.log(JSON.stringify(data));
				_pageCommon.number = data.pageNumber;
				_pageCommon.total = data.pagesAvailable;
				_pageCommon.list = _pageCommon.calculatePage(data.pageNumber, data.pagesAvailable);
				_table.data = data.pageItems;
				_table.makeTable();
				_table.showOption();
				_pageCommon.pagination(_page.paginationEl, ChargingView._query);
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch Nạp tiền bằng thẻ cào!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch Nạp tiền bằng thẻ cào!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Search Charging!" );
			})
		};

		return Page;
	})();

	_query = new ChargingView.Query();
	_table = new ChargingView.Table();
	_page = new ChargingView.Page();

	ChargingView._query = _query;
	_query.search();

}).call(this);
