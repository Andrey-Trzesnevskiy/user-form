app.controller("login", function ($scope, $state) {
	$scope.register = () => {
		$state.go('registration');
	}
	$scope.login = user => {
		$scope.auth.signInWithEmailAndPassword(user.email, user.password)
		.then(()=> {
			let path = user.email.replace('@', '');
  			path = path.replace('.', '');
			localStorage.setItem("email", path);
			$state.go('info');
		})
		.catch(error => {
			$scope.errorSignIn = "User is not found";
			$scope.$apply();
		});
		
	}
})