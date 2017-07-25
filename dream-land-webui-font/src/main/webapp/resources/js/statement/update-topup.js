(function() {
    var UpdateCharging, _query, price;

    var _notifyForUser = BackendAdminPayDee._notifyForUser;
    var _currency = BackendAdminPayDee._currency;

    var status = location.search.split('status=')[1].substring(0,1);
    var denomination = location.search.split('denomination=')[1];
    var rate = location.search.split('rate=')[1];
    var rateValue = rate.substring(0,rate.indexOf("denomination")-1);
    console.log(rateValue);

    UpdateCharging = window.UpdateCharging = {};

    UpdateCharging.Query = (function () {
        function Query() {
            this.btnCencal = $('button[name="cancel"]');
            this.btnUpdate = $('button[name="update"]');

            this.btnCencal.on('click', { context: this }, function(e) {
                e.data.context.cancel();
            });

            this.btnUpdate.on('click', { context: this }, function(e) {
                e.data.context.confirm();
            });
        }

        Query.prototype.caculate = function () {
            var amount = price - price * $("#rate").text();
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

        Query.prototype.common =function () {
            $("#denomination").text(_currency.formatCurrency(denomination));
            rateValue == "0"? $("#rate").text(rateValue+".0") : $("#rate").text(rateValue);
            this.status = $('select[name="status"]');
            var amount = denomination - denomination * rateValue /100;
            $("#amount").text(_currency.formatCurrency(amount));
            switch (status){
                case "0": {
                    this.status.find('option').remove().end().append('<option value="1">Thành công</option>').append('<option value="4">Đã hoàn tiền</option>');
                    break;
                }
                case "1": {
                    this.status.find('option').remove().end().append('<option value="4">Đã hoàn tiền</option>');
                    break;
                }
                case "2": {
                    this.status.find('option').remove().end().append('<option value="1">Thành công</option>');
                    break;
                }
            }
        };

        Query.prototype.confirm = function() {
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
                        partnerName: $("#partner").text(),
                        fullName: $("#fullName").text(),
                        phoneNumber: $("#phone").text(),
                        sourceAccountNo: $("#accountNo").text(),
                        issuer: $("#issuer").text(),
                        denomination: denomination,
                        receivePhoneNumber: $("#targetPhone").text(),
                        rate: rateValue,
                        amount: $("#amount").text().replace(/\./g,''),
                        requestTime: $("#requestTime").text(),
                        completeTime: $("#completeTime").text(),
                        oldStatus: status,
                        status: $("#status").val()
                    };
                    console.log(request);
                    self.update(request);
                }
            });
        };

        Query.prototype.update = function (request) {
            var url = BASE_URL + "/transaction/update-topup";
            console.log("call function perform update topup with url: " + url);
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
    UpdateCharging._query = _query;
    _query.common();



}).call(this);