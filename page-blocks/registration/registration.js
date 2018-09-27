app.controller("registration", function ($scope, $state) {
	$scope.login = () => {
		$state.go('login');
	}
	let input = document.querySelectorAll('.registration input');
	let isError = false;
	$scope.register = (user, email, password, confirmPassword) => {
		isError = false;
		input.forEach(item => {
			item.classList.remove('error-input');
			if (item.value == "") {
				isError = true;
				item.classList.add('error-input');
				$scope.regError = "Fill in all the fields";
			}
		})
		if(isError) return;
		if (confirmPassword != password) {
			$scope.passwordError = "Enter the same password";
			return
		}
  		let path = email.replace('@', '');
  		path = path.replace(/\./g, "");
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