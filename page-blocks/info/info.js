app.controller("info", function ($scope, $state) {

	let path = localStorage.getItem("email");
	let starCountRef = $scope.database.ref(path).once('value')
  		.then(snapshot => {
  			$scope.user = snapshot.val();
        let user = JSON.stringify($scope.user);
        localStorage.setItem("user", user);
  			$scope.$apply();
  		});
  	$scope.logout = () => {
  		$scope.auth.signOut().then(() => {
  		localStorage.removeItem("email");	
      localStorage.removeItem("user");
  		$state.go('login');
		})
		.catch(error => {
  			console.log(error);
		});
  	}
  	$scope.edit = () => {
  		$state.go('edit');
  	}	
})