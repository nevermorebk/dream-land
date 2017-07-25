(function() {
	var TransactionCommon, _status, _provider, _issuer, _product, _type;
	
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _currency = BackendAdminPayDee._currency;
	
	TransactionCommon = window.TransactionCommon = {};

	
	TransactionCommon.Status = (function() {

		function Status() {
			this.current = undefined;
			this.statusEl = $('select[name="status"]');
			this.statusEl.on("select2:select", function (e) {
				_status.current = _status.statusEl.val();
				console.log(_status);
			});
			// Chỉ những màn hình nào cần dùng thì lúc đó mới gọi khởi tạo, 
			// Nếu khởi tạo luôn tại đây thì những màn hình không cần element này sẽ bị lỗi vì không tìm thấy phần tử Select.
			// this.init();
		}

		Status.prototype.init = function() {
			var data = [
				{ id: -1, text: 'Trạng thái' },
				{ id: 0, text: 'Nghi vấn' }, 
				{ id: 1, text: 'Thành công' }, 
				{ id: 2, text: 'Thất bại' },
                { id: 4, text: 'Đã hoàn tiền' }
			];
			this.statusEl.select2({
				data: data
			});
			this.current = this.statusEl.select2('data')[0].id;
		}
		
		Status.prototype.toText = function(status) {
			switch(status){
		    case 0: return "Nghi vấn";
		    case 1: return "Thành công";
		    case 2: return "Thất bại";
		    case 4: return "Đã hoàn tiền";
		    default: return "";
		    }
		}

		return Status;
	})();
	
	TransactionCommon.Type = (function() {

		function Type() {
			this.current = undefined;
			this.originalTransTypeEl = $('select[name="originalTransType"]');
			this.originalTransTypeEl.on ("select2:select", function(e) {
				_type.current = _type.originalTransTypeEl.val();
				console.log(_type);
			});
		}
		
		Type.prototype.init = function(){
			var self = this;
			self.originalTransTypeEl.append($('<option>', {"value": 100, "text": "Chuyển tiền"}));
			self.originalTransTypeEl.append($('<option>', {"value": 101, "text": "Đổi thẻ cào"}));
			self.originalTransTypeEl.append($('<option>', {"value": 102, "text": "Mua thẻ điện thoại"}));
			self.originalTransTypeEl.append($('<option>', {"value": 103, "text": "Nạp tiền điện thoại"}));
			self.originalTransTypeEl.append($('<option>', {"value": 104, "text": "Nạp tiền từ bank"}));
			self.originalTransTypeEl.append($('<option>', {"value": 105, "text": "Nộp tiền mặt"}));
			self.originalTransTypeEl.append($('<option>', {"value": 106, "text": "Rút tiền qua TK Đại lý"}));
			self.originalTransTypeEl.append($('<option>', {"value": 107, "text": "Mua thẻ game"}));
			self.originalTransTypeEl.append($('<option>', {"value": 108, "text": "Nạp tài khoản game"}));
			self.originalTransTypeEl.append($('<option>', {"value": 109, "text": "Bù trừ GQKN"}));
			self.originalTransTypeEl.append($('<option>', {"value": 110, "text": "Chuyển khoản"}));
			self.originalTransTypeEl.select2();
			//self.current = self.partnerEl.select2('data')[0].id;
		}
		
		Type.prototype.toText = function(type) {
			if(typeof type === 'string') {
				type = parseInt(type);
			}
			switch(type){
		    case 100: return "Chuyển tiền";
		    case 101: return "Đổi thẻ cào";
		    case 102: return "Mua thẻ điện thoại";
		    case 103: return "Nạp tiền điện thoại";
		    case 104: return "Nạp tiền từ bank";
		    case 105: return "Nộp tiền mặt";
		    case 106: return "Rút tiền qua TK Đại lý";
		    case 107: return "Mua thẻ game";
		    case 108: return "Nạp tài khoản game";
		    case 109: return "Bù trừ GQKN";
		    case 110: return "Chuyển khoản";
		    default: return "";
		    }
		}

		return Type;
	})();
	
	TransactionCommon.Provider = (function() {
		
		function Provier() {
			this.current = undefined;
			this.providerEl = $('select[name="provider"]');
			this.providerEl.on("select2:select", function (e) {
				_provider.current = _provider.providerEl.val();
				console.log(_provider);
			});
			// this.init();
		}
		
		Provier.prototype.init = function() {
			// Hiện tại chưa lưu Provider trong DB, nên fix dữ liệu tạm.
			var data = [
				{ id: 'EPAY', text: 'EPAY' }, 
				{ id: 'VTC', text: 'VTC' }, 
				{ id: 'VINA', text: 'VINA' }
			];
			this.providerEl.select2({
				data: data
			});
			this.current = this.providerEl.select2('data')[0].id;
			// Sau này sẽ gọi Ajax lấy Data trong DB.
		}
		
		return Provier;
	})();
	
	TransactionCommon.Issuer = (function() {
		
		function Issuer() {
			this.list = [];
			this.current = undefined;
			this.issuerEl = $('select[name="issuer"]');
			this.issuerEl.on("select2:select", function() {
				_issuer.current = _issuer.issuerEl.val();
				var name = _issuer.issuerEl.find("option:selected").text();
				console.log(_issuer);
				//_issuer.current == '-1' ? _product.init() : _product.loadBy(_issuer.current);
				if (_issuer.current == '-1') {
					_product.init();
//					_notifyForUser.ok('Danh sách mệnh giá thẻ được thay đổi về mặc định!');
//					_notifyForUser.show();
				} else {
					_product.loadBy(_issuer.current);
//					_notifyForUser.ok('Danh sách mệnh giá thẻ được thay đổi ứng với thẻ <strong>' + name + '</strong>!');
//					_notifyForUser.show();
				}
			});
			// this.init();
		}
		
		Issuer.prototype.init = function() {
			var url = BASE_URL + "/issuer/find-all";
			var self = this;
			$.ajax({
				async: true,
				url: url,
				method: "GET",
				dataType: "json"
			}).done(function(data) {
				console.log(data);
				self.list = data;
				$.each(data, function(idx, obj) {
					var option = $('<option>', {"value": obj.issuerCode, "text": obj.name});
					self.issuerEl.append(option);
				});
				self.issuerEl.select2();
				self.current = self.issuerEl.select2('data')[0].id;
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi lấy danh sách loại thẻ!");
//				_notifyForUser.error('Đã xảy ra lỗi khi lấy danh sách loại thẻ!');
//				_notifyForUser.show();
				return;
			}).always(function() {
				console.log("Complete Call Ajax: Find all issuer!" );
			});
		}
		
		Issuer.prototype.get = function(code) {
			var issuer = undefined;
			var self = this;
			$.each(self.list, function(idx, obj) {
				if(obj.issuerCode != code) return true;
				issuer = obj;
				return false;
			});
			return issuer;
		}
		
		return Issuer;
	})();
	
	TransactionCommon.Product = (function() {
		
		function Product() {
			this.current = undefined;
			this.productEl = $('select[name="product"]');
			this.productEl.on("select2:select", function() {
				_product.current = _product.productEl.val();
				console.log(_product);
			});
			// this.init();
		}
		
		Product.prototype.init = function() {
			var url = BASE_URL + "/product/find-all";
			var self = this;
			$.ajax({
				async: true,
				url: url,
				method: "GET",
				dataType: "json"
			}).done(function(data) {
				console.log(data);
				var beforeDenominations = [];
				$.each(data, function(idx, obj) {
					beforeDenominations.push(obj.denomination);
				});
				console.log(beforeDenominations);
				var afterDenominations = self.eliminateDuplicates(beforeDenominations);
				console.log(afterDenominations);
				self.productEl
					.find('option')
					.remove()
					.end()
		    		.append('<option value="-1">Mệnh giá</option>')
		    		.val('-1');
				for (var i = 0; i < afterDenominations.length; i++) {
					var option = $('<option>', {"value": afterDenominations[i], "text": _currency.formatCurrency(afterDenominations[i])});
					self.productEl.append(option);
				}
				self.productEl.select2();
				self.current = self.productEl.select2('data')[0].id;
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi lấy danh sách mệnh giá thẻ mặc đinh!");
				/*_notifyForUser.error('Đã xảy ra lỗi khi lấy danh sách mệnh giá thẻ mặc đinh!');
				_notifyForUser.show();*/
				return;
			}).always(function() {
				console.log("Complete Call Ajax: Find all product!" );
			});
		}
		
		Product.prototype.eliminateDuplicates = function(arr) {
			var i,
	  			len = arr.length,
	  			out = [],
	  			obj = {};
			for(i = 0; i < len; i++) {
				obj[arr[i]] = 0;
			}
			for(i in obj) {
				out.push(i);
			}
			return out;
		}
		
		Product.prototype.loadBy = function(code) {
			var url = BASE_URL + "/product/find-by-issuer?issuerCode=" + code;
			var self = this;
			$.ajax({
				async: true,
				url: url,
				method: "GET",
				dataType: "json"
			}).done(function(data) {
				console.log(data);
				$("select#amount option").remove();
				self.productEl
					.find('option')
					.remove()
					.end()
		    		.append('<option value="-1">Mệnh giá</option>')
		    		.val('-1');
				$.each(data, function(idx, obj) {
					var option = $('<option>', {"value": obj.denomination, "text": _currency.formatCurrency(obj.denomination)});
					self.productEl.append(option);
				});
				self.productEl.select2();
				self.current = self.productEl.select2('data')[0].id;
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi lấy danh sách mệnh giá của thẻ!");
				/*_notifyForUser.error('Đã xảy ra lỗi khi lấy danh sách mệnh giá của thẻ!');
				_notifyForUser.show();*/
				return;
			}).always(function() {
				console.log("Complete Call Ajax: Find product by issuer!" );
			});
		}
		
		return Product;
	})();
	
	_status = new TransactionCommon.Status();
	_provider = new TransactionCommon.Provider();
	_issuer = new TransactionCommon.Issuer();
	_product = new TransactionCommon.Product();
	_type = new TransactionCommon.Type();
	
	TransactionCommon._status = _status;
	TransactionCommon._provider = _provider;
	TransactionCommon._issuer = _issuer;
	TransactionCommon._product = _product;
	TransactionCommon._type = _type;
	
}).call(this);