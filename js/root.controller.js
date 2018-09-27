app.controller("root.controller", function ($scope) {
    let config = {
        apiKey: "AIzaSyAFfY0qaYLIRkllkeUJzoTC5_yrYr4tJZ4",
        authDomain: "form-2f1c1.firebaseapp.com",
        databaseURL: "https://form-2f1c1.firebaseio.com",
        projectId: "form-2f1c1",
        storageBucket: "form-2f1c1.appspot.com",
        messagingSenderId: "509958789338"
      };
    $scope.firebaseApp = firebase.initializeApp(config);
    $scope.database = firebase.database();
    $scope.auth = firebase.auth();
})