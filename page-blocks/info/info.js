app.controller("info", function ($scope, $state, $transferService) {

	let path = localStorage.getItem("email");
	let starCountRef = $scope.database.ref(path).once('value')
  		.then(snapshot => {
  			$scope.user = snapshot.val();
  			$transferService.setData({name: 'userData', data: $scope.user});
  			$scope.$apply();
  		});
  	$scope.logout = () => {
  		$scope.auth.signOut().then(() => {
  		localStorage.removeItem("email");	
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