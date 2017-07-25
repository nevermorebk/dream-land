(function() {
	var AccountCommon, _type, _status;

	AccountCommon = window.AccountCommon = {};

	AccountCommon.Type = (function() {
		function Type() {
			this.all = -1;
			this.partner = 0;
			this.agent = 1;
			this.buyer = 2;

			this.textAll = 'Loại tài khoản';
			this.textPartner = 'Partner';
			this.textAgent = 'Agent';
			this.textBuyer = 'Buyer';

			this.current = undefined;
			this.accountTypeEl = $('select[name="accountType"]');
			this.accountTypeEl.on("select2:select", function () {
				_type.current = _type.accountTypeEl.val();
				console.log(_type);
			});
		}

		Type.prototype.init = function() {
			var data = [
				{ id: _type.all, text: _type.textAll },
				{ id: _type.partner, text: _type.textPartner }, 
				{ id: _type.agent, text: _type.textAgent }, 
				{ id: _type.buyer, text: _type.textBuyer }
				];
			this.accountTypeEl.select2({
				data: data
			});
			this.current = this.accountTypeEl.select2('data')[0].id;
		};

		Type.prototype.toText = function(type) {
			if(typeof type === 'string') {
				type = parseInt(type);
			}
			switch(type){
			case _type.partner: return _type.textPartner;
			case _type.agent: return _type.textAgent;
			case _type.buyer: return _type.textBuyer;
			default: return "";
			}
		};
		return Type;

	})();

	AccountCommon.Status = (function() {
		function Status() {
			this.blocked = -1;
			this.waiting = 0;
			this.active = 1;
			this.inactive = 2;
			
			this.textBlocked = "Đang khóa";
			this.textWaiting = "Chưa kích hoạt";
			this.textActive = "Đang hoạt động";
			this.textInActive = "Vô hiệu hóa";
		}

		Status.prototype.toText = function(status) {
			if(typeof type === 'string') {
				status = parseInt(status);
			}
			switch(status){
			case _status.blocked: return _status.textBlocked;
			case _status.waiting: return _status.textWaiting;
			case _status.active: return _status.textActive;
			case _status.inactive: return _status.textInActive;
			default: return "";
			}
		};
		return Status;

	})();

	_type = new AccountCommon.Type();
	_status = new AccountCommon.Status();

	AccountCommon._type = _type;
	AccountCommon._status = _status;
}).call(this);