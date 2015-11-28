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
      });
      
      $scope.showPlanet = function(planet) {
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
      $scope.$on('PLANET', function(_, planet){
        $scope.loadedRes = 0;
        swapiSvc.getResidentFromPlanet(planet, function(residents){
          $scope.residents = residents;
          $scope.loadedRes++;
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
        allPlanets = allPlanets.concat(resp.data.results);
        var page;
        if (resp.data.next == null) {
          page = Number(resp.data.previous.match(/\d$/)) + 1;
        } else {
          page = resp.data.next.match(/\d$/) - 1;
        }
        cb(allPlanets, page);
      });
    }
  }
  this.getResidentFromPlanet = function(planet, cb) {
    allResidents = [];
    for (var i=0;i<planet.residents.length;i++) {
      var residentId = planet.residents[i].match(/(\d+)\/$/)[1];
      $http.get("http://swapi.co/api/people/" + residentId + '/')
      .then(function(resp){
        allResidents = allResidents.concat(resp.data);
        cb(allResidents);
      });
    }
  }
});
