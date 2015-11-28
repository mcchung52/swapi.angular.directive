var app = angular.module('app', []);

app.directive("swapiPlanetsSelector", function() {
  return {
    scope: {
      minResidents: '@'
    },
    templateUrl: "selector.html",
    
    controller: function($scope, getPlanetsSvc) {
      getPlanetsSvc.getPlanets(function(planets){
        $scope.planets = planets;
        $scope.minResidents = minResidents;
        console.log(minResidents);
      });

      // this.clicked = function(index) {
      //   $scope.selectedIdx = index;
      //   console.log(index);
      // }
    }
  }
});

app.service("getPlanetsSvc", function($http){
  this.getPlanets = function(cb) {
    var allPlanets = [];
    for (var i=1;i<=7;i++) {
      $http.get("http://swapi.co/api/planets/?page=" + i)
      .then(function(resp){
        allPlanets = allPlanets.concat(resp.data.results);
        cb(allPlanets);
      });
    }    
  }
});

app.directive("swapiPlanet", function() {
  return {
    templateUrl: "planets.html",
    
    controller: function($scope, getPlanetsSvc) {
      getPlanetsSvc.getPlanets(function(planets){
        $scope.planets = planets;
      });
    }
  }
});

app.directive("swapiResident", function() {
  return {
    templateUrl: "selector.html",
    
    controller: function($scope, getPlanetsSvc) {
      getPlanetsSvc.getPlanets(function(planets){
        $scope.planets = planets;
      });
    }
  }
});


// $scope.data = ips;
// $scope.headers = Object.keys($scope.data[Object.keys($scope.data)[0]]); 