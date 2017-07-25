(function () {
    var WithdrawView, _bank, _query, _table, _page, _status;

    var _menu = BackendAdminPayDee._menu;
    var _datepicker = BackendAdminPayDee._datepicker;
    var _notifyForUser = BackendAdminPayDee._notifyForUser;
    var _currency = BackendAdminPayDee._currency;
    var _pageCommon = BackendAdminPayDee._page;
    var _partner = BackendAdminPayDee._partner;

    // var _status = TransactionCommon._status;

    _menu.activeMenu('withdraw-menu');

    _datepicker.init('fromDate');
    _datepicker.init('toDate');

    _partner.init();



    WithdrawView = window.WithdrawView = {};

    WithdrawView.Status = (function() {

        function Status() {
            this.current = undefined;
            this.statusEl = $('select[name="status"]');
            this.statusEl.on("select2:select", function (e) {
                _status.current = _status.statusEl.val();
                console.log(_status);
            });
            // Chỉ những màn hình nào cần dùng thì lúc đó mới gọi khởi tạo,
            // Nếu khởi tạo luôn tại đây thì những màn hình không cần element này sẽ bị lỗi vì không tìm thấy phần tử Select.
            this.init();
        }

        Status.prototype.init = function() {
            var data = [
                { id: -1, text: 'Trạng thái' },
                { id: 0, text: 'Khởi tạo' },
                { id: 1, text: 'Hệ thống hủy' },
                { id: 2, text: 'Timeout X' },
                { id: 3, text: 'Xử lý' },
                { id: 4, text: 'Thành công' },
                { id: 5, text: 'Đại lý hủy' },
                { id: 6, text: 'Timeout Y' }
            ];
            this.statusEl.select2({
                data: data
            });
            this.current = this.statusEl.select2('data')[0].id;
        }

        Status.prototype.toText = function(status) {
            switch(status){
                case 0: return "Khởi tạo";
                case 1: return "Hệ thống hủy";
                case 2: return "Timeout X";
                case 3: return "Xử lý";
                case 4: return "Thành công";
                case 5: return "Đại lý hủy";
                case 6: return "Timeout Y";
                default: return "";
            }
        }

        return Status;
    })();

    WithdrawView.Bank = (function() {

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

    WithdrawView.Query = (function() {

        function Query() {
            this.fromDate = $('input[name="fromDate"]');
            this.toDate = $('input[name="toDate"]');
            this.transactionIdEl = $('input[name="transactionId"]');
            this.paydAccountNoEl = $('input[name="accountNo"]');
            this.bankAccountNoEl = $('input[name="bankAccountNo"]');

            this.btnSearch = $('button[name="search-withdraw"]');
            this.btnExcel = $('button[name="to-excel-withdraw"]');
            this.btnReset =  $('button[name="reset-withdraw"]');

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
            console.log(_bank.current);
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
                    _notifyForUser.error("Thực hiên xuất giao dịch rút tiền Đại lý thất bại!");
                } else {
                    _notifyForUser.ok("Thực hiên xuất giao dịch rút tiền Đại lý thành công!");
                }
                _notifyForUser.show();
            }).fail(function(data) {
                console.log(data);
                console.log("Đã xảy ra lỗi khi thực hiện xuất giao dịch rút tiền Đại lý!");
                _notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất giao dịch rút tiền Đại lý!');
                _notifyForUser.show();
            }).always(function() {
                console.log("Complete Call Ajax: Export Deposit Telco!" );
            });
        };

        return Query;
    })();

    WithdrawView.Table = (function() {

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
                // var tooltip = "<b>- To Partner:</b> " + obj.responseToPartner;
                var accountDetail = "<strong>" + obj.fullName + "</strong><br/>" + obj.phoneNumber + "<br/><strong>" + obj.paydAccountNo + "</strong>";
                tbody.append($('<tr>')
                    // .append($('<td>', {"class": "text-nowrap"}).append(idx + 1 + _pageCommon.number * _pageCommon.defaultSize))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.transactionId))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.withdrawTime))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.partner))
                        .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+obj.customerPhone+'>'+ obj.customerName+'<br/>'+ obj.customerPhone+ '</a>'))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.customerAccountNo))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.bankName))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.bankAccountNo + '<br/>' + obj.bankAccountName + '<br/>'+ obj.branchName))
                        .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+obj.agentPhone+'>'+ obj.agentName+'<br/>'+ obj.agentPhone+ '</a>'))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.agentAccountNo))
                        .append($('<td>', {"class": "text-nowrap"}).append(_currency.formatCurrency(obj.amount)))
                        .append($('<td>', {"class": "text-nowrap"}).append(_status.toText(obj.status)))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.timeoutX))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.created))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.timeoutY))
                        .append($('<td>', {"class": "text-nowrap"}).append(obj.modified))
                        .append($('<td>', {"class": "text-nowrap"}).append()))

            });
            return tbody;
        };

        return Table;
    })();

    WithdrawView.Page = (function() {

        function Page() {
            this.paginationEl = _table.el.find('ul.pagination');
        }

        Page.prototype.loadData = function() {
            var url = BASE_URL + "/transaction/withdraw";
            console.log("JSON Request: " + JSON.stringify(_query.request));
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
                _pageCommon.pagination(self.paginationEl, WithdrawView._query);
            }).fail(function() {
                console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch rút tiền Đại lý!");
                _notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm Giao dịch rút tiền Đại lý!');
                _notifyForUser.show();
            }).always(function() {
                console.log("Complete Call Ajax: Search Deposit!" );
            });
        };

        return Page;
    })();



    _bank = new WithdrawView.Bank();
    _query = new WithdrawView.Query();
    _table = new WithdrawView.Table();
    _page = new WithdrawView.Page();
    _status = new WithdrawView.Status();

    // _status.init();

    WithdrawView._query = _query;
    _query.search();

}).call(this);