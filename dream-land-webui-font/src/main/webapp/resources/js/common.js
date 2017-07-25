(function() {

	var BackendAdminPayDee, _menu, _actionMenu, _datepicker, _notifyForUser, _currency, _filter, _page, _partner, _stringBuilder, _numberToWord;

	BackendAdminPayDee = window.BackendAdminPayDee = {};

	BackendAdminPayDee.Menu = (function() {

		function Menu() {}

		Menu.prototype.activeMenu = function(menuId) {
			$('#' + menuId).addClass('active').parents('ul.treeview-menu')
			.addClass('menu-open').parent('li').addClass('active');
		}

		return Menu;
	})();

	BackendAdminPayDee.ActionMenu = (function() {

		function ActionMenu() {
			this.root = $('<div>', {"class": "tools"});
		}

		ActionMenu.prototype.addMenu = function(faIcon, actionName, url, handler) {
			//var a = $('<a>', {"class": "fa " + faIcon, "title": actionName, "href": url, "onclick": handler});
			//this.root.append(a);
			var a = $('<a>', {"class": "btn btn-flat", "title": actionName, "href": url, "onclick": handler});
			var i = $('<i>', {"class": "fa " + faIcon});
			a.append(i).append(" " + actionName);
			this.root.append(a);
		}

		ActionMenu.prototype.addTooltip = function(faIcon, title, actionName, url, handler) {
			//var a = $('<a>', {"class": "fa " + faIcon, "title": actionName, "href": url, "onclick": handler});
			//this.root.append(a);
			var a = $('<a>', {"class": "btn btn-flat", "title": title, "href": url, "onclick": handler});
			var i = $('<i>', {"class": "fa " + faIcon});
			a.append(i).append(" " + actionName);
			this.root.append(a);
		}

		ActionMenu.prototype.toHtml = function() {
			return this.root;
		}

		return ActionMenu;
	})();

	BackendAdminPayDee.DatePicker = (function() {

		function DatePicker() {}

		DatePicker.prototype.init = function(inputDateId) {
			$('#' + inputDateId).datepicker({
				autoclose: true,
				clearBtn: true,
				todayHighlight: true,
				language: 'vi'
			});
		}

		// This function used to convert format in Vietnamese: dd/mm/yyyy string to date
		DatePicker.prototype.toDate = function(dateStr) {
			if (dateStr == undefined || dateStr == null || dateStr.trim().length < 1) return null;
			var parts = dateStr.split("/");
			return new Date(parts[2], parts[1] - 1, parts[0]);
		}

		// This function used to convert format in Vietnamese: HH:mm:ss dd/mm/yyyy  string to date
		DatePicker.prototype.convertDateTo24Hour = function(date) {
			if(date === null) return '';
			var d = new Date(date);
			var localeDate = d.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			});
			var dateStr = localeDate.replace(/\./g, '/');
			if (dateStr == undefined || dateStr == null || dateStr.trim().length < 1) return "";
			var parts = dateStr.split("/");
			var dateFormat = parts[1] +"/"+ parts[0] +"/"+ parts[2];
			var dateTo24h = _datepicker.to24Hour(d.toLocaleTimeString());
			return dateTo24h + " " + dateFormat;
		}

		DatePicker.prototype.to24Hour = function(dateStr){
			var dateStrArr = dateStr.split(' ');

			var timeStrArr = dateStrArr[0].split(":");
			var hour = timeStrArr[0];
			var minute = timeStrArr[1];
			var second = timeStrArr[2];

			switch (dateStrArr[1]) {
			case 'PM':
				if (hour != 12) {
					hour = hour * 1 + 12;
				}
				break;
			case 'AM':
				if (hour == 12) {
					hour = "00";
				} else {
					hour = "0" + hour;
				}
				break;
			default:
				break;
			}
			return hour + ":" + minute + ":" + second;
		}

		DatePicker.prototype.to12Hour = function(date) {
			if(date === null) return '';
			var d = new Date(date);
			return d.toLocaleTimeString();
		};

		DatePicker.prototype.validateDuration = function(fromDate, endDate) {
			if (fromDate != null && fromDate.trim().length > 0
					&& endDate != null && endDate.trim().length > 0) {
				if (_datepicker.toDate(fromDate) > _datepicker.toDate(endDate)) {
					_notifyForUser.error('Bạn cần phải nhập ngày bắt đầu nhỏ hơn hoặc bằng ngày kết thúc!');
					_notifyForUser.show();
					return false;
				}
			}

			if (_datepicker.toDate(fromDate) > new Date()) {
				_notifyForUser.error('Bạn cần phải nhập ngày bắt đầu nhỏ hơn hoặc bằng ngày hiện tại!');
				_notifyForUser.show();
				return false;
			}
			return true;
		};

		return DatePicker;
	})();

	BackendAdminPayDee.NotificationForUser = (function() {

		function NotificationForUser() {
			this.rootEl = $('div.notify-for-user');

			this.alertEl = $('<div>', {"class": "alert alert-dismissible"});

			this.closeButton = $('<button>', {"type": "button", "class": "close", "data-dismiss": "alert", "aria-hidden": "true"});
			this.closeButton.text('×');

			this.header = $('<h4>');
			this.iconEl = $('<i>', {"class": "icon fa"});
			this.header.append(this.iconEl, 'Thông báo!');

			this.content = $('<p>');

			this.alertEl.append(this.closeButton, this.header, this.content);

			this.errorClass = 'alert-danger';
			this.successClass = 'alert-success';

			this.errorIcon = 'fa-ban';
			this.successIcon = 'fa-check';

			this.hasMessage = false;
		}

		NotificationForUser.prototype.show = function() {
			var self = this;
			this.showAndNotCloseAlert();
			this.closeAlert();
		}

		NotificationForUser.prototype.closeAlert = function() {
			var self = this;
			this.alertEl.fadeTo(2000, 500).slideUp(500, function(){
				self.alertEl.alert('close');
			});
		}

		NotificationForUser.prototype.showAndNotCloseAlert = function() {
			var self = this;
			if(! this.hasMessage) return;
			this.rootEl.append(this.alertEl);
			this.rootEl.css('display', 'block');
		}

		NotificationForUser.prototype.ok = function(msg) {
			this.content.html(msg);
			this.alertEl.addClass(this.successClass);
			this.iconEl.addClass(this.successIcon);
			this.alertEl.removeClass(this.errorClass);
			this.iconEl.removeClass(this.errorIcon);
			this.hasMessage = true;

		}

		NotificationForUser.prototype.error = function(msg) {
			this.content.html(msg);
			this.alertEl.addClass(this.errorClass);
			this.iconEl.addClass(this.errorIcon);
			this.alertEl.removeClass(this.successClass);
			this.iconEl.removeClass(this.successIcon);
			this.hasMessage = true;
		}

		return NotificationForUser;
	})();

	BackendAdminPayDee.Currency = (function() {

		function Currency() {}

		Currency.prototype.formatCurrency = function(number) {
			if(isNaN(number)) return;
			var decimalplaces = 2;
			var decimalcharacter = ".";
			var thousandseparater = ".";
			number = parseFloat(number);
			var sign = number < 0 ? "-" : "";
			var formatted = new String(number.toFixed(decimalplaces));
			if(decimalcharacter.length && decimalcharacter != ".") {
				formatted = formatted.replace(/\./, decimalcharacter);
			}
			var integer = "";
			var strnumber = new String(formatted);
			var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
			if (dotpos > -1) {
				if (dotpos) {
					integer = strnumber.substr(0, dotpos);
				}
			} else {
				integer = strnumber;
			}
			if (integer) {
				integer = String(Math.abs(integer));
			}
			var temparray = [];
			while (integer.length > 3) {
				temparray.unshift(integer.substr(-3));
				integer = integer.substr(0, integer.length - 3);
			}
			temparray.unshift(integer);
			integer = temparray.join(thousandseparater);
			return sign + integer;
		} 

		return Currency;
	})();

	BackendAdminPayDee.Filter = (function() {

		function Filter() {}

		Filter.prototype.ajaxPrefilter = function() {
			$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
				var token;
				if (!options.crossDomain) {
					token = $('meta[name="_csrf"]').attr('content');
					console.log("[Token: " + token + "]");
					if (token) {
						return jqXHR.setRequestHeader('X-CSRF-Token', token);
					}
				}
			});
		}

		return Filter;
	})();

	BackendAdminPayDee.Page = (function() {
		function Page() {
			this.defaultSize = 10;
			this.number = 0;
			this.total = 0;
			this.list = [];

			this.paginationEl = undefined;
			this.query = undefined;
		}

		Page.prototype.pagination = function(paginationEl, queryObject) {
			this.paginationEl = paginationEl;
			this.paginationEl.children('li').remove();
			if(this.total <= 1) {
				return;
			}

			this.query = queryObject;

			var liFirst = $('<li>').append($('<a>', {'href': '#first', 'title': 'Trang đầu tiên', 'onclick': 'BackendAdminPayDee._page.number = 0; BackendAdminPayDee._page.query.search()'}).append('&laquo;'));
			var liPrev = $('<li>').append($('<a>', {'href': '#prev', 'title': 'Trang trước', 'onclick': 'BackendAdminPayDee._page.number = BackendAdminPayDee._page.number - 1; BackendAdminPayDee._page.query.search()'}).append('&lsaquo;'));
			if (this.number == 0) {
				liFirst = $('<li>').append($('<a>', {'href': '#first'}).append('&laquo;'));
				liPrev = $('<li>').append($('<a>', {'href': '#prev'}).append('&lsaquo;'));
				liFirst.addClass('disabled');
				liPrev.addClass('disabled');
			}

			var liNext = $('<li>').append($('<a>', {'href': '#next', 'title': 'Trang sau', 'onclick': 'BackendAdminPayDee._page.number = BackendAdminPayDee._page.number + 1; BackendAdminPayDee._page.query.search()'}).append('&rsaquo;'));
			var liLast = $('<li>').append($('<a>', {'href': '#last', 'title': 'Trang cuối cùng', 'onclick': 'BackendAdminPayDee._page.number = BackendAdminPayDee._page.total - 1; BackendAdminPayDee._page.query.search()'}).append('&raquo;'));
			if (this.number == this.total - 1) {
				liNext = $('<li>').append($('<a>', {'href': '#next'}).append('&rsaquo;'));
				liLast = $('<li>').append($('<a>', {'href': '#last'}).append('&raquo;'));
				liNext.addClass('disabled');
				liLast.addClass('disabled');
			}

			var pages = [];
			$.each(this.list, function(idx, obj) {
				var li = $('<li>').append($('<a>', {'href': '#page', 'onclick': 'BackendAdminPayDee._page.number = ' + (obj - 1) + '; BackendAdminPayDee._page.query.search()'}).append(obj));
				if(_page.number == (obj - 1)) li.addClass('active');
				pages.push(li);
			});

			this.paginationEl.append(liFirst, liPrev, pages, liNext, liLast);
		}

		Page.prototype.calculatePage = function(number, total) {
			var min = undefined;
			var max = undefined;

			var DEFAULT_NUMBER_PAGE_SHOW = 5;
			var current = number + 1;
			var middle = Math.round(DEFAULT_NUMBER_PAGE_SHOW / 2);

			if (total < DEFAULT_NUMBER_PAGE_SHOW) {
				min = 1;
				max = total;
			} else {
				min = current - middle + 1;
				max = current + middle - 1;
				if (min < 1) {
					min = 1;
					max = DEFAULT_NUMBER_PAGE_SHOW;
				} else if (max > total) {
					max = total;
					min = total - DEFAULT_NUMBER_PAGE_SHOW + 1;
				}
			}

			var list = [];
			for (var i = min; i <= max; i++) {
				list.push(i);
			}
			console.log('Numbers of page will be showed: ' + list);
			return list;
		};

		Page.prototype.resetNumber = function() {
			_page.number = 0;
		};

		return Page;
	})();

	BackendAdminPayDee.Partner = (function() {

		function Partner() {
			this.current = undefined;
			this.partnerEl = $('select[name="partner"]');
			this.partnerEl.on("select2:select", function (e) {
				_partner.current = _partner.partnerEl.val();
				console.log(_partner);
			});
			// Chỉ những màn hình nào cần dùng thì lúc đó mới gọi khởi tạo, 
			// Nếu khởi tạo luôn tại đây thì những màn hình không cần element này sẽ bị lỗi vì không tìm thấy phần tử Select.
			// this.init();
		}

		Partner.prototype.init = function() {
			var url = BASE_URL + "/partner/find-all";
			var self = this;
			$.ajax({
				async: true,
				url: url,
				method: "GET",
				dataType: "json"
			}).done(function(data) {
				console.log(data);
				$.each(data, function(idx, obj) {
					var option = $('<option>', {"value": obj.id, "text": obj.partnerCode});
					self.partnerEl.append(option);
				});
				self.partnerEl.select2();
				self.current = self.partnerEl.select2('data')[0].id;
			}).fail(function() {
				console.log("Đã xảy ra lỗi khi lấy danh sách đối tác!");
				/*_notifyForUser.error('Đã xảy ra lỗi khi lấy danh sách đối tác!');
				_notifyForUser.show();*/
				return;
			}).always(function() {
				console.log("Complete Call Ajax: Find all partner!" );
			});
		}

		return Partner;
	})();

	BackendAdminPayDee.StringBuilder = (function() {
		// Initializes a new instance of the StringBuilder class
		// and appends the given value if supplied
		function StringBuilder() {
			this.strings = new Array("");
			//this.append(value);
		}

		// Appends the given value to the end of this instance.
		StringBuilder.prototype.append = function (value) {
			if (value) {
				this.strings.push(value);
			}
		}

		// Clears the string buffer
		StringBuilder.prototype.clear = function () {
			this.strings.length = 1;
		}

		// Converts this instance to a String.
		StringBuilder.prototype.toString = function () {
			return this.strings.join("");
		}

		StringBuilder.prototype.length = function () {
			return this.strings.length;
		}

		StringBuilder.prototype.isEmpty = function () {
			return this.strings.length <= 1;
		}

		return StringBuilder;
	})();

	BackendAdminPayDee.NumberToWord = (function() {
		function NumberToWord() {
			this.NGHIN_TY = 1000000000000
			this.TRAM_TY = 100000000000;
			this.TY = 1000000000;
			this.TRAM_TRIEU = 100000000;
			this.TRIEU = 1000000;
			this.TRAM_NGHIN = 100000;
			this.NGHIN = 1000;
			this.TRAM = 100;
			this.CHUC = 10;
		};

		NumberToWord.prototype.convert = function(number) {
			if(isNaN(number)) {
				console.log("khong phai la so");
				return;
			}
			var sb = new BackendAdminPayDee.StringBuilder();

			if(number >= this.NGHIN_TY) {
				sb.append(this.getWord3Degit(parseInt(number / this.NGHIN_TY)));
				sb.append(" nghìn ");
				number = parseInt(number % this.NGHIN_TY);
				if(number >= this.TY) {
					sb.append(this.getZeroWord(number, this.TRAM_TY));
				} else if (number == 0) {
					sb.append(" tỷ ");
				}
			}

			if (number >= this.TY) {
				sb.append(this.getWord3Degit(parseInt(number / this.TY)));
				sb.append(" tỷ ");
				number = parseInt(number % this.TY);
				if (number >= this.TRIEU) {
					sb.append(this.getZeroWord(number, this.TRAM_TRIEU));
				} else if (number >= this.NGHIN) {
					sb.append(this.getZeroWord(number, this.TRAM_NGHIN));
				} else if (number > 0) {
					sb.append(this.getZeroWord(number, this.TRAM));
				}
			}

			if (number >= this.TRIEU) {
				sb.append(this.getWord3Degit(parseInt(number / this.TRIEU)));
				sb.append(" triệu ");
				number = parseInt(number % this.TRIEU);
				if (number >= this.NGHIN) {
					sb.append(this.getZeroWord(number, this.TRAM_NGHIN));
				} else if (number > 0) {
					sb.append(this.getZeroWord(number, this.TRAM));
				}
			}

			if (number >= this.NGHIN) {
				sb.append(this.getWord3Degit(parseInt(number / this.NGHIN)));
				sb.append(" nghìn ");
				number = parseInt(number % this.NGHIN);
				if (number > 0){
					sb.append(this.getZeroWord(number, this.TRAM));
				}
			}

			if (number > 0) {
				sb.append(this.getWord3Degit(number));
				return this.capitalizeFirstLetter(sb.toString());
			} 

			if (sb.isEmpty()) {
				sb.append(this.getWord3Degit(number));
			}
			return this.capitalizeFirstLetter(sb.toString());

		}

		NumberToWord.prototype.capitalizeFirstLetter = function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		NumberToWord.prototype.getReplaceWord = function(number) {
			var target = "không trăm linh";
			var idx = -1;
			if ((idx = result.indexOf(target)) > -1) {
				if(result.substring(idx + target.length).length < 1) {
					result = result.replace(target, "");
				}
			}
			return result.charAt(0).toUpperCase() + result.slice(1);
		}

		NumberToWord.prototype.getWord3Degit = function(number) {
			var sb = new BackendAdminPayDee.StringBuilder();
			if (number >= this.TRAM) {
				console.log("-----> number =  " + number + " - result: " + this.getWord1Degit(parseInt(number / this.TRAM)));
				sb.append(this.getWord1Degit(parseInt(number / this.TRAM)));
				sb.append(" trăm ");
				number = parseInt(number % this.TRAM);
				if (number < 10) {
					sb.append("linh ");
				}
			}
			if (number >= this.CHUC) {
				sb.append(this.getWord1Degit(parseInt(number / this.CHUC)));
				sb.append(" mươi ");
				number = parseInt(number % this.CHUC);
			}
			sb.append(this.getWord1Degit(number));
			if (sb.isEmpty()) {
				return;
			}
			var result = sb.toString();
			result = result.replace("một mươi", "mười");
			result = result.replace("mười không", "mười");
			result = result.replace("mươi không", "mươi");
			result = result.replace("mươi một", "mươi mốt");
			result = result.replace("mười năm", "mười lăm");
			result = result.replace("mươi năm", "mươi lăm");
			result = result.replace("linh không", "");
			return result;
		}

		NumberToWord.prototype.getWord1Degit = function(number) {
			console.log("getWord1Degit with number: " + number);
			switch (parseInt(number)) {
			case 0: return "không";
			case 1: return "một";
			case 2: return "hai";
			case 3: return "ba";
			case 4: return "bốn";
			case 5: return "năm";
			case 6: return "sáu";
			case 7: return "bảy";
			case 8: return "tám";
			case 9: return "chín";
			default:
				console.log("getWord1Degit with default number " + number);
			return "";
			}
		};

		NumberToWord.prototype.getZeroWord = function(number, param) {
			var sb = new BackendAdminPayDee.StringBuilder();
			console.log("getZeroWord with number " + number + " - param: " + param + " - result: " + number / param);
			if (parseInt(number / param) == 0) {
				sb.append("không trăm ");
			}
			param = parseInt(param / 10);
			if (parseInt(number / param) == 0) {
				sb.append("linh ");
			}
			return sb.toString();
		};

		return NumberToWord;
	})();

	_menu = new BackendAdminPayDee.Menu();
	_datepicker = new BackendAdminPayDee.DatePicker();
	_notifyForUser = new BackendAdminPayDee.NotificationForUser();
	_currency = new BackendAdminPayDee.Currency();
	_filter = new BackendAdminPayDee.Filter();
	_page = new BackendAdminPayDee.Page();
	_partner = new BackendAdminPayDee.Partner();
	_stringBuilder = new BackendAdminPayDee.StringBuilder();
	_numberToWord = new BackendAdminPayDee.NumberToWord();

	BackendAdminPayDee._menu = _menu;
	BackendAdminPayDee._datepicker = _datepicker;
	BackendAdminPayDee._notifyForUser = _notifyForUser;
	BackendAdminPayDee._currency = _currency;
	BackendAdminPayDee._page = _page;
	BackendAdminPayDee._partner = _partner;
	BackendAdminPayDee._stringBuilder = _stringBuilder;
	BackendAdminPayDee._numberToWord = _numberToWord;

	_filter.ajaxPrefilter();

}).call(this);

