angular.module('App.User.Buy', []).controller('App.User.Buy.Controller', [
    '$scope',
    '$state',
    "$ionicHistory",
    function(
        $scope,
        $state,
        $ionicHistory
    ) {
        $scope.back = function() { $ionicHistory.goBack(); }

        // 选择套餐
        $scope.choseType = 1;
        $scope.selectType = function(index){
        	$scope.choseType = index;
        	console.log($scope.choseType);
        }

        // tab切换
        $scope.activeTab = 1;
        $scope.setTabs = function(index) {
            $scope.activeTab = index;
        }
    }
]);
