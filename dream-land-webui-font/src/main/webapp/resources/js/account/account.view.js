(function () {

    var AccountView, _query, _page, _table, _changeAccountType;

    var _menu = BackendAdminPayDee._menu;
    var _datepicker = BackendAdminPayDee._datepicker;
    var _partner = BackendAdminPayDee._partner;
    var _notifyForUser = BackendAdminPayDee._notifyForUser;
    var _pageCommon = BackendAdminPayDee._page;

    _menu.activeMenu('account-menu');
    _datepicker.init('fromDate');
    _datepicker.init('toDate');
    _partner.init();

    AccountView = window.AccountView = {};

    AccountView.Query = (function () {

        function Query() {
            this.fromDate = $('input[name="fromDate"]');
            this.toDate = $('input[name="toDate"]');
            this.keyword = $('input[name="keyword"]');

            this.btnSearch = $('button[id="search"]');
            this.btnExport = $('button[id="export"]');
            this.btnReset = $('button[id="reset"]');

            this.btnSearch.bind('click', {context: this}, function (e) {
                _pageCommon.resetNumber();
                e.data.context.search();
            });

            this.btnExport.bind('click', {context: this}, function (e) {
                //_pageCommon.resetNumber();
                e.data.context.exportData();
            });

            this.btnReset.bind('click', {context: this}, function (e) {
            	_pageCommon.resetNumber();
                e.data.context.reset();
            });
        }

        Query.prototype.search = function () {
            if (!_query.validateRequest()) return;
            _query.makeRequest();
            console.log(JSON.stringify(_query.request));
            _page.loadData();
        };

        Query.prototype.validateRequest = function() {
            return _datepicker.validateDuration(_query.fromDate.val(), _query.toDate.val());
        };

        Query.prototype.makeRequest = function () {
            _query.request = {
                fromDate: _query.fromDate.val(),
                toDate: _query.toDate.val(),
                keyword: _query.keyword.val(),
                pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
                partner: $('#partner').val(),
                //partner: _partner.current < 0 ? null : _partner.current,
                status: $('#status').val(),
                accountType: $('#accountType').val(),
                pageSize: _pageCommon.defaultSize
            };
        };

        Query.prototype.exportData = function () {
            if (!_query.validateRequest()) return;
            _query.makeRequest();
            var url = BASE_URL + "/account/export";
            console.log("call ajax export data with url: " + url);
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(_query.request)
            }).done(function (data) {
                console.log(data);
                if (data === null || data === '' || data !== 'done') {
                    _notifyForUser.error("Thực hiên xuất xuất danh sách tài khoản thành công!");
                } else {
                    _notifyForUser.ok("Thực hiên xuất danh sách tài khoản thành công!");
                }
                _notifyForUser.show();
            }).fail(function (data) {
                console.log(data);
                console.log("Đã xảy ra lỗi khi thực hiện xuất danh sách tài khoản!");
                _notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất danh sách tài khoản!');
                _notifyForUser.show();
            }).always(function () {
                console.log("Complete Call Ajax: Export Account!");
            });
        };


        Query.prototype.updateStatus = function(accountNo, status) {
			var confirmMessage = '<h4>Bạn có muốn cập nhật tài khoản <strong>' + accountNo +  '</strong> với trạng thái <strong>' + _table.statusOf(status)+ '</strong> ? </h4>';
			var self = this;
			bootbox.confirm({
				title: "<strong>Cập nhật trạng thái tài khoản</strong>",
				message: confirmMessage,
				buttons: { 
			        cancel: {
			    
			            label: '<i class="fa fa-times"></i> Hủy'
			        },
			        confirm: {
			        	
			            label: '<i class="fa fa-check"></i> Đồng ý'
			        }
			    },
				callback: function(result) {
					if (! result) return;
					var url = BASE_URL + "/account/update-status?status="+status+"&accountNo="+ accountNo;
					console.log("url update: "+url);
					console.log(status, accountNo);
					$.ajax({
						type : 'GET',
						contentType : 'application/json',
						url : url
					}).done(function(data) {
						console.log(JSON.stringify(data));
						if(data === 'Done'){
							_notifyForUser.ok("Cập nhật trạng thái thành công!");
							_notifyForUser.show();
						}
					}).fail(function(data){
						console.log("Error: " + JSON.stringify(data));
						_notifyForUser.error("Cập nhật trạng thái thất bại! Xin thử lại.");
						_notifyForUser.show();
					}).always(function () {
						_query.search();
					});
				}
			});
		};
        Query.prototype.reset = function () {
            _query.fromDate.val('');
            _query.toDate.val('');
            _query.keyword.val('');
            
            _partner.partnerEl.val("").trigger('change.select2');
            $('#status').val('');
            $('#accountType').val('');
        };

        return Query;
    })();

    AccountView.ChangeAccountType = function() {
        function ChangeAccountType() {
            this.modalEl = $('#reset-password-form-modal');
            this.modalTitleEl = this.modalEl.find('h4.modal-title');

            this.type = undefined;
            this.obj = undefined;

            this.contentEl = this.modalEl.find('label[for="content"]');

            this.btnConfirm = this.modalEl.find('button[name="confirm-form"]');

            this.btnConfirm.bind('click', {context: this}, function(e) {
                e.data.context.confirm();
            });
        }

        /*ChangeAccountType.prototype.show = function(){
            var content ;
            console.log(_changeAccountType.obj.fullName)
            if(_changeAccountType.obj.accountType === "Agent"){
                content = 'Bạn có chắc chắn muốn  đổi người dùng ' + _changeAccountType.obj.fullName + ' sang loại tài khoản Buyer?';
                _changeAccountType.type = 2;
            }else {
                content = 'Bạn có chắc chắn muốn  đổi người dùng ' + _changeAccountType.obj.fullName + ' sang loại tài khoản Agent?';
                _changeAccountType.type = 1;
            }
            this.contentEl.text(content);
            _changeAccountType.modalEl.modal();
        };*/

        ChangeAccountType.prototype.confirm = function() {

            if (_changeAccountType.obj.accountNo === undefined || _changeAccountType.obj.accountNo=== null || _changeAccountType.obj.accountNo === '')
                return;

            var confirmMessage;

            if(_changeAccountType.obj.accountType === "Agent"){
                confirmMessage = '<h4>Bạn có chắc chắn muốn  đổi người dùng <strong>' + _changeAccountType.obj.fullName + '</strong> sang loại tài khoản <strong>Buyer</strong>?';
                _changeAccountType.type = 2;
            }else {
                confirmMessage = '<h4>Bạn có chắc chắn muốn  đổi người dùng <strong>' + _changeAccountType.obj.fullName + '</strong> sang loại tài khoản <strong>Agent</strong>?';
                _changeAccountType.type = 1;
            }

            bootbox.confirm({
            	title: "<strong>Thay đổi loại tài khoản!</strong>",
				message: confirmMessage,
				buttons: {
			        cancel: {
			            label: '<i class="fa fa-times"></i> Hủy'
			        },
			        confirm: {
			            label: '<i class="fa fa-check"></i> Đồng ý'
			        }
			    },
                callback: function(result) {
                    if (! result) return;
                    var url = BASE_URL + "/account/change-account-type?" + "accountNo=" + _changeAccountType.obj.accountNo+"&type="+ _changeAccountType.type;
                    console.log('change account type with url: ' + url);
                    var self = this;
                    $.ajax({
                        url: url,
                        async: true,
                        type: 'GET'
                    }).done(function(data) {
                        console.log(data);
                        if(data === null || data === '' || data.error) _notifyForUser.error("Thực hiên  thất bại!");
                        else _notifyForUser.ok("Thay đổi loại tài khoản thành công!");
                        _notifyForUser.show();
                        // self.modalEl.modal('hide');
                    }).always(function () {
                        _query.search();
                    });
                }
            });





        };

        return ChangeAccountType;
    }();


    AccountView.Table = (function () {

        function Table() {
            this.el = $('#account-table');
            this.data = [];
            this.tableEl = this.el.find('table');
        }

        Table.prototype.makeTable = function () {
            this.tableEl.children('tbody').remove();
            this.tableEl.append(this.makeBody());
        };

        Table.prototype.makeBody = function () {
            var tbody = $('<tbody>');
            $.each(this.data, function (i, o) {


                var _actionMenu = new BackendAdminPayDee.ActionMenu();
                _actionMenu.addTooltip('fa-wrench',"Thay đổi loại tài khoản", "", '#',
                    'AccountView._changeAccountType.obj=' + JSON.stringify(o) + ';AccountView._changeAccountType.confirm()');

                tbody.append($('<tr>')
                    // .append($('<td>', {"class": "text-nowrap"}).append(i + 1 + _pageCommon.number * _pageCommon.defaultSize))
                    .append($('<td>', {"class": "text-nowrap"}).append(o.partner))
                    .append($('<td>', {"class": "text-nowrap"}).append($('<a>', {'onclick': 'AccountView._changeAccountType.obj=' + JSON.stringify(o) + ';AccountView._changeAccountType.confirm()'}).append(o.accountType)))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.phone+'>'+ o.fullName+'</a>'))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.phone+'>'+ o.phone+'</a>'))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/transaction/cheque?accountNo='+o.accountNo+'>'+ o.accountNo+'</a>'))
                    .append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(o.balance))
                    .append($('<td>', {"class": "text-nowrap"}).append(_table.statusOf(o.status)))
                    // .append($('<td>', {"class": "text-nowrap"}).append())
                    // .append($('<td>', {"class": "text-nowrap"}).append($("<a target='_blank'>").attr('href', BASE_URL + '/account/cheque-detail?accountNo=' + o.accountNo + '&fromDate=&toDate=').text("Chi tiết")))
                    .append('<td id='+i+'>')
                );

            });
            return tbody;
        };

        Table.prototype.showOptionStatus = function () {
            $.each(this.data, function (i, o) {
                var _actionMenu = new BackendAdminPayDee.ActionMenu();
                var select = $("#" + i);
                var accountNo = o.accountNo + "";
                switch (o.status) {
                    case 1: {
                        _actionMenu.addTooltip('fa-lock', "Khóa", "", '#',
                            'AccountView._query.updateStatus("'+ accountNo+'", -1)');
                        _actionMenu.addTooltip('fa-unlock-alt', "Tạm Khóa","", '#',
                            'AccountView._query.updateStatus("'+ accountNo+'", 2)');
                        select.empty().append(_actionMenu.toHtml());
                        break;
                    }
                    case 2:{
                        _actionMenu.addTooltip('fa-lock', "Khóa","", '#',
                            'AccountView._query.updateStatus('+ accountNo+', -1)');
                        _actionMenu.addTooltip('fa-unlock', "Hoạt động", "", '#',
                            'AccountView._query.updateStatus("'+ accountNo+'", 1)');
                        select.empty().append(_actionMenu.toHtml());
                        break;
                    }
                }
            });


        };

        Table.prototype.statusOf = function (status) {

            switch (status) {
                case 2:
                    return "Tạm khóa";
                case 1:
                    return "Hoạt động";
                case 0:
                    return "Chờ kích hoạt";
                case -1:
                    return "Khóa";
                default:
                    return "";
            }

        };

        return Table;
    })();



    AccountView.Page = (function () {

        function Page() {
            this.paginationEl = _table.el.find('ul.pagination');
        }

        Page.prototype.loadData = function () {
            var url = BASE_URL + "/account/list";
            console.log("Page load data with url: " + url);
            var self = this;
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(_query.request),
                dataType: "json"
            }).done(function (data) {
                console.log(data);
                _pageCommon.number = data.pageNumber;
                _pageCommon.total = data.pagesAvailable;
                _pageCommon.list = _pageCommon.calculatePage(data.pageNumber, data.pagesAvailable);
                _table.data = data.pageItems;
                _table.makeTable();
                _table.showOptionStatus();
                _pageCommon.pagination(self.paginationEl, AccountView._query);
            }).fail(function () {
                console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm tài khoản Ví!");
                _notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm tài khoản Ví!');
                _notifyForUser.show();
            }).always(function () {
                // _query.handlerUpdateStatus();
                console.log("Complete Call Ajax: Search Account!");
            });
        };

        return Page;
    })();

    _query = new AccountView.Query();
    _table = new AccountView.Table();
    _page = new AccountView.Page();
    _changeAccountType = new AccountView.ChangeAccountType();

    AccountView._query = _query;
    AccountView._changeAccountType = _changeAccountType;

    _query.search();

}).call(this);