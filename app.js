var app = angular.module('app', []);

app.directive("swapiPlanetsSelector", function() {
  return {
    templateUrl: `selector.html`,
    
    controller: function($scope, $interval) {
      // $scope.data = ips;
      // $scope.headers = Object.keys($scope.data[Object.keys($scope.data)[0]]);
    }
    
  }
});