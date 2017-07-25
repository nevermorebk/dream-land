(function() {
    var UpdateCharging, _query, _product, price;

    var _menu = BackendAdminPayDee._menu;
    var _notifyForUser = BackendAdminPayDee._notifyForUser;
    var _currency = BackendAdminPayDee._currency;


    // var _status = TransactionCommon._status;
    // var _provider = TransactionCommon._provider;
    // var _issuer = TransactionCommon._issuer;

    // _status.init();
    //_provider.init();
    // _issuer.init();
    var status = location.search.split('status=')[1].substring(0,1);
    
    var denomination = location.search.split('denomination=')[1];
    var rate = location.search.split('rate=')[1];
    var rateValue = rate.substring(0,rate.indexOf("code")-1);

    var codeText = location.search.split('code=')[1];
    var codeValue = codeText.substring(0,3);
    console.log(rate.indexOf("denomination"));
    console.log(codeText);
    var codeValue = codeText.substring(0,codeText.indexOf("denomination")-1);
    console.log(codeValue);
    $("#rate").text("");
    $("#status").text("");
    UpdateCharging = window.UpdateCharging = {};

    UpdateCharging.Product = (function() {

        function Product() {
            this.current = undefined;
            this.productEl = $('select[name="product"]');
            this.productEl.on("select2:select", function() {
                _product.current = _product.productEl.val();
                console.log(_product.productEl.val());
                price = _product.productEl.val();
            
                if(price <= 0){
                    $("#rate").text("");
                    _query.caculate();
                }else {
                    _product.getRate();
                }
            });
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
                if(status ==2){
                    self.productEl
                        .find('option')
                        .remove()
                        .end()
                        .append('<option value="-1">Mệnh giá</option>')
                        .val('-1')
                }
                var afterDenominations = self.eliminateDuplicates(beforeDenominations);
                console.log(afterDenominations);
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
                if(status ==2){
                    self.productEl
                        .find('option')
                        .remove()
                        .end()
                        .append('<option value="-1">Mệnh giá</option>')
                        .val('-1')
                }
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
        };

        Product.prototype.getRate =function () {
            var url = BASE_URL + "/transaction/get-rate?amount="+ _product.current+"&issuer="+ $("#issuer").text();
            $.ajax({
                async: true,
                url: url,
                method: "GET",
                dataType: "json"
            }).done(function(data) {
                console.log(data);
                $("#rate").text(data+".0");
                _query.caculate();
            }).fail(function() {
                console.log("Đã xảy ra lỗi khi lấy danh sách mệnh giá của thẻ!");
                /*_notifyForUser.error('Đã xảy ra lỗi khi lấy danh sách mệnh giá của thẻ!');
                 _notifyForUser.show();*/
                return;
            }).always(function() {
                console.log("Complete Call Ajax: Find product by issuer!" );
            });
        };



        return Product;
    })();

    UpdateCharging.Query = (function () {
        function Query() {
            this.product = $('select[name="product"]');
            this.btnCencal = $('button[name="cancel"]');
            this.btnUpdate = $('button[name="update"]');

           /* this.product.on('change', { context: this }, function(e) {
                price = $("#product").val();
                e.data.context.caculate();
            });*/

            this.btnCencal.on('click', { context: this }, function(e) {
                e.data.context.cancel();
            });

            this.btnUpdate.on('click', { context: this }, function(e) {
                e.data.context.confirm();
            });
        }

        Query.prototype.caculate = function () {
            var amount = price - price * $("#rate").text()/100;
            if (amount <=0){
                amount =0;
                $("#status").text("Thất bại");
            }else{
                $("#status").text("Thành công");
            }
            console.log(amount);

            $("#amount").text(_currency.formatCurrency(amount));
        };

        Query.prototype.cancel = function () {
            window.close();
        };

        Query.prototype.validate = function () {
            if ($("#product").val() == -1){
                alert('Bạn nhập chưa chọn Mệnh giá');
                return false;
            }
            return true;
        };

        Query.prototype.confirm = function() {
            if (! _query.validate()) return;
            var confirmMessage = '<h4>Bạn có chắc chắn cập nhật giao dịch này không?</h4>';
            var self = this;
            bootbox.confirm({
                title: "<strong>Chú ý!</strong>",
                message: confirmMessage,
                buttons: {
                    confirm: {
                        label: 'Đồng ý',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'Hủy',
                        className: 'btn-danger'
                    }
                },
                callback: function(result) {
                    if (! result) return;
                    var request = {
                        transactionId: $("#transactionId").text(),
                        partner: $("#partner").text(),
                        fullName: $("#fullName").text(),
                        phone: $("#phone").text(),
                        accountNo: $("#accountNo").text(),
                        issuer: $("#issuer").text(),
                        cardSerial: $("#cardSerial").text(),
                        cardCode: $("#cardCode").text(),
                        denomination: $("#product").val(),
                        rate: $("#rate").text(),
                        amount: $("#amount").text().replace(/\./g,''),
                        requestTime: $("#requestTime").text(),
                        completeTime: $("#completeTime").text(),
                        status: status
                    };
                    console.log(request);
                    self.update(request);
                }
            });
        };

        Query.prototype.update = function (request) {
            var url = BASE_URL + "/transaction/update-charging";
            console.log("call function perform update charging with url: " + url);
            $.ajax({
                url: url,
                type: 'POST',
                contentType : 'application/json',
                async: true,
                data : JSON.stringify(request)
            }).done(function(data) {
                console.log(data);
                if(data === null || data === '' || data.error) {
                    _notifyForUser.error("Thực hiên  thất bại!");
                } else {
                    _notifyForUser.ok("Thực hiên thành công!");
                }
                _notifyForUser.showAndNotCloseAlert();
            });
        }

        return Query;
    })();



    _query = new UpdateCharging.Query();
    // _issuer = new UpdateCharging.Issuer();
    // _table = new UpdateCharging.Table();
    // _page = new UpdateCharging.Page();
    _product = new UpdateCharging.Product();
    UpdateCharging._query = _query;

    if (status!=1){
        _product.loadBy(codeValue);
        
    }else {
    	
        $("#rate").text(rateValue);
        _product.productEl
            .find('option')
            .remove()
            .end()
            .append('<option value='+ denomination+'>'+_currency.formatCurrency(denomination)+'</option>')
            .val(denomination);
        var amount = denomination - denomination * $("#rate").text()/100;
        $("#amount").text(_currency.formatCurrency(amount));

        $('#product').prop('disabled', true);
        // var add = $("<p></p>").text("Text.");
        // $("#form-product").append(add);
        $("#status").text("Đã hoàn tiền");
    }

    // $("#product").val(-1);

}).call(this);