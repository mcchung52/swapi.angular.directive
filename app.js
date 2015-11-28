var app = angular.module('app', []);

// app.controller("mainCtrl", function(){
//   this.clicked = function(index) {
//     $scope.selectedIdx = index;
//     console.log(index);
//   }
  
// });

app.directive("swapiPlanetsSelector", function() {
  return {
    scope: {
      minResidents: '@'
    },
    templateUrl: "selector.html",
    
    controller: function($scope, swapiSvc) {
      swapiSvc.getPlanets(function(planets){
        $scope.planets = planets;
        // $scope.minResidents = minResidents;
        // console.log(minResidents);
        console.log($scope.planets);
        console.log($scope.planetName);
        //console.log($scope.minResidents);
      });
      
      $scope.showPlanet = function(planet) {
        console.log('inside showplanet', planet);
        $scope.$emit('PLANET', planet);
      }
    }
  }
});

app.directive("swapiPlanet", function() {
  return {
    templateUrl: "planet.html",
    
    controller: function($scope, swapiSvc) {
      $scope.$on('PLANET', function(_, planet){
        console.log("inside 'on' listening to PLANET", planet);
        $scope.planetName = planet.name;
        $scope.planetPop = planet.population;
      });
    }
  }
});

app.directive("swapiResident", function() {
  return {
    templateUrl: "resident.html",
    
    controller: function($scope, swapiSvc) {
      // $scope.$on('PLANET', function(_, planet){
      //   console.log("inside 'on' listening to PLANET", planet);
      //   $scope.planetName = planet.name;
      //   $scope.planetPop = planet.population;
      // });
      console.log('inside resident directive');
      swapiSvc.getResidents(function(residents){
        console.log(residents);
      });
    }
  }
});

app.service("swapiSvc", function($http){
  var allPlanets = [];
  
  this.getPlanets = function(cb) {
    for (var i=1;i<=7;i++) {
      $http.get("http://swapi.co/api/planets/?page=" + i)
      .then(function(resp){
        allPlanets = allPlanets.concat(resp.data.results);
        cb(allPlanets);
      });
    }
  }
  this.getResidents = function(cb) {
    for (var i=1;i<=7;i++) {
      $http.get("http://swapi.co/api/planets/?page=" + i)
      .then(function(resp){
        allResidents = allResidents.concat(resp.data.results);
        cb(allResidents);
      });
    }
  }
});



// $scope.data = ips;
// $scope.headers = Object.keys($scope.data[Object.keys($scope.data)[0]]); 