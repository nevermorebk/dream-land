(function (){

	var UserView, _status, _query, _page, _table, _form, _gender, _resetPassword;

	/*common*/
	var _datepicker = BackendAdminPayDee._datepicker;
	var _notifyForUser = BackendAdminPayDee._notifyForUser;
	var _pageCommon = BackendAdminPayDee._page;
	var _menu = BackendAdminPayDee._menu;

	UserView = window.UserView = {};

	_datepicker.init('fromDate');
	_datepicker.init('toDate');
	_menu.activeMenu('user-menu');

	UserView.Status = (function() {

		function Status() {
			this.current = undefined;
			this.statusEl = $('select[name="status"]');
			this.statusEl.on("select2:select", function () {
				_status.current = _status.statusEl.val();
				console.log(_status);
			});
			this.init();
		}
		Status.prototype.init = function() {
			var data = [
				{ id: -2, text: 'Trạng thái' },
				{ id: -1, text: 'Vô hiệu hóa' },
				{ id: 0, text: 'Chưa kích hoạt' },
				{ id: 1, text: 'Đang hoạt động' } 
				];
			this.statusEl.select2({
				data: data
			});
			this.current = this.statusEl.select2('data')[0].id;
		};
		Status.prototype.toText = function(status) {
			switch(status){
			case -1: return "Vô hiệu hóa";
			case 0: return "Chưa kích hoạt";
			case 1: return "Đang hoạt động";
			default: return "";
			}
		};
		return Status;
	})();
	
	UserView.Query = (function() {
		function Query() {
			this.fromDate = $('input[name="fromDate"]');
			this.toDate = $('input[name="toDate"]');
			this.status = $('input[name="status"]');
			this.keyword = $('input[name="keyword"]');

			this.btnSearch = $('button[name="search"]');
			this.btnExport = $('button[name="export"]');
			this.btnReset = $('button[name="reset"]');
			this.btnSearch.bind('click', {context: this}, function(e) {
				_pageCommon.resetNumber();
				e.data.context.search();
			});

			this.btnExport.bind('click', {context: this}, function(e) {
				e.data.context.exportData();
			});
			
			this.btnReset.bind('click', {context: this}, function(e) {
				_pageCommon.resetNumber();
				e.data.context.reset();
			});
		}

        Query.prototype.makeRequest = function() {
            _query.request = {
                fromDate:_query.fromDate.val(),
                toDate:_query.toDate.val(),
                status:_status.current < -1 ? null : _status.current,
                keyword:_query.keyword.val(),
                pageNumber: (_pageCommon.number < 1) ? 1 : (_pageCommon.number + 1),
                pageSize: _pageCommon.defaultSize
            };

        }

		Query.prototype.search = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			_page.loadData();

		};

        Query.prototype.validateRequest = function() {
            return _datepicker.validateDuration(_query.fromDate.val(), _query.toDate.val());
        };

		Query.prototype.exportData = function() {
			if(!_query.validateRequest()) return;
			_query.makeRequest();
			var url = BASE_URL + "/user/export";
			console.log("Export user with url: " + url);
			$.ajax({
				url: url,
				type: 'POST',
				contentType : 'application/json',
				async: true,
				data : JSON.stringify(_query.request)
			}).done(function(data) {
				console.log(data);
				if(data === null || data === '' || data !== 'done') {
					_notifyForUser.error("Thực hiên xuất file quản lý người dùng thất bai!");
				} else {
					_notifyForUser.ok("Thực hiên xuất file quản lý người dùng thành công!");
				}
				_notifyForUser.show();
			}).fail(function(data) {
				console.log(data);
				console.log("Đã xảy ra lỗi khi thực hiện xuất file quản lý người dùng!");
				_notifyForUser.error('Đã xảy ra lỗi khi thực hiện xuất file quản lý người dùng!');
				_notifyForUser.show();
			}).always(function() {
				console.log("Complete Call Ajax: Export User!" );
			});
		};
		
		
		Query.prototype.reset = function() {
			_query.fromDate.val('');
			_query.toDate.val('');
			_query.keyword.val('');
			_status.statusEl.val("-2").trigger('change.select2');
			_status.current = -2;
		};

		return Query;
	})();

    UserView.Table = (function() {
        function Table() {
            this.data = [];
            this.el = $('#user-table');
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
               /* _actionMenu.addMenu('fa-edit', "Chi tiết", '#',
                    'UserView._form.obj=' + JSON.stringify(o) + ';UserView._form.show()');*/
                _actionMenu.addTooltip('fa-wrench',"Reset Mật khẩu", "", '#',
                    'UserView._resetPassword.username=\'' + o.user.userName + '\';UserView._resetPassword.show()');

                tbody.append($('<tr>')
                    // .append($('<td>', {"class": "text-nowrap"}).append(i + 1 + (_pageCommon.number - 1) * _pageCommon.defaultSize))
                    .append($('<td>', {"class": "text-nowrap"}).append(_datepicker.convertDateTo24Hour(o.user.createdDate)))
                    .append($('<td>', {"class": "text-nowrap"}).append($('<a>', {'href': '#', 'onclick': 'UserView._form.obj=' + JSON.stringify(o) + ';UserView._form.show()'}).append(o.userProfile.fullName)))
                    .append($('<td>', {"class": "text-nowrap"}).append(o.user.phone))
                    .append($('<td>', {"class": "text-nowrap"}).append(o.user.email))
                    .append($('<td>', {"class": "text-nowrap"}).append(o.userProfile.address))
                    .append($('<td>', {"class": "text-nowrap"}).append(o.userProfile.district))
                    .append($('<td>', {"class": "text-nowrap"}).append(o.userProfile.province))
                    .append($('<td>', {"class": "text-nowrap"}).append(_status.toText(o.user.status)))
                    .append($('<td>').append(_actionMenu.toHtml()))
                );
            });
            return tbody;
        };

        return Table;
    })();

    UserView.Page = (function() {
        function Page() {
            this.paginationEl = _table.el.find('ul.pagination');
        }


        Page.prototype.loadData = function() {
            var url = BASE_URL + "/user/load";
            console.log(JSON.stringify(_query.request));
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
                _pageCommon.pagination(_page.paginationEl, UserView._query);
            }).fail(function() {
                console.log("Đã xảy ra lỗi khi thực hiện tìm kiếm người dùng!");
                _notifyForUser.error('Đã xảy ra lỗi khi thực hiện tìm kiếm người dùng!');
                _notifyForUser.show();
            }).always(function() {
                console.log("Complete Call Ajax: Search Load User!" );
            });
        };

        return Page;

    })();

	UserView.Form = (function() {
		function Form() {
			this.modalEl = $('#user-profile-form-modal');
			this.modalTitleEl = this.modalEl.find('h4.modal-title');

			this.obj = undefined;

			this.createdDateEl = this.modalEl.find('input[name="createdDate"]');
			this.fullNameEl = this.modalEl.find('input[name="fullName"]');
			this.phoneEl = this.modalEl.find('input[name="phone"]');
			this.emailEl = this.modalEl.find('input[name="email"]');
			this.addressEl = this.modalEl.find('input[name="address"]');
			this.districtEl = this.modalEl.find('input[name="district"]');
			this.provinceEl = this.modalEl.find('input[name="province"]');
			this.genderEl = this.modalEl.find('input[name="gender"]');
			this.birthdayEl = this.modalEl.find('input[name="birthday"]');
			this.identityCardEl = this.modalEl.find('input[name="identityCard"]');
			this.dateOfIdentityEl = this.modalEl.find('input[name="dateOfIdentity"]');
			this.placeOfBirthEl = this.modalEl.find('input[name="placeOfBirth"]');
			this.statusEl = this.modalEl.find('input[name="status"]');

			this.modalEl.on('hide.bs.modal', function () {
				this.obj = undefined;
			});
		}

		Form.prototype.show = function() {
			console.log('call function form.show()');
			_form.showElement();
			_form.modalTitleEl.text("Thông tin người dùng - " + _form.obj.userProfile.fullName);
			_form.modalEl.modal();
		};

		Form.prototype.showElement = function() {
			console.log('call function form.showElement()');
			console.log(_form.obj);
			_form.createdDateEl.val(_datepicker.convertDateTo24Hour(_form.obj.user.createdDate));
			_form.fullNameEl.val(_form.obj.userProfile.fullName);
			_form.phoneEl.val(_form.obj.user.phone);
			_form.emailEl.val(_form.obj.user.email);
			_form.addressEl.val(_form.obj.userProfile.address);
			_form.districtEl.val(_form.obj.userProfile.district);
			_form.provinceEl.val(_form.obj.userProfile.province);
			_form.genderEl.val(_gender.toText(_form.obj.userProfile.gender));
			_form.birthdayEl.val(_form.convertDate(_form.obj.userProfile.birthday));
			_form.identityCardEl.val(_form.obj.userProfile.identityCard);
			_form.dateOfIdentityEl.val(_form.convertDate(_form.obj.userProfile.dateOfIdentity));
			_form.placeOfBirthEl.val(_form.obj.userProfile.placeOfBirth);
			_form.statusEl.val(_status.toText(_form.obj.user.status));
		};

		Form.prototype.convertDate = function(date) {
			if(date === null) return '';
			var localeDate = new Date(date).toLocaleDateString('de-DE', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			});
			
			var dateStr = localeDate.replace(/\./g, '/');
			if (dateStr === undefined || dateStr === null || dateStr.trim().length < 1) return "";
			var parts = dateStr.split("/");
			var dateFormat = parts[1] +"/"+ parts[0] +"/"+ parts[2];
			return dateFormat;
			
		};

		return Form;
	})();

	UserView.ResetPassword = (function() {
		function ResetPassword() {
			this.modalEl = $('#reset-password-form-modal');
			this.modalTitleEl = this.modalEl.find('h4.modal-title');

			this.username = undefined;

			this.contentEl = this.modalEl.find('label[for="content"]');

			this.btnConfirm = this.modalEl.find('button[name="confirm-form"]');

			this.btnConfirm.bind('click', {context: this}, function(e) {
				e.data.context.confirm();
			});
		}

		ResetPassword.prototype.show = function(){
            var content = 'Bạn có chắc chắn muốn reset mật khẩu cho người dùng [' + _resetPassword.username + '] ?';
            this.contentEl.text(content);
            _resetPassword.modalEl.modal();
        };

		ResetPassword.prototype.confirm = function() {
			if (this.username === undefined || this.username=== null || this.username === '')
				return;

			var url = BASE_URL + "/user/reset-password" + "/name=" + this.username;
			console.log('confirm reset password with url: ' + url);

			var self = this;
			$.ajax({
				url: url,
				async: true,
				type: 'GET'
			}).done(function(data) {
				console.log(data);
				if(data.error === true) _notifyForUser.error("Reset mật khẩu không thành công!");
				else _notifyForUser.ok("Reset mật khẩu thành công!");
				_notifyForUser.show();
				self.modalEl.modal('hide');
			});

		};

		return ResetPassword;
	})();

	UserView.Gender = (function() {
		function Gender() {
			this.female = 0;
			this.male = 1;
			this.other = 2;
		}

		Gender.prototype.toText = function(gender) {
			if(gender == null) return "";
			if(typeof type === 'string') {
				gender = parseInt(gender);
			}
			switch(gender){
			case _gender.female: return "Nữ";
			case _gender.male: return "Nam";
			case _gender.other: return "Khác";
			default: return "";
			}
		};

		return Gender;
	})();

	_status = new UserView.Status();
	_query = new UserView.Query();
	_table = new UserView.Table();
	_page = new UserView.Page();
	_form = new UserView.Form();
	_gender = new UserView.Gender();
	_resetPassword = new UserView.ResetPassword();

	UserView._query = _query;
	UserView._form = _form;
	UserView._resetPassword = _resetPassword;
	//UserView._table = _table;
	_query.search();

}).call();