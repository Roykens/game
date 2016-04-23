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
        $ionicSlideBoxDelegate.update();
        $scope.back = function() { $ionicHistory.goBack(); }


        // 获取套餐
        $scope.getCombos = function(arr){
            var combos_list = [];
            for (var i = 0; i < arr.length; i++) {
                combos_list.push(arr['packageprice_set'][i]['combo']);
            }
            // debugger;
            $scope.combos_list = combos_list;
        }

        // 获取颜色
        $scope.getColors = function(arr){
            var colors_list = [];
            for (var i = 0; i < arr.length; i++) {
                colors_list.push(arr['packageprice_set'][i]['color']);
            }
            $scope.colors_list = colors_list;
        }

        // 获取芯片信息列表
        Chips.getChipsList().$promise.then(function(response) {
            $scope.chips_list = response;
            $scope.chip = $scope.chips_list[0];
            $scope.getCombos($scope.chip);
            $scope.getColors($scope.chip);
            console.log( $scope.combos_list );
        }, function(response) {
            // console.log(response);
        })

        // 选择套餐
        $scope.choseType = 1;
        $scope.selectType = function(index) {
            $scope.choseType = index;
            console.log($scope.choseType);
        }

        // 选择颜色
        $scope.choseColor = 1;
        $scope.selectColor = function(index) {
            $scope.choseColor = index;
            console.log($scope.choseColor);
        }

        // tab切换
        $scope.activeTab = 1;
        $scope.setTabs = function(index) {
            $scope.activeTab = index;
        }

    }
]);
