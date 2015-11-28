var app = angular.module('app', []);

app.directive("swapiPlanetsSelector", function() {
  return {
    scope: {
      minResidents: '@'
    },
    templateUrl: "selector.html",
    
    controller: function($scope, swapiSvc) {
      $scope.planets = [];
      swapiSvc.getPlanets(function(planets, page){
        $scope.planets = planets;
        $scope.pageNum = page;
        console.log($scope.planets);
        console.log($scope.planetName);
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
        $scope.resCnt = 0;
        console.log("inside 'on' listening to PLANET", planet);
        $scope.planetName = planet.name;
        $scope.planetPop = planet.population;
        $scope.resCnt = planet.residents.length;
      });
    }
  }
});

app.directive("swapiResident", function() {
  return {
    templateUrl: "resident.html",
    
    controller: function($scope, swapiSvc) {
      console.log('inside resident directive');

      $scope.$on('PLANET', function(_, planet){
        $scope.residents = [];
        $scope.loadedRes = 0;
        swapiSvc.getResidentFromPlanet(planet, function(residents){
          console.log(residents);
          $scope.residents = residents;
          $scope.loadedRes++;
          console.log(loadedRes);
        });        
      });
    }
  }
});

app.service("swapiSvc", function($http){
  var allPlanets = [];
  var allResidents = [];
  
  this.getPlanets = function(cb) {
    for (var i=1;i<=7;i++) {
      $http.get("http://swapi.co/api/planets/?page=" + i)
      .then(function(resp){
        console.log('inside getPlanets', resp);
        allPlanets = allPlanets.concat(resp.data.results);
        var page;
        if (resp.data.next == null) {
          page = Number(resp.data.previous.match(/\d$/)) + 1;
        } else {
          page = resp.data.next.match(/\d$/) - 1;
        }
        console.log(page);
        cb(allPlanets, page);
      });
    }
  }
  this.getResidentFromPlanet = function(planet, cb) {
    for (var i=0;i<planet.residents.length;i++) {
      var residentId = planet.residents[i].match(/(\d+)\/$/)[1];
      console.log(residentId);
      $http.get("http://swapi.co/api/people/" + residentId + '/')
      .then(function(resp){
        console.log(resp);
        allResidents = allResidents.concat(resp.data);
        cb(allResidents);
      });
    }
  }
});
