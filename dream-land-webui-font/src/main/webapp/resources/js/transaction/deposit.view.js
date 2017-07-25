(function() {
	var DepositView, _bank, _query, _table, _page;
	
	var _menu = BackendAdminPayDee._menu;
	var _datepicker = BackendAdminPayDee._datepicker;
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _currency = BackendAdminPayDee._currency;
	var _pageCommon = BackendAdminPayDee._page;
	var _partner = BackendAdminPayDee._partner;
	
	var _status = TransactionCommon._status;
	
	_menu.activeMenu('deposit-menu');
	
	_datepicker.init('fromDate');
	_datepicker.init('toDate');
	
	_partner.init();

	_status.init();

	DepositView = window.DepositView = {};
	
	DepositView.Bank = (function() {
		
		function Bank() {
			this.current = undefined;
			this.bankNameEl = $('select[name="bankName"]');
			this.bankNameEl.on("select2:select", function () {
				_bank.current = _bank.bankNameEl.val();
				console.log(_bank);
			});
			this.init();
		}
		
		Bank.prototype.init = function() {
			var url = BASE_URL + "/json/listBankApplied.json";
			var self = this;
			$.ajax({
				async: true,
				url: url,
				method: "GET",
				dataType: "json"
			}).done(function(data) {
				console.log(JSON.stringify(data));
				$.each(data, function(idx, obj) {
					var option = $('<option>', {"value": obj.shortName, "text": obj.shortName});
					self.bankNameEl.append(option);
				});
				self.bankNameEl.select2();
				self.current = self.bankNameEl.select2('data')[0].id;
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi lấy danh sách ngân hàng!");
				_notifyForUser.error('Đã xảy ra lỗi khi lấy danh sách ngân hàng!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Get list banks!" );
			});
		};
		
		return Bank;
	})();

	DepositView.Query = (function() {

		function Query() {
			this.fromDate = $('input[name="fromDate"]');
			this.toDate = $('input[name="toDate"]');
			this.transactionIdEl = $('input[name="transactionId"]');
			this.paydAccountNoEl = $('input[name="paydAccountNo"]');
			this.bankAccountNoEl = $('input[name="bankAccountNo"]');

			this.btnSearch = $('button[name="search-deposit"]');
			this.btnExcel = $('button[name="to-excel-deposit"]');
			this.btnReset =  $('button[name="reset-deposit"]');
			
			this.btnSearch.on('click', { context: this }, function(e) {
				_pageCommon.resetNumber();
				e.data.context.search();
			});
			
			this.btnExcel.on('click', { context: this }, function(e) {
				e.data.context.exportData();
			});

			this.btnReset.bind('click', { context: this}, function (e) {
				_pageCommon.resetNumber();
				e.data.context.reset();
            })
		}

		Query.prototype.makeRequest = function () {
			_query.request = {
				fromdate: _query.fromDate.val(),
				toDate: _query.toDate.val(),
				transactionId: _query.transactionIdEl.val(),
				partnerId: _partner.current < 0 ? null : _partner.current,
				paydAccountNo: _query.paydAccountNoEl.val(),
				bankName: _bank.current < 0 ? null : _bank.current,
				bankAccountNo: _query.bankAccountNoEl.val(),
				status: _status.current < 0 ? null : _status.current,
				pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
				pageSize: _pageCommon.defaultSize
			}
        };

        Query.prototype.validateRequest = function() {
            return _datepicker.validateDuration(_query.fromDate.val(), _query.toDate.val());
        };

		Query.prototype.search = function() {
            if(!_query.validateRequest()) return;
            _query.makeRequest();
			_page.loadData(_query.request);
		};

        Query.prototype.reset = function() {
            this.fromDate.val('');
			this.toDate.val('');
			this.transactionIdEl.val('');
			this.paydAccountNoEl.val('');
			this.bankAccountNoEl.val('');
            _status.statusEl.val("-1").trigger('change.select2');
            _partner.partnerEl.val("-1").trigger('change.select2');
            _bank.bankNameEl.val("-1").trigger('change.select2');
            
            _status.current = -1;
            _partner.current = -1;
            _bank.current = -1;
        };
		
		Query.prototype.exportData = function() {

			if(!_query.validateRequest()) return;
			_query.makeRequest();

			var url = BASE_URL + "/transaction/export-deposit";
			console.log("export deposit with url: " + url);
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(request)
			}).done(function(data) {
				console.log(JSON.stringify(data));
				if(data === null || data === '' || data !== 'done') {
					_notifyForUser.error("Thực hiên xuất giao dịch nạp tiền ngân hàng thất bại!");
				} else {
					_notifyForUser.ok("Thực hiên xuất giao dịch nạp tiền ngân hàng thành công!");
				}
				_notifyForUser.show();
			}).fail(function(data) {
				console.log(data);
				console.log("Đã xảy ra lỗi khi thực hiện xuất giao dịch nạp tiền ngân hàng!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất giao dịch nạp tiền ngân hàng!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Export Deposit Telco!" );
			});
		};

		return Query;
	})();
	
	DepositView.Table = (function() {
		
		function Table() {
			this.el = $('#search-deposit-table');
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
				var tooltip = "<b>- To Partner:</b> " + obj.responseToPartner;
				var accountDetail = "<strong>" + obj.fullName + "</strong><br/>" + obj.phoneNumber + "<br/><strong>" + obj.paydAccountNo + "</strong>";
				tbody.append($('<tr>')
						// .append($('<td>', {"class": "text-nowrap"}).append(idx + 1 + _pageCommon.number * _pageCommon.defaultSize))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.transactionId))
						.append($('<td>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(obj.depositTime)))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.partnerName))
						.append($('<td>', {"class": "text-nowrap"}).append(accountDetail))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.bankTransRef))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.bankName))
						// .append($('<td>', {"class": "text-nowrap"}).append(obj.bankAccountNo))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.bankAccountHolder))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(obj.amount)))
						.append($('<td>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(_status.toText(obj.status))))
						/*.append($('<td>').append(_actionMenu.toHtml()))*/);
			});
			return tbody;
		};

		return Table;
	})();
	
	DepositView.Page = (function() {

		function Page() {
			this.paginationEl = _table.el.find('ul.pagination');
		}

		Page.prototype.loadData = function() {
			var url = BASE_URL + "/transaction/deposit";
			var self = this;
			$.ajax({
				async: true,
				url: url,
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(_query.request),
				dataType: "json"
			}).done(function(data) {
				console.log(data);
				_pageCommon.number = data.pageNumber;
				_pageCommon.total = data.pagesAvailable;
				_pageCommon.list = _pageCommon.calculatePage(data.pageNumber, data.pagesAvailable);
				_table.data = data.pageItems;
				_table.makeTable();
				_pageCommon.pagination(self.paginationEl, DepositView._query);
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch Nạp tiền từ bank!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch Nạp tiền từ bank!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Search Deposit!" );
			});
		};

		return Page;
	})();
	
	_bank = new DepositView.Bank();
	_query = new DepositView.Query();
	_table = new DepositView.Table();
	_page = new DepositView.Page();
	
	DepositView._query = _query;
	_query.search();
	
}).call(this);
