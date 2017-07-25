(function() {
	var OtpView, _type, _status, _query, _table, _page, _resendOtp;
	
	var _menu = BackendAdminPayDee._menu;
	var _datepicker = BackendAdminPayDee._datepicker;
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _pageCommon = BackendAdminPayDee._page;

	_menu.activeMenu('otp-menu');
	_datepicker.init('fromDate');
	_datepicker.init('toDate');

	OtpView = window.OtpView = {};
	
	OtpView.Type = (function() {

		function Type() {
			this.current = undefined;
			this.otpTypeEl = $('select[name="otpType"]');
			this.otpTypeEl.on("select2:select", function () {
				_type.current = _type.otpTypeEl.val();
				console.log(_type);
			});
			this.init();
		}

		Type.prototype.init = function() {
			var data = [
				{ id: -1, text: 'Loại OTP' },
				{ id: 0, text: 'Giao dịch' }, 
				{ id: 1, text: 'Kích hoạt tài khoản' }, 
				{ id: 2, text: 'Resend' }, 
				{ id: 3, text: 'Reset mật khẩu' }
			];
			this.otpTypeEl.select2({
				data: data
			});
			this.current = this.otpTypeEl.select2('data')[0].id;
		};
		
		Type.prototype.toText = function(type) {
			switch(type){
		    case 0: return "Giao dịch";
		    case 1: return "Kích hoạt tài khoản";
		    case 2: return "Resend";
		    case 3: return "Reset mật khẩu";
		    default: return "";
		    }
		};

		return Type;
	})();
	
	OtpView.Status = (function() {

		function Status() {
			this.current = undefined;
			this.statusEl = $('select[name="status"]');
			this.statusEl.on("select2:select", function () {
				_status.current = _status.statusEl.val();
				console.log(_status);
			});
			this.init();
		}

		Status.prototype.init = function() {
			var data = [
				{ id: -1, text: 'Trạng thái' },
				{ id: 0, text: 'Chờ xác nhận' }, 
				{ id: 1, text: 'Thành công' }, 
				{ id: 2, text: 'Hết hạn' }
			];
			this.statusEl.select2({
				data: data
			});
			this.current = this.statusEl.select2('data')[0].id;
		};
		
		Status.prototype.toText = function(status) {
			switch(status){
		    case 0: return "Chờ xác nhận";
		    case 1: return "Thành công";
		    case 2: return "Hết hạn";
		    default: return "";
		    }
		};

		return Status;
	})();

	OtpView.Query = (function() {

		function Query() {
			this.fromDate = $('input[name="fromDate"]');
			this.toDate = $('input[name="toDate"]');
			this.keyword = $('input[name="keyword"]');
			
			this.btnSearch = $('button[name="search-otp"]');
			this.btnExport = $('button[name="export-otp"]');
			this.btnReset = $('button[name="reset-otp"]');

			this.btnExport.on('click', { context: this }, function(e) {
				_pageCommon.resetNumber();
				e.data.context.exportData();
			});
			
			this.btnSearch.on('click', { context: this }, function(e) {
				_pageCommon.resetNumber();
				e.data.context.search();
			});

			this.btnReset.on('click', {context: this}, function(e){
                _pageCommon.resetNumber();
                e.data.context.reset();
			});
		}

        Query.prototype.makeRequest = function () {
            _query.request = {
                fromDate: _query.fromDate.val(),
				toDate: _query.toDate.val(),
                otpType: _type.current,
                keyword: _query.keyword.val(),
                status: _status.current,
                pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
                pageSize: _pageCommon.defaultSize
            }
        };

        Query.prototype.validateRequest = function() {
            return _datepicker.validateDuration(_query.fromDate.val(), _query.toDate.val());
        };
		
		Query.prototype.exportData = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			console.log(_query.request);
			console.log("Fetching Data Of Page: " + _query.pageNumber);
			var url = BASE_URL + "/otp/export";
			console.log("charging export with url: " + url);
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(_query.request)
			}).done(function(data) {
				console.log(data);
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
				console.log("Complete Call Ajax: Export OTP" );
			})
			
		};

		Query.prototype.search = function() {
			if(!_query.validateRequest()) return;
            _query.makeRequest();
			_page.loadData(_query.request);
		};

        Query.prototype.reset = function() {
            console.log("call function reset()");
            $('#fromDate').val('');
            $('#toDate').val('');
            $('#keyword').val('');
            _type.otpTypeEl.val("-1").trigger('change.select2');
            _status.statusEl.val("-1").trigger('change.select2');
        };

		return Query;
	})();
	
	OtpView.Table = (function() {
		
		function Table() {
			this.el = $('#search-otp-table');
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
				if (obj.otpType === 1 && (obj.status === 0 || obj.status === 2)) {
					_actionMenu.addMenu('fa-repeat', "Gửi lại", '#', 
							'OtpView._resendOtp.confirm("' + obj.receiveName + '", "' + obj.receivePhoneNumber + '", "' + obj.reference + '")');
				}
				tbody.append($('<tr>')
						.append($('<td>', {"class": "text-nowrap"}).append(idx + 1 + _pageCommon.number * _pageCommon.defaultSize))
						.append($('<td>', {"class": "text-nowrap"}).append(obj.sendTime))
						.append($('<td>', {"class": "text-nowrap"}).append("<strong>" + obj.receiveName + "</strong>"))
						.append($('<td>', {"class": "text-nowrap"}).append("<strong>" + obj.receivePhoneNumber + "</strong>"))
						.append($('<td>', {"class": "text-nowrap"}).append(_type.toText(obj.otpType)))
						.append($('<td align=\'right\'>', {"class": "text-nowrap"}).append("<strong>" + obj.count + "</strong>"))
						.append($('<td>', {"class": "text-nowrap"}).append(_status.toText(obj.status)))
						.append($('<td>').append((obj.otpType == 1 && (obj.status == 0 || obj.status == 2)) ? _actionMenu.toHtml() : '')));
			});
			return tbody;
		};
		
		return Table;
	})();
	
	OtpView.Page = (function() {

		function Page() {
			this.paginationEl = _table.el.find('ul.pagination');
		}

		Page.prototype.loadData = function() {
			var url = BASE_URL + "/otp/search";
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
				_pageCommon.pagination(self.paginationEl, OtpView._query);
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm mã OTP!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm mã OTP!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Search OTP!" );
			});
		};
		
		return Page;
	})();
	
	OtpView.ResendOtp = (function() {
		
		function ResendOtp() {}
		
		ResendOtp.prototype.confirm = function(receiveName, receivePhoneNumber, reference) {
			var confirmMessage = '<h4>Bạn có chắc chắn gửi lại tin nhắn này cho <strong>' + receiveName + ' - ' + receivePhoneNumber + '</strong> không?</h4>';
			var self = this;
			bootbox.confirm({
				title: "<strong>Chú ý!</strong>",
				message: confirmMessage,
				buttons: {
					confirm: {
						label: 'Đồng ý',
						className: 'btn-success'
					},
					cancel: {
						label: 'Hủy',
						className: 'btn-danger'
					}
				},
				callback: function(result) {
					if (! result) return;
					var request = {
							data: reference
					};
					console.log(request);
					self.resend(request);
				}
			});
		};
		
		ResendOtp.prototype.resend = function(request) {
			var url = BASE_URL + "/otp/resend-otp";
			$.ajax({
				async: true,
				url: url,
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(request),
				dataType: "text"
			}).done(function(data) {
				console.log(data);
				if (data !== null && data.length > 0) {
					_notifyForUser.ok('Gửi lại tin nhắn thành công!');
					_notifyForUser.show();
				}
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi gửi lại tin nhắn!");
				_notifyForUser.error('Đã xảy ra lỗi khi gửi lại tin nhắn!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Resend OTP!" );
			});
		};
		
		return ResendOtp;
	})();
	
	_type = new OtpView.Type();
	_status = new OtpView.Status();
	_query = new OtpView.Query();
	_table = new OtpView.Table();
	_page = new OtpView.Page();
	_resendOtp = new OtpView.ResendOtp();
	
	OtpView._query = _query;
	OtpView._resendOtp = _resendOtp;
	
	_query.search();
	
}).call(this);
