angular.module('App.Order.Pay', []).controller('App.Order.Pay.Controller', [
    '$scope',
    '$state',
    '$ionicHistory',
    'Pay',
    function(
        $scope,
        $state,
        $ionicHistory,
        Pay
    ) {
        $scope.back = function() { $ionicHistory.goBack(); }
        $scope.chip_id = $state.params.id;
        $scope.pay = {
            detail: $state.params.detail,
            price: $state.params.price,
            trade_no: $state.params.trade_no
        }

        console.log($state.params.price);

        $scope.comfirmPay = function() {
            Pay.wxPay({
                "pay_type": "chip",
                "sign_type": "person",
                "trade_no": $scope.pay.trade_no
            }).$promise.then(function(response) {

            }, function(response) {

            });
        }
    }
]);
