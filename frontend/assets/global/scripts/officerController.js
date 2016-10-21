app.controller('OfficersListController', function($scope, $state, $rootScope, $window, officersFunctions, commonMethods) {

    $rootScope.active = "officers";
    officersFunctions.getAll().success(function(officers) {
        $("#loadingIcon").fadeOut(200);
        setTimeout(function() {
            $("#tableData").fadeIn(500);
        }, 600)

        $scope.officers = officers;
    })
    $scope.deleteOfficer = function(id, name, last_name) {
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar al oficial " + name + " " + last_name + "?",
            buttons: {
                confirm: {
                    label: 'Aceptar',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-danger'
                }
            },
            callback: function(result) {
                if (result) {
                    officersFunctions.delete(id).success(function() {
                        officersFunctions.getAll().success(function(officers) {
                            $scope.officers = officers;
                        })
                    });
                }
            }
        });


    };

});

app.controller('OfficersCreateController', function($scope, $http, $rootScope, $state, officersFunctions) {
    $rootScope.active = "officers";
    $scope.title = "Registrar oficial";
    $scope.button = "Registrar";
    $scope.actionButton = function() {

        officersFunctions.getAll().success(function(officer) {

            officersFunctions.insert({
                name: $scope.name,
                last_name: $scope.last_name,
                second_last_name: $scope.second_last_name,
                company_id: 3,
                identification_number: $scope.identification_number
            }).success(function() {
                $state.go('officers');

            })


        });
    }
});


app.controller('OfficersEditController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, officersFunctions) {
    $rootScope.active = "officers";
    var officerId;
    $scope.title = "Editar oficial";
    $scope.button = "Editar";
    officersFunctions.get($stateParams.id).success(function(data) {
        $scope.name = data.name;
        officerId = data.id;
        $scope.last_name = data.last_name;
        $scope.second_last_name = data.second_last_name;
        $scope.identification_number = data.identification_number;

    });

    $scope.actionButton = function() {
        officersFunctions.getAll().success(function(officers) {

            officersFunctions.update(officerId, {
                name: $scope.name,
                last_name: $scope.last_name,
                second_last_name: $scope.second_last_name,
                company_id: 3,
                identification_number: $scope.identification_number
            }).success(function() {

                $state.go('officers');
            })


        });
    }


});

app.factory('officersFunctions', function($http) {
    return {
        insert: function(data) {
            return $http({
                url: "http://localhost:3000/companies/3/officers",
                method: 'POST',
                data: data
            });
        },
        update: function(id, data) {
            return $http({
                url: "http://localhost:3000/companies/3/officers/" + id,
                method: 'PUT',
                data: data
            })
        },
        delete: function(id) {
            return $http({
                url: "http://localhost:3000/companies/3/officers/" + id,
                method: 'DELETE'
            });
        },
        getAll: function() {
            return $http.get('http://localhost:3000/companies/3/officers');
        },
        get: function(id) {
            return $http.get('http://localhost:3000/companies/3/officers/' + id)
        }
    };
});
