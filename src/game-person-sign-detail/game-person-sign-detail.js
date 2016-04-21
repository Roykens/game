angular.module('App.GamePersonSignDetail', []).controller('App.GamePersonSignDetail.Controller', [
    '$scope',
    '$state',
    'Event',
    function ($scope,
              $state,
              Event) {
        $scope.$state = $state;

        //防止重复提交订单支付
        $scope.pay_ing = false;

        $scope.getOrderConfirm = Event.getOrderConfirm({
            id: $state.params.person_sign_id
        });

        $scope.postOrder = Event.postOrderConfirm({
            id: $state.params.person_sign_id
        }, {});

        console.log('=======$state.params.person_sign_id======');
        console.log($state.params.person_sign_id);

        var setPaying = function (bol) {
            console.log($scope.pay_ing);
            $scope.pay_ing = bol;
            console.log($scope.pay_ing);
        };

        var paySuccess = function(){
            $.post(
                config.API_ROOT + '/wechat/pay/query_order',
                {
                    trade_no: $scope.postOrder.trade_no
                },
                function (resp) {
                }
            );
            alert('支付成功!');
            $state.go('user-enroll');
        };

        $scope.postOrderConfirm = function () {
            setPaying(true);
            $.ajax({
                type: "POST",
                url: config.API_ROOT + '/wechat/pay/get_bridge_params',
                dataType: 'json',
                data: {
                    trade_no: $scope.postOrder.trade_no
                },
                success: function (resp) {
                    if(resp.detail && resp.detail == "fee:0"){
                        paySuccess();
                        return;
                    }
                    var payOptions = resp;
                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
                            "appId": payOptions.appId,
                            "timeStamp": payOptions.timestamp,
                            "nonceStr": payOptions.nonceStr,
                            "package": payOptions["package"],
                            "signType": payOptions.signType,
                            "paySign": payOptions.paySign
                        },
                        function (res) {
                            if (res.err_msg === "get_brand_wcpay_request:ok") {
                                paySuccess();
                            } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
                                $("#btnPay").removeAttr('disabled');
                            } else {
                                $("#btnPay").removeAttr('disabled');
                                alert('支付失败!');
                                $.post(
                                    config.API_ROOT + '/wechat/pay/fail_log',
                                    {
                                        trade_no: $scope.postOrder.trade_no,
                                        data: JSON.stringify(res)
                                    }
                                );
                                $.each(res, function (i, n) {
                                    //alert("Name: " + i + ", Value: " + n);
                                });
                            }
                        }
                    );
                },
                error: function (resp) {
                    alert(resp.responseJSON.detail);
                }
            });
        };

        $scope.goGamePerson = function () {
            $state.go('game-person', {
                event_id: $scope.getOrderConfirm.event.id
            });
        }
    }
]);