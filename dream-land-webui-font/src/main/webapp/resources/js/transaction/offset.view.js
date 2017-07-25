(function() {
	var OffsetTransaction, _query, _table, _page;

	var _menu = BackendAdminPayDee._menu;
	var _datepicker = BackendAdminPayDee._datepicker;
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _currency = BackendAdminPayDee._currency;
	var _pageCommon = BackendAdminPayDee._page;
	var _partner = BackendAdminPayDee._partner;
	var _type = TransactionCommon._type;

	_menu.activeMenu('offset-menu');
	_datepicker.init('fromDate');
	_datepicker.init('toDate');
	_partner.init();
	_type.init();

	//var _status = TransactionCommon._status;
	//var _provider = TransactionCommon._provider;
	//var _issuer = TransactionCommon._issuer;
	//var _product = TransactionCommon._product;
	

	//_status.init();
	//_provider.init();
	//_issuer.init();
	//_product.init();

	OffsetTransaction = window.OffsetTransaction = {};

	OffsetTransaction.Query = (function() {

		function Query() {
			this.fromDate = $('input[name="fromDate"]');
			this.toDate = $('input[name="toDate"]');
			this.transactionIdEl = $('input[name="transactionId"]');
			this.partnerEl = $('input[name="partner"]');
			this.accountNoEl = $('input[name="accountId"]');
			this.userIdEl = $('input[name="userId"]');
			this.originalTransIdEl = $('input[name="originalTransId"]');
			this.originalTransTypeEl = $('input[name="originalTransType"]');

			this.btnSearch = $('button[name="search-transaction"]');
			this.btnExcel = $('button[name="to-excel-transaction"]');
			this.btnReset = $('button[name="reset-transaction"]');

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
					originalTransId: _query.originalTransIdEl.val(),
					originalTransType: _type.current < 0 ? null : _type.current,
					userId: _query.userIdEl.val(),
					
					pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
					pageSize: _pageCommon.defaultSize
			};
		};
		
		Query.prototype.exportData = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			console.log(JSON.stringify(_query.request));
			var url = BASE_URL + "/transaction/offset-export";
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
				console.log("Complete Call Ajax: Export Transaction!" );
			});

		};
		
		Query.prototype.reset = function() {
			_query.fromDate.val('');
			_query.toDate.val('');
			_query.transactionIdEl.val('');
			_partner.partnerEl.val("-1").trigger('change.select2');
			_query.accountNoEl.val('');
			_query.originalTransIdEl.val('');
			_type.originalTransTypeEl.val("-1").trigger('change.select2');
			_query.userIdEl.val('');								
			
			_partner.current = -1;
			_type.current = -1;
					
		};
		return Query;
	})();

	OffsetTransaction.Table = (function() {

		function Table() {
			this.el = $('#transactionTable');
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
				var tooltip;
				if(obj.username === null){
					tooltip = "<b>- To Partner:</b> " + obj.responseToPartner + "<br/><b>- From Provider:</b> " + obj.responseFromProvider;
				} else {
					tooltip = "<b>- To Partner:</b> " + obj.responseToPartner + "<br/><b>- From Provider:</b> " + obj.responseFromProvider + "<br/><b>- User:</b> " + obj.username +"<br/><b>- Time:</b>" + obj.time;
				}
				//var issuer = _issuer.get(obj.issuer);
				tbody.append($('<tr>')
						//.append($('<td>', {"class": "text-nowrap"}).append(idx + 1 + _pageCommon.number * _pageCommon.defaultSize))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.transactionId))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.completeTime))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.partnerName))
                    	.append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+obj.phoneNumber+'>'+ obj.fullName+'</a>'))
						.append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+obj.phoneNumber+'>'+ obj.phoneNumber+'</a>'))
					    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/transaction/cheque?accountNo='+obj.accountNo+'>'+ obj.accountNo+'</a>'))												
						.append($('<td align=\'left\'>', {"class": "text-nowrap"}).append(obj.originalTransId))
						//.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(obj.originalTransType))
						.append($('<td>', {"class": "text-nowrap"}).append(_type.toText(obj.originalTransType)))
                    	.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(obj.amount === null? "0" :_currency.formatCurrency(obj.amount)))
                    	.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(obj.username)))						                    	
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

	OffsetTransaction.Page = (function() {

		function Page() {
			this.paginationEl = _table.el.find('ul.pagination');
		}

		Page.prototype.loadData = function() {
			var url = BASE_URL + "/transaction/offset";
			console.log("JSON Request: " + JSON.stringify(_query.request));
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
				_pageCommon.pagination(_page.paginationEl, OffsetTransaction._query);
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm giao dịch!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm giao dịch!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Offset Transaction!" );
			})
		};

		return Page;
	})();

	_query = new OffsetTransaction.Query();
	_table = new OffsetTransaction.Table();
	_page = new OffsetTransaction.Page();

	OffsetTransaction._query = _query;
	_query.search();

}).call(this);
