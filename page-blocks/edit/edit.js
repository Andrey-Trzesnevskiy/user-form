app.controller("edit", function ($scope, $state, $transferService) {
  $scope.user = $transferService.getData('userData');
  let path = localStorage.getItem("email");
  $scope.cancel = () => {
    $state.go('info');
  }
  $scope.save = user => {
    $scope.database.ref(path).set(user);
    $state.go('info');
  }
})