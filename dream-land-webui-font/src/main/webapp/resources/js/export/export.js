(function() {
	var Export, _file;

	Export = window.Export = {};
	
	var _notifyForUser = BackendAdminPayDee._notifyForUser;

	Export.File = (function() {

		function File() {}

		File.prototype.list = function(pageNumber) {
			var url = BASE_URL + "/export/list?page=" + pageNumber;
			var dataExport = undefined;
			$.ajax({
				async: false,
				url: url,
				method: "GET",
			}).done(function(data) {
				console.log(data);
				dataExport = data;
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi lấy danh sách đã xuất!");
				return;
			}).always(function() {
				console.log("Complete Call Ajax: Find all exported file!" );
			});
			return dataExport;
		};
		
		File.prototype.download = function(file) {
			console.log("download file: " + file);
			var url = BASE_URL + "/export/download?file="+ file;
			console.log("Export download data with url: " + url);
			window.location.href = url;
		};
		
		File.prototype.deleteFile = function(file) {
			var url = BASE_URL + "/export/delete?file="+ file;
			jQuery.ajax({
				type : "GET",
				url : url,
				success : function(response) {
					console.log("response: " + response);
					_notifyForUser.ok('Xóa file: ' + file + ', thành công!');
					_notifyForUser.show();
					/*setTimeout(function() {
						window.location.reload(true);
					}, 3 * 1000);*/
				},
				error : function(e) {
					_notifyForUser.ok('Xóa file: ' + file + ', thất bại!');
					_notifyForUser.show();
				}
			});
		};
		
		return File;
	})();
	
	_file = new Export.File();
	Export._file = _file;

}).call(this);