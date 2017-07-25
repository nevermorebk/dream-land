(function (){

	    function blockSpecialChar(e){
	        var k;
	        document.all ? k = e.keyCode : k = e.which;
	        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	        }
	
	var ClearingView, _form;

	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _menu = BackendAdminPayDee._menu;
	var _numberToWord = BackendAdminPayDee._numberToWord;
	var _currency = BackendAdminPayDee._currency;

	var _accountType = AccountCommon._type;
	var _accountStatus = AccountCommon._status;

	ClearingView = window.ClearingView = {};

	_menu.activeMenu('clearing-menu');

	ClearingView.Form = (function() {

		function Form() {
			
			this.el = $('#form-clearing');
			this.accountNoEl = this.el.find('input[name="accountNo"]');
			this.fullNameEl = this.el.find('span#fullName');
			this.phoneEl = this.el.find('span#phone');
			this.partnerEl = this.el.find('span#partner');
			this.accountTypeEl = this.el.find('span#accountType');
			this.accountStatusEl = this.el.find('span#accountStatus');
			this.typeCashEl = this.el.find('input[type=radio][name=typeCash]');
			this.typeCashValue = undefined;
			this.amountEl = this.el.find('input[name="amount"]');
			this.textMoneyEl = this.el.find('input[name="textMoney"]');
			this.descriptionEl = this.el.find('textarea[name="description"]');
			this.btnConfirmEl = this.el.find('button[name="confirm"]');
			this.data = undefined;
			this.aReset = $('a[id="reset"]');
			
			this.accountNoEl.bind('blur', function() {
				_form.loadUser();
			});

//			this.amountEl.bind('blur', function(e) {
//			_form.convertNumberToText();
//			});

			this.amountEl.bind('keyup', function() {
				var amount = _form.amountEl.val();
				if(!amount) return;
				amount = amount.replace(/\./g,'');
				_form.amountEl.val(_currency.formatCurrency(amount));
				_form.convertNumberToText();
			});

			this.typeCashEl.bind('click', function(e) {
				_form.typeCashValue = e.target.value;
				console.log(_form.typeCashValue);
			});

			this.btnConfirmEl.bind('click', {context: this}, function(e) {
				e.data.context.confirm();
			});
			
			this.aReset.bind('click', {context: this}, function(e) {
				e.data.context.reset();
			});
		}

		Form.prototype.loadUser = function() {
			if (_form.accountNoEl.val() === undefined || _form.accountNoEl.val() === null || _form.accountNoEl.val() === ''){
				return;
			}

			var url = BASE_URL + "/user/get-by-account-no" + "/accountNo=" + _form.accountNoEl.val().replace(/\s+/g, '');
			console.log('call function load user with url: ' + url);
			$.ajax({
				url: url,
				async: true,
				type: 'GET'
			}).done(function(data) {
				console.log(data);
				if(data === null || data === '' || data.error === true) {
					_notifyForUser.error("Số tài khoản không tồn tại trong hệ thống!");
					_notifyForUser.show();
					return;
				}
				_form.data = data;
				_form.showUserInfo();
			});
		};

		Form.prototype.convertNumberToText = function() {
			console.log("call function convert number to text: " + _form.amountEl.val());
			if (_form.amountEl.val() === undefined || _form.amountEl.val() === '') {
				alert("Bạn phải nhập số tiền");
				return;
			}
			var amount = _form.amountEl.val().replace(/\./g,'');
			console.log("call function convert number to text: " + amount);
			if (amount === undefined || amount < 1) {
				alert("Số tiền phải lớn hơn 0");
				return;
			}

			var amountText = _numberToWord.convert(isNaN(amount) ? parseInt(amount) : amount);
			console.log(amountText);
			_form.textMoneyEl.val((amountText === undefined || amountText === null || amountText === '') ? "không" : amountText + " đồng");
		};

		Form.prototype.showUserInfo = function() {
			console.log(_form.data.userRecord.userProfile.fullName);
			_form.fullNameEl.text(_form.data.userRecord.userProfile.fullName);
			_form.phoneEl.text(_form.data.userRecord.user.phone);
			_form.partnerEl.text(_form.data.partnerProfile.id);
			_form.accountStatusEl.text(_accountStatus.toText(_form.data.account.status));
			_form.accountTypeEl.text(_accountType.toText(_form.data.account.accountType));
		};

		Form.prototype.toTextByTypecash = function() {
			if(_form.typeCashValue === undefined) return "";
			switch (_form.typeCashValue) {
			case "DEPOSIT":
				return "cộng tiền";
			case "WITHDRAW":
				return "trừ tiền";
			default:
				return "";
			}
		};

		Form.prototype.confirm = function() {
			if (! _form.validate()) return;
			var confirmMessage = '<h4>Bạn có chắc chắn muốn <strong>' + _form.toTextByTypecash() +  '</strong> tài khoản <strong>' + _form.accountNoEl.val() + ' </strong> này không ?</h4>';
			var self = this;
			bootbox.confirm({
				title: "<strong>Chú ý!</strong>",
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
					var request = {
							accountNo: _form.accountNoEl.val().replace(/\s+/g, ''),
							partner: _form.partnerEl.text(),
							value: _form.amountEl.val().replace(/\./g,''),
							typeCash: _form.typeCashValue,
							description:_form.descriptionEl.val()
					};
					console.log(request);
					self.perform(request);
				}
			});
		};

		Form.prototype.perform = function(request) {
			var url = BASE_URL + "/statement/add-cash";
			console.log("call function perform statement clearing with url: " + url);
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(request)
			}).done(function(data) {
				console.log(JSON.stringify(data));
				if(data.code != ErrorCode.SUCCESS){
					_notifyForUser.error("Thực hiện " + _form.toTextByTypecash() + " thất bại, " + data.message);
				} else {
					_notifyForUser.ok("Thực hiện " +_form.toTextByTypecash() + " thành công!");
				}
				_notifyForUser.showAndNotCloseAlert();
			});
		};
		
		Form.prototype.reset = function() {
			_form.accountNoEl.val('');
			_form.fullNameEl.text('');
			_form.phoneEl.text('');
			_form.partnerEl.text('');
			_form.accountStatusEl.text('');
			_form.accountTypeEl.text('');
			_form.typeCashEl.attr('checked', false);
			_form.typeCashValue = undefined;
			_form.amountEl.val('');
			_form.textMoneyEl.val('');
			_form.descriptionEl.val('');
			_notifyForUser.closeAlert();
		};
		
		Form.prototype.validate = function() {
			if (_form.accountNoEl.val() === undefined || _form.accountNoEl.val() === null || _form.accountNoEl.val() === ''){
				alert('Bạn nhập chưa số tài khoản');
				return false;
			}
			if (_form.partnerEl.text() === undefined || _form.partnerEl.text() === null || _form.partnerEl.text() === ''){
				alert('Bạn nhập chưa chọn đối tác');
				return false;
			}
			if (_form.amountEl.val() === undefined || _form.amountEl.val() === null || _form.amountEl.val() === ''){
				alert('Bạn nhập số tiền cần bù trừ');
				return false;
			}
			if (_form.typeCashValue === undefined){
				alert('Bạn chưa chọn loại bù trừ');
				return false;
			}
			return true;
			
		};

		return Form;

	})();

	_form = new ClearingView.Form();


}).call(this);