app.controller("registration", function ($scope, $state) {
	$scope.login = () => {
		$state.go('login');
	}
	$scope.register = (user, email, password, confirmPassword) => {
		if (confirmPassword != password) {
			$scope.passwordError = "Enter the same password";
			return
		}
  		let path = email.replace('@', '');
  		path = path.replace('.', '');
  		localStorage.setItem("email", path);
  		let starCountRef = $scope.database.ref(path).once('value')
  		.then(snapshot => {
  			if (!snapshot.val()) {
  				$scope.database.ref(path).set(user);
  				$scope.auth.createUserWithEmailAndPassword(email, password);
  				$scope.auth.signInWithEmailAndPassword(email, password);
  				localStorage.setItem("email", path);
  				$state.go('info');
  			}
  			else {
  				$scope.userError = "User with such e-mail is already exists!";
  				$scope.$apply();
  			}
  		});
	}  
})