angular.module('App.Models').factory('Chips', [
    '$resource',
    function(
        $resource
    ) {
        return $resource(config.API_ROOT + '/api/v1/chips/:event', {}, {
            getChipsList: {
                method: "get",
                params: {

                },
                isArray: true
            },
            placeOrder: {
                method: "get",
                params: {
                    event: 'order'
                },
                isArray: true
            }
        })
    }
])
