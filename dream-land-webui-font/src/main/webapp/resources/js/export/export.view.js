(function (){
	var ExportView, _page, _table, _query;
	ExportView = window.ExportView = {};

	var _menu = BackendAdminPayDee._menu;
	_menu.activeMenu('export-menu');

	var _pageCommon = BackendAdminPayDee._page;

	var _file = Export._file;

	ExportView.Query = (function() {
		function Query() {}

		Query.prototype.search = function() {
			var pageNumber = (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1);
			console.log("---> Query search pageNumber: " + pageNumber);
			_page.loadData(pageNumber);
		};
		
		return Query;
	})();

	ExportView.Table = (function() {

		function Table() {
			this.el = $('#exported-file-table');
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
				_actionMenu.addMenu('fa-remove', "Xóa", '#', 'Export._file.deleteFile("' + o.name+ '")');
				tbody.append($('<tr>')
						.append($('<td>', {"class": "text-nowrap"}).append(i + 1 + _pageCommon.number * _pageCommon.defaultSize))
						.append($('<td>', {"class": "text-nowrap"}).append($('<a>', {"href": "#download", 'onclick': 'Export._file.download("' + o.name+ '")'}).append(o.name)))
						.append($('<td>', {"class": "text-nowrap"}).append(o.lengthValue))
						.append($('<td>', {"class": "text-nowrap"}).append(o.createdDate))
						.append($('<td>').append(_actionMenu.toHtml()))
				);
			});
			return tbody;
		};

		return Table;
	})();

	ExportView.Page = (function() {

		function Page() {
			this.paginationEl = _table.el.find('ul.pagination');
		}

		Page.prototype.loadData = function(pageNumber) {
			var data = _file.list(pageNumber);
			console.log(data);
			_pageCommon.number = data.pageNumber;
			_pageCommon.total = data.pagesAvailable;
			_pageCommon.list = _pageCommon.calculatePage(data.pageNumber, data.pagesAvailable);
			_table.data = data.pageItems;
			_table.makeTable();
			_pageCommon.pagination(_page.paginationEl, ExportView._query);
		};

		return Page;
	})();

	_table = new ExportView.Table();
	_page = new ExportView.Page();
	_query = new ExportView.Query();

	ExportView._query = _query;
	_query.search();

}).call(this);