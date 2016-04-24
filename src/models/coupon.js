angular.module('App.Models').factory('Coupon', [
    '$resource',
    function(
        $resource
    ) {
        return $resource(config.API_ROOT + '/api/v1/coupon', {}, {
            getCouponDetail: {
                method: "get",
                params: {

                }
            }
        })
    }
])
