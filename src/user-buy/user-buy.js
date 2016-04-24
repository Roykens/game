angular.module('App.User.Buy', []).controller('App.User.Buy.Controller', [
    '$scope',
    '$state',
    "$ionicHistory",
    "$sce",
    "$ionicSlideBoxDelegate",
    "Chips",
    function(
        $scope,
        $state,
        $ionicHistory,
        $sce,
        $ionicSlideBoxDelegate,
        Chips
    ) {
        $scope.back = function() { $ionicHistory.goBack(); }


        // 获取套餐
        $scope.getCombos = function(arr) {
            console.log(arr.packageprice_set);
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
            $ionicSlideBoxDelegate.update();
        }, function(response) {
            // console.log(response);
        })

        // 选择套餐
        $scope.choseType = 1;
        $scope.selectType = function(index) {
            $scope.choseType = index;
            $scope.price_field = $scope.choseColor + "_" + $scope.choseType;
            // console.log($scope.price_field);
        }

        // 选择颜色
        $scope.choseColor = 1;
        $scope.selectColor = function(index) {
            $scope.choseColor = index;
            $scope.price_field = $scope.choseColor + "_" + $scope.choseType;
            // console.log($scope.price_field);
        }

        // 价格字段初始化
        $scope.price_field = $scope.choseColor + "_" + $scope.choseType;

        // tab切换
        $scope.activeTab = 1;
        $scope.setTabs = function(index) {
            $scope.activeTab = index;
        }

        // 购买
        $scope.buy = function(buy_type) {
            $state.go('order', { id: $scope.chip.id, color: $scope.choseColor, combo: $scope.choseType, buy_type: buy_type });
        }
    }
]);
