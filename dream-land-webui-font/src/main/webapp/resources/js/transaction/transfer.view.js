(function () {

    var TransferView, _query, _page, _table;

    var _menu = BackendAdminPayDee._menu;
    var _datepicker = BackendAdminPayDee._datepicker;
    var _notifyForUser = BackendAdminPayDee._notifyForUser;
    var _currency = BackendAdminPayDee._currency;
    var _partner = BackendAdminPayDee._partner;
    var _pageCommon = BackendAdminPayDee._page;

    _menu.activeMenu('transfer-menu');
    _datepicker.init('fromDate');
    _datepicker.init('toDate');
    _partner.init();

    TransferView = window.TransferView = {};

    TransferView.Query = (function () {
        function Query() {
            this.fromDate = $('input[name="fromDate"]');
            this.toDate = $('input[name="toDate"]');
            this.transactionId = $('input[name="transactionId"]');
            this.sourceAccountNo = $('input[name="sourceAccountNo"]');
            this.targetAccountNo = $('input[name="targetAccountNo"]');

            this.btnSearch = $('button[id="search-transfer"]');
            this.btnExport = $('button[id="to-excel-transfer"]');
            this.btnReset = $('button[id="reset-transfer"]');

            this.btnSearch.bind('click', {context: this}, function (e) {
                _pageCommon.resetNumber();
                e.data.context.search();
            });

            this.btnExport.on('click', {context: this}, function (e) {
                e.data.context.exportData();
            });

            this.btnReset.on('click', {context: this}, function (e) {
                e.data.context.reset();
            });
        }

        Query.prototype.validateRequest = function () {
            return _datepicker.validateDuration(_query.fromDate.val(), _query.toDate.val());
        };

        Query.prototype.makeRequest = function () {
            _query.request = {
                fromDate: _query.fromDate.val(),
                toDate: _query.toDate.val(),
                transactionId: _query.transactionId.val(),
                partnerName: _partner.current < 0 ? null : _partner.current,
                sourceAccountNo: _query.sourceAccountNo.val(),
                targetAccountNo: _query.targetAccountNo.val(),
                pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
                pageSize: _pageCommon.defaultSize
            };
        };

        Query.prototype.search = function () {
            if (!_query.validateRequest()) return;
            _query.makeRequest();
            _page.loadData(_query.request);
        };

        Query.prototype.exportData = function () {
            if (!_query.validateRequest()) return;
            _query.makeRequest();

            var url = BASE_URL + "/transaction/export-transfer";
            console.log("export transfer with url: " + url);
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(_query.request)
            }).done(function (data) {
                console.log(data);
                if (data === null || data === '' || data !== 'done') {
                    _notifyForUser.error("Thực hiên xuất giao dịch chuyển tiền thất bại!");
                } else {
                    _notifyForUser.ok("Thực hiên xuất giao dịch chuyển tiền thành công!");
                }
                _notifyForUser.show();
            }).fail(function (data) {
                console.log(data);
                console.log("Đã xảy ra lỗi khi thực hiện xuất giao dịch chuyển tiền!");
                _notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất giao dịch chuyển tiền!');
                _notifyForUser.show();
            }).always(function () {
                console.log("Complete Call Ajax: Export Transfer!");
            });
        };

        Query.prototype.reset = function () {
            $('#fromDate').val('');
            $('#toDate').val('');
            $('#transactionId').val('');
            $('#sourceAccountNo').val('');
            $('#targetAccountNo').val('');
            _partner.partnerEl.val("-1").trigger('change.select2');

            _partner.current = -1;
        };

        return Query;
    })();

    TransferView.Table = (function () {

        function Table() {
            this.tableEl = $('#transferTable');
            this.data = [];
        }

        Table.prototype.makeTable = function () {
            this.tableEl.children('tbody').remove();
            this.tableEl.append(this.makeBody());
        };

        Table.prototype.makeBody = function () {
            var tbody = $('<tbody>');
            $.each(this.data, function (i, o) {
                // var sourceAccountDetail = '<b>' + o.sourceFullName + '</b>' + '<br>' + o.sourcePhone + '<br>' + '<b>' + o.sourceAccNo + '</b>';
                // var targetAccountDetail = '<b>' + o.targetFullName + '</b>' + '<br>' + o.targetPhone + '<br>' + '<b>' + o.targetAccNo + '</b>';
                var amount = (o.amount + "").replace("-", "");
                var tooltip = "<b>Nội dung:</b> " + o.description;
                tbody.append($('<tr>')
                    // .append($('<td>', {"class": "text-nowrap"}).append(i + 1 + _pageCommon.number * _pageCommon.defaultSize))
                    .append($('<td align=\'left\'>', {"class": "text-nowrap"}).append(o.id))
                    .append($('<td align=\'left\'>', {"class": "text-nowrap"}).append(o.completeTime))
                    .append($('<td align=\'left\'>', {"class": "text-nowrap"}).append(o.partnerName))
                    // .append($('<td align=\'left\'>', {"class": "text-nowrap"}).append(o.sourceFullName))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.sourcePhone+'>'+ o.sourceFullName+'<br/>'+ o.sourcePhone+'</a>'))
                    // .append($('<td align=\'left\'>', {"class": "text-nowrap"}).append(o.sourcePhone))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/transaction/cheque?accountNo='+o.sourceAccNo+'>'+ o.sourceAccNo+'</a>' + '<br/>' + o.sourceAccType))
                    // .append($('<td align=\'left\'>', {"class": "text-nowrap"}).append(o.sourceAccNo))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/user/view?phone='+o.targetPhone+'>'+ o.targetFullName+'<br/>'+ o.targetPhone+'</a>'))
                    .append($('<td>', {"class": "text-nowrap"}).append('<a href='+ BASE_URL+'/transaction/cheque?accountNo='+o.targetAccNo+'>'+ o.targetAccNo+'</a>' + '<br/>' + o.targetAccType))
                    // .append($('<td align=\'left\'>', {"class": "text-nowrap"}).append(targetAccountDetail))
                    .append($('<td align=\'right\'>', {"class": "text-nowrap"}).append($('<span>', {"data-toggle": "tooltip", "data-html": "true", "data-original-title": tooltip}).append(_currency.formatCurrency(amount))))                    
                );
            });
            return tbody;
        };

        return Table;
    })();

    TransferView.Page = (function () {

        function Page() {
            // this.paginationEl = _table.el.find('ul.pagination');
            this.paginationEl = $('#pagination ul');
        }

        Page.prototype.loadData = function () {
            var url = BASE_URL + "/transaction/transfer";
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(_query.request),
                dataType: "json"
            }).done(function (data) {
                console.log(JSON.stringify(data));
                _pageCommon.number = data.pageNumber;
                _pageCommon.total = data.pagesAvailable;
                _pageCommon.list = _pageCommon.calculatePage(data.pageNumber, data.pagesAvailable);
                _table.data = data.pageItems;
                _table.makeTable();
                _pageCommon.pagination(_page.paginationEl, TransferView._query);
            }).fail(function (data) {
                console.log(JSON.stringify(data));
                console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm giao dịch chuyển tiền!");
                _notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm giao dịch chuyển tiền!');
                _notifyForUser.show();
            }).always(function () {
                console.log("Complete Call Ajax: Search Transaction Transfer!");
            });
        };

        return Page;
    })();

    _query = new TransferView.Query();
    _table = new TransferView.Table();
    _page = new TransferView.Page();

    TransferView._query = _query;
    _query.search();

}).call(this);

