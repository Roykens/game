angular.module('App.Models').factory('Order', [
    '$resource',
    function(
        $resource
    ) {
        return $resource(config.API_ROOT + '/api/v1/chip/order', {}, {
            placeOrder: {
                method: "post",
                params: {

                }
            }
        })
    }
])
