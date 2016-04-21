angular.module('App.GamePackage', []).controller('App.GamePackage.Controller', [
    '$scope',
    '$state',
    'Product',
    'Event',
    '$sce',
    function(
        $scope,
        $state,
        Product,
        Event,
        $sce
    ) {
        $scope.$state = $state;

        $scope.product_list = Product.getProductList({
            event_id: $state.params.event_id
        });

        var product_id = '';
        $scope.changeCheckbox = function(product, $event) {
            $event.stopPropagation();
            //$event.preventDefault()
            if(!product.checkbox){
                product.checkbox = false;
                product.show = false;
                product_id = '';
            }else{
                $scope.product_list.forEach(function(product) {
                    product.checkbox = false;
                });
                product.checkbox = true;
                product.show = true;
                product_id = product.id;
            }
        };

        $scope.changeDetail = function(product) {
            if(!product.introduce || product.introduce == ""){
                return;
            }
            product.show = !product.show;
        };

        $scope.trustAsHtml = function (string) {
            return $sce.trustAsHtml(string)
        };

        $scope.trustAsHtmlaaa = function (text) {
            return $sce.trustAsHtml(text.introduce);
        };

        $scope.postPersonSignProduct = function() {
            //Event.postPersonSignProduct({
            //    id: $state.params.person_sign_id
            //}, {
            //    "product_id": product_id
            //}).$promise.then(function(reps) {
            //    $state.go('game-person-sign-detail', {
            //        person_sign_id: $state.params.person_sign_id
            //    })
            //}, function(error) {
            //    debugger
            //});
            $("#productId").val(product_id);
            $state.go('event-declaration', {
                event_id: $state.params.event_id
            });
        }
    }
]);