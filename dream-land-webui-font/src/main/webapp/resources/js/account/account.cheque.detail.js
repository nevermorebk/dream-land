(function (){

    var ChequeDetail, _query, _page, _table;

    var _datepicker = BackendAdminPayDee._datepicker;
    var _notifyForUser = BackendAdminPayDee._notifyForUser;
    var _currency = BackendAdminPayDee._currency;
    var _pageCommon = BackendAdminPayDee._page;
    var _transactionType = TransactionCommon._type;

    _datepicker.init('fromDate');
    _datepicker.init('toDate');

    ChequeDetail = window.ChequeDetail = {};

    ChequeDetail.Query = (function() {
        function Query() {
            this.fromDate = $('input[name="fromDate"]');
            this.toDate = $('input[name="toDate"]');
            this.btnExport = $('button[id="export-cheque-detail"]');
            this.btnSearch = $('button[id="search"]');

            this.btnExport.bind('click', {context: this}, function(e) {
                _pageCommon.resetNumber();
                e.data.context.exportData();
            });

            this.btnSearch.bind('click', {context: this}, function(e) {
                _pageCommon.resetNumber();
                e.data.context.search();
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
                keyword: $("#accountNo").text(),
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

    ChequeDetail.Table = (function() {

        function Table() {
            this.el = $('#cheque-detail-table');
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
                    .append($('<td>', {"class": "text-nowrap"}).append(i + 1 + _pageCommon.number * _pageCommon.defaultSize))
                    .append($('<td>', {"class": "text-nowrap"}).append(o.requestTime))
                    .append($('<td>', {"class": "text-nowrap"}).append(o.transactionId))
                    .append($('<td>', {"class": "text-nowrap"}).append(_transactionType.toText(o.transactionType)))
                    .append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.amount)))
                    .append($('<td align=\'right\'>', {"class": "text-nowrap"}).append(_currency.formatCurrency(o.afterBalance)))
                );
            });
            return tbody;
        };

        return Table;
    })();

    ChequeDetail.Page = (function() {

        function Page() {
            this.paginationEl = _table.el.find('ul.pagination');
        }

        Page.prototype.loadData = function() {
            var url = BASE_URL + "/transaction/cheque";
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
                _pageCommon.pagination(_page.paginationEl, ChequeDetail._query);
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

    _query = new ChequeDetail.Query();
    _table = new ChequeDetail.Table();
    _page = new ChequeDetail.Page();

    ChequeDetail._query = _query;

    _query.search();


}).call(this);