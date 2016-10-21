'use strict';
app.controller('VehiculesListController', function($scope, $state, $rootScope, $window, vehiculesFunctions) {
    $rootScope.active = "vehicules";
    vehiculesFunctions.getAll().success(function(vehicules) {
        $("#loadingIcon").fadeOut(200);
        setTimeout(function() {
            $("#tableData").fadeIn(500);
        }, 600)

        $scope.vehicules = vehicules;
    })
    vehiculesFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
    })

    $scope.deleteVehicule = function(id, license_plate) {
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar al vehículo " + license_plate + "?",
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
                    vehiculesFunctions.delete(id).success(function() {
                        vehiculesFunctions.getAll().success(function(vehicules) {
                            $scope.vehicules = vehicules;
                        })
                    });
                }
            }
        });


    };

});

app.controller('VehiculesCreateController', function($scope, $http, $rootScope, $state, vehiculesFunctions) {
    var val
    $rootScope.active = "vehicules";
    $scope.title = "Registrar vehículo";
    $scope.button = "Registrar";
    $scope.submitColour = function() {
        val = $('#color-rgb').css('background-color');

    }
    vehiculesFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
    })

    $scope.brands = {
        data: [{

            name: "Audi"
        }, {
            name: "Alfa Romeo"
        }, {
            name: "BMW"
        }, {
            name: "BYD"
        }, {
            name: "Chevrolet"
        }, {
            name: "Citroen"
        }, {
            name: "Daewoo"
        }, {
            name: "Daihatsu"
        }, {
            name: "Dodge"
        }, {
            name: "Fiat"
        }, {
            name: "Ford"
        }, {
            name: "Honda"
        }, {
            name: "Hummer"
        }, {
            name: "Hyundai"
        }, {
            name: "Izuzu"
        }, {
            name: "Jaguar"
        }, {
            name: "JAC"
        }, {
            name: "Jeep"
        }, {
            name: "Kia"
        }, {
            name: "Land Rover"
        }, {
            name: "Lexus"
        }, {
            name: "Maserati"
        }, {
            name: "Mazda"
        }, {
            name: "Mercedes Benz"
        }, {
            name: "Mini"
        }, {
            name: "Mitsubishi"
        }, {
            name: "Nissan"
        }, {
            name: "Peugeot"
        }, {
            name: "Porshe"
        }, {
            name: "Renault"
        }, {
            name: "Rolls Royce"
        }, {
            name: "Ssanyong"
        }, {
            name: "Subaru"
        }, {
            name: "Suzuki"
        }, {
            name: "Toyota"
        }, {
            name: "Volkswagen"
        }, {
            name: "Volvo"

        }, ]
    }


    $scope.actionButton = function() {
        console.log($scope.house.id);
        vehiculesFunctions.getAll().success(function(houses) {
            vehiculesFunctions.insert({
                license_plate: $scope.license_plate,
                house_id: $scope.house.id,
                color: val,
                brand: $scope.brand.name,
                company_id: 3
            }).success(function() {
                $state.go('vehicules');
            })


        });
    }
});

app.controller('VehiculesEditController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, vehiculesFunctions) {
    $rootScope.active = "vehicules";
    var residentName, val;
    $scope.title = "Editar vehículo";
    $scope.button = "Editar";
    $scope.submitColour = function() {
        val = $('#color-rgb').css('background-color');

    }
    $scope.brands = {
        data: [{

            name: "Audi"
        }, {
            name: "Alfa Romeo"
        }, {
            name: "BMW"
        }, {
            name: "BYD"
        }, {
            name: "Chevrolet"
        }, {
            name: "Citroen"
        }, {
            name: "Fiat"
        }, {
            name: "Ford"
        }, {
            name: "Honda"
        }, {
            name: "Hyundai"
        }, {
            name: "Izuzu"
        }, {
            name: "Jaguar"
        }, {
            name: "Jeep"
        }, {
            name: "Kia"
        }, {
            name: "Land Rover"
        }, {
            name: "Lexus"
        }, {
            name: "Maserati"
        }, {
            name: "Mazda"
        }, {
            name: "Mercedes Benz"
        }, {
            name: "Mitsubishi"
        }, {
            name: "Nissan"
        }, {
            name: "Peugeot"
        }, {
            name: "Porshe"
        }, {
            name: "Renault"
        }, {
            name: "Ssanyong"
        }, {
            name: "Subaru"
        }, {
            name: "Suzuki"
        }, {
            name: "Toyota"
        }, {
            name: "Volkswagen"
        }, {
            name: "Volvo"

        }, ]
    }


    vehiculesFunctions.get($stateParams.id).success(function(data) {
        vehiculesFunctions.getAllHouses().success(function(houses) {
            $scope.houses = houses;
        })
        $scope.license_plate = data.license_plate;
        $scope.vehiculeId = data.id;
        $scope.color = data.color;


        setTimeout(function() {
            var house = $scope.houses.filter(function(el) {
                return el.id == data.house_id;
            });
            $scope.house = house[0];
            $scope.$apply();
        }, 100);

        // setTimeout(function() {
        //     var house = $scope.brands.data.filter(function(el) {
        //         return el.id == data.brand;
        //     });
        //     $scope.brand = name[0];
        //     $scope.$apply();
        // }, 100);
    });


    $scope.actionButton = function() {
        vehiculesFunctions.getAll().success(function(houses) {

            vehiculesFunctions.update($scope.vehiculeId, {
                license_plate: $scope.license_plate,
                house_id: $scope.house.id,
                color: val,
                brand: $scope.brand.name,
                company_id: 3
            }).success(function() {

                $state.go('vehicules');

            })

        });
    }


});

app.factory('vehiculesFunctions', function($http) {
    return {
        insert: function(data) {
            return $http({
                url: "http://localhost:3000/companies/3/vehicules",
                method: 'POST',
                data: data
            });
        },
        update: function(id, data) {
            return $http({
                url: "http://localhost:3000/companies/3/vehicules/" + id,
                method: 'PUT',
                data: data
            })
        },
        delete: function(id) {
            return $http({
                url: "http://localhost:3000/companies/3/vehicules/" + id,
                method: 'DELETE'
            });
        },
        getAll: function() {
            return $http.get('http://localhost:3000/companies/3/vehicules');
        },
        getAllHouses: function() {
            return $http.get('http://localhost:3000/companies/3/houses');
        },
        get: function(id) {
            return $http.get('http://localhost:3000/companies/3/vehicules/' + id);
        }
    };
});
