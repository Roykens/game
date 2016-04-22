angular.module('App.Models').factory('Chips', [
    '$resource',
    function(
        $resource
    ) {
        return $resource(config.API_ROOT + '/api/v1/chips', {}, {
            getChipsList: {
                method: "get",
                params: {

                },
                isArray: true
            }
        })
    }
])