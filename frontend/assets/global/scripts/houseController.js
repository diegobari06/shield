app.controller('HousesListController',function($scope,$state,$rootScope,$window,housesFunctions,commonMethods){
      $rootScope.active = "houses";
  
      housesFunctions.getAll().success(function(houses){
          $scope.houses = houses;
})

      $scope.deleteHouse=function(id){
              bootbox.confirm("¿Desea eliminar esta casa?", function(result) {
                  if(result){
                      housesFunctions.delete(id).success(function(){
                          housesFunctions.getAll().success(function(houses){
                              $scope.houses = houses;})
                              toastr["success"]("Se ha eliminado la casa correctamente");
                          });
                  }
              });
        }
});


app.controller('HousesCreateController',function($scope,$http,$rootScope,$state,housesFunctions,commonMethods){
  $rootScope.active = "houses";
      $scope.title = "Registrar casa";
        $scope.button = "Registrar";

      $scope.actionButton = function(){

           housesFunctions.getAll().success(function(houses){
              //  if(commonMethods.validateName(residents,$scope.residentName)){
                commonMethods.waitingMessage();
                    housesFunctions.insert({house_number: $scope.house_number,extension: $scope.extension,company_id:3}).success(function(){
                            bootbox.hideAll();
                          $state.go('houses');
                          toastr["success"]("Se registró la casa correctamente");


                    })
              //  } else {
              //       popUp.show("Resident name already exist.");
              //  }

           });
     }
});


app.controller('HousesEditController',function($scope,$http,$state,$rootScope,$stateParams,$timeout,housesFunctions){
  $rootScope.active = "houses";
      var residentName;
      $scope.title = "Editar casa";
      $scope.button = "Editar";

      housesFunctions.get($stateParams.id).success(function(data) {
           $scope.house_number = data.house_number;
           $scope.house_id = data.id;
          $scope.extension = data.extension;



      });

      $scope.actionButton = function(){
           housesFunctions.getAll().success(function(houses){
              //  if(commonMethods.validateName(residents,$scope.residentName)){
                    housesFunctions.update($scope.house_id,{house_number: $scope.house_number,extension: $scope.extension}).success(function(){

                          $state.go('houses');
                          // popUp.success("Resident has been created successfully");
                    })
              //  } else {
              //       popUp.show("Resident name already exist.");
              //  }

           });
     }


});

app.factory('housesFunctions', function($http){
     return {
        insert: function(data){
          return $http({
            url: "http://localhost:3000/companies/3/houses",
            method: 'POST',
            data: data
            });
        },
        update: function(id,data){
          return $http({
              url: "http://localhost:3000/companies/3/houses/"+id,
              method: 'PUT',
              data: data
            })
        },
        delete: function(id){
          return $http({
              url: "http://localhost:3000/companies/3/houses/"+id,
              method: 'DELETE'
            });
        },
        getAll: function(){
          return $http.get('http://localhost:3000/companies/3/houses');
        },
        get: function(id){
          return $http.get('http://localhost:3000/companies/3/houses/'+id)
        }
      };
});
