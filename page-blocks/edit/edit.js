app.controller("edit", function ($scope, $state) {
  let path = localStorage.getItem("email");
  let user = localStorage.getItem("user");
  $scope.user = JSON.parse(user);
  $scope.cancel = () => {
    $state.go('info');
  }
  $scope.save = user => {
    $scope.database.ref(path).set(user);
    $state.go('info');
  }
})