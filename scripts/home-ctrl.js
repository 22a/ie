angular.module('meehan')
.controller('HomeController', ['$scope', '$filter', function($scope, $filter) {
  var today = new Date();
  $scope.year = $filter("date")(today,'yyyy') - 1995;
  if((parseInt($filter("date")(today,'M')) < 4) || (($filter("date")(today,'M') === "4" )&&(parseInt($filter("date")(today,'d')) < 13 )))
  {
      $scope.year = $scope.year - 1;
  }
}]);
