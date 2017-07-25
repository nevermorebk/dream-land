(function () {
    var BalanceView, _query, _table, _page;

    var _menu = BackendAdminPayDee._menu;
    var _datepicker = BackendAdminPayDee._datepicker;
    var _notifyForUser = BackendAdminPayDee._notifyForUser;
    var _currency = BackendAdminPayDee._currency;
    var _pageCommon = BackendAdminPayDee._page;
    var _partner = BackendAdminPayDee._partner;

    _menu.activeMenu('balance-menu');
    _datepicker.init('fromDate');
    _datepicker.init('toDate');
    _partner.init();

    BalanceView = window.BalanceView = {};

    BalanceView.Query = (function () {

        function Query() {
            this.fromDate = $('input[name="fromDate"]');
            this.toDate = $('input[name="toDate"]');
            this.keyword = $('input[name="keyword"]');

            this.btnSearch = $('button[id="view-balance"]');
            this.btnExport = $('button[id="export-balance"]');
            this.btnReset = $('button[id="reset-balance"]');

            this.btnSearch.bind('click', {context: this}, function (e) {
                _pageCommon.resetNumber();
                e.data.context.search();
            });

            this.btnExport.bind('click', {context: this}, function (e) {
                _pageCommon.resetNumber();
                e.data.context.exportData();
            });

            this.btnReset.bind('click', {context: this}, function(e) {
                e.data.context.reset();
            });
        }

        Query.prototype.validateRequest = function() {
            return _datepicker.validateDuration(_query.fromDate.val(), _query.toDate.val());
        };

        Query.prototype.makeRequest = function() {
            _query.request = {
                fromDate: _query.fromDate.val(),
                toDate: _query.toDate.val(),
                partnerName: (_partner.current === undefined || _partner.current < 0) ? "" : _partner.current,
                keyword: _query.keyword.val() === null ? "" : _query.keyword.val(),
                pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
                pageSize: _pageCommon.defaultSize
            };
        };

        Query.prototype.search = function () {
            if(!_query.validateRequest()) return;
            _query.makeRequest();
            _page.loadData();
        };

        Query.prototype.exportData = function () {
            if(!_query.validateRequest()) return;
            _query.makeRequest();
            var url = BASE_URL + "/account/export-balance";
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
            _partner.partnerEl.val("").trigger('change.select2');
        };

        return Query;

    })();

    BalanceView.Table = (function () {

        function Table() {
            this.el = $('#balance-table');
            this.data = [];
            this.tableEl = this.el.find('table');
            
            this.tableEl.delegate('tbody tr', 'click', function() {
                var accountNo = $(this).data("accountno");
                var fromDate = _query.fromDate.val();
                var toDate = _query.toDate.val();
                var url = BASE_URL + '/account/cheque-detail?accountNo=' + accountNo + '&fromDate=' + fromDate + '&toDate=' + toDate;
                window.location.href = url;
            });
        }

        Table.prototype.makeTable = function () {
            this.tableEl.children('tbody').remove();
            this.tableEl.append(this.makeBody());
        };

        Table.prototype.makeBody = function () {
            var tbody = $('<tbody>');
            $.each(this.data, function(i, o) {
                tbody.append($('<tr>').attr("data-accountNo", o.paydAccountNo)
                    // .append($('<td>', {"class": "text-nowrap"}).append(i + 1 + _pageCommon.number * _pageCommon.defaultSize))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/transaction/cheque?accountNo='+o.paydAccountNo+'>'+ o.paydAccountNo+'</a>'))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.phone+'>'+ o.customer+'</a>'))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.phone+'>'+ o.phone+'</a>'))
                    .append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.openningBalance)))
                    .append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.increase)))
                    .append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.decrease)))
                    .append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.closingBalance)))
                );
            });
            return tbody;
        };
        return Table;

    })();

    BalanceView.Page = (function () {
        function Page() {
            this.paginationEl = _table.el.find('ul.pagination');
        }

        Page.prototype.loadData = function() {
            var url = BASE_URL + "/account/balance";
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
                _pageCommon.number = data.balanceRowPage.pageNumber;
                _pageCommon.total = data.balanceRowPage.pagesAvailable;
                _pageCommon.list = _pageCommon.calculatePage(data.balanceRowPage.pageNumber, data.balanceRowPage.pagesAvailable);
                _table.data = data.balanceRowPage.pageItems;
                _table.makeTable();
                $("#increase").text(_currency.formatCurrency(data.increase));
                $("#decrease").text(_currency.formatCurrency(data.decrease));
                $("#sumOpen").text(_currency.formatCurrency(data.sumOpenningBalance));
                $("#sumClose").text(_currency.formatCurrency(data.sumClosingBalance));
                $("#totalAccount").text(_currency.formatCurrency(data.totalAccount));
                _pageCommon.pagination(self.paginationEl, BalanceView._query);
            }).fail(function() {
                console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm số dư tài khoản!");
                _notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm số dư tài khoản!');
                _notifyForUser.show();
            }).always(function() {
                console.log("Complete Call Ajax: Search Balance!" );
            });
        };

        return Page;
    })();

    _query = new BalanceView.Query();
    _table = new BalanceView.Table();
    _page = new BalanceView.Page();

    BalanceView._query = _query;
    _query.search();

}).call(this);

