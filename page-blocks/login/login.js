app.controller("login", function ($scope, $state) {
	let input = document.querySelectorAll('.login input');
	let isError = false;
	$scope.register = () => {
		$state.go('registration');
	}
	$scope.login = user => {
		isError = false;
		input.forEach(item => {
			item.classList.remove('error-input');
			if (item.value == "") {
				isError = true;
				item.classList.add('error-input');
				$scope.inputError = "Fill in all the fields";
			}
		})
		if(isError) return;
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