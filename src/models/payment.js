angular.module('App.Models').factory('Pay', [
    '$resource',
    function(
        $resource
    ) {
        return $resource(config.API_ROOT + '/api/v1/payment/:event', {}, {
            wxPay: {
                method: "post",
                params: {
                    event: 'get_wechat_bridge_params'
                }
            }
        })
    }
])