var ErrorCode = {
		UNKNOWN: "00",
		SUCCESS:"01"
}

function Pagination() {
	var self = this;
	this.pagination = $('#pagination ul');
	this.setElement = function(elementPagination){
		this.pagination = $(elementPagination);
	};
	this.setData = function(data){
		this.data = data;
		this.pageNumber = data.pageNumber + 1;
		this.pageAvailble = data.pagesAvailable;
	};

	this.show = function(){
		self.pagination.empty();
		if(self.pageNumber > 1){
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search(1)').text('<<')));
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+(self.pageNumber-1)+')').text('<')));
		}
		if(self.pageNumber - 2 > 0 ){
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+(self.pageNumber- 2)+')').text((self.pageNumber-2))));
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+(self.pageNumber- 1)+')').text((self.pageNumber-1))));
		} else if(self.pageNumber - 1 > 0 ){
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+(self.pageNumber- 1)+')').text((self.pageNumber-1))));
		}
		self.pagination.append($("<li class='active'>").append($('<a>').attr('href', 'javascript:search('+self.pageNumber+')').text(self.pageNumber)));
		if(self.pageNumber + 2 <= self.pageAvailble){
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+(self.pageNumber+ 1)+')').text((self.pageNumber+1))));
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+(self.pageNumber+ 2)+')').text((self.pageNumber+2))));
		} else if(self.pageNumber + 1 <= self.pageAvailble){
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+(self.pageNumber+ 1)+')').text((self.pageNumber+1))));
		}
		if(self.pageNumber < self.pageAvailble && self.pageAvailble > 1){
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+(self.pageNumber +1)+')').text('>')));
			self.pagination.append($('<li>').append($('<a>').attr('href', 'javascript:search('+self.pageAvailble+')').text('>>')));
		}
	}
}
