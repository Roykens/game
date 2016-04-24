angular.module('App.Order', []).controller('App.Order.Controller', [
    '$scope',
    '$state',
    '$ionicHistory',
    'Chips',
    function(
        $scope,
        $state,
        $ionicHistory,
        Chips
    ) {
        $scope.back = function() { $ionicHistory.goBack(); }
        $scope.p_chip = $state.params.id;
        $scope.p_color = $state.params.color;
        $scope.p_combo = $state.params.combo;
        $scope.buy_type = $state.params.buy_type;

        console.log($scope.p_chip + ", " + $scope.p_color + ", " + $scope.p_combo);

        // 获取套餐
        $scope.getCombos = function(arr) {
            var combos_list = [];
            for (var i = 0; i < arr.packageprice_set.length; i++) {
                var temp_flag = true;
                for (var j = 0; j < combos_list.length; j++) {
                    if (arr.packageprice_set[i].combo.id === combos_list[j].id) {
                        temp_flag = false;
                    }
                }
                if (temp_flag) {
                    combos_list.push(arr.packageprice_set[i].combo);
                } else {
                    continue;
                }
            }
            // console.log(combos_list);
            $scope.combos_list = combos_list;
        }

        // 获取颜色
        $scope.getColors = function(arr) {
            var colors_list = [];
            for (var i = 0; i < arr.packageprice_set.length; i++) {
                var temp_flag = true;
                for (var j = 0; j < colors_list.length; j++) {
                    if (arr.packageprice_set[i].color.id === colors_list[j].id) {
                        temp_flag = false;
                    }
                }
                if (temp_flag) {
                    colors_list.push(arr.packageprice_set[i].color);
                } else {
                    continue;
                }
            }
            // console.log(colors_list);
            $scope.colors_list = colors_list;
        }

        // 获取芯片信息列表
        Chips.getChipsList().$promise.then(function(response) {
            $scope.chips_list = response;
            $scope.chip = $scope.chips_list[0];
            $scope.getCombos($scope.chip);
            $scope.getColors($scope.chip);
            $scope.prices = $scope.chip.prices;
            // console.log( $scope.combos_list );
            // 根据id获取套餐和颜色
            $scope.getColor = function(obj, id) {
                // console.log(obj);
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id == id) {
                        return obj[i].name;
                    }
                }
            }

            // 订单信息
            $scope.order = {
                color: $scope.getColor($scope.colors_list, $scope.p_color),
                combo: $scope.getColor($scope.combos_list, $scope.p_combo),
                price: $scope.prices[$scope.p_color + '_' + $scope.p_combo],
                buy_type: $scope.buy_type, //使用类型： 1-自用，2-帮别人买
                receive_name: "", //收货人
                receive_address: "", //收货地址
                receive_cellphone: "", //收货人电话
                user_name: "", //使用人
                user_identity: "", //使用人身份证号
                user_cellphone: "", //使用人手机号
                coupon: "" //优惠券码,可为空                
            };
            console.log($scope.order.price);
        }, function(response) {
            // console.log(response);
        });

        // 下订单
        $scope.placeOrder = function() {
            Chips.placeOrder({
                "chip": $scope.p_chip,
                "color": $scope.order.color,
                "combo": $scope.order.combo,
                "receive_name": $scope.order.receive_name,
                "receive_address": $scope.order.receive_address,
                "receive_cellphone": $scope.order.receive_cellphone,
                "user_name": $scope.order.user_name,
                "user_identity": $scope.order.user_identity,
                "user_cellphone": $scope.order.user_cellphone,
                "coupon": $scope.order.coupon,
                "buy_type": $scope.order.buy_type
            }).$promise().then(function(response){

            }, function(response){

            })
        }
    }
]);
