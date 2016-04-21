angular.module('App.User.Safe', ['App.User.BindPhone', 'App.User.BindEmail']).controller('App.User.Safe.Controller', [
    '$scope',
    'User',
    function(
        $scope,
        User
    ) {

        // $scope.news = [1,2,3,2]
        $scope.user = User.getUserProfile();

        // $scope.user.$promise.then(function(user) {
        //     console.log('aa')

        // })



    }
]);