app.service('AuthService', [  '$rootScope','$firebase', '$firebaseAuth', '$location', '$q',
function AuthService( $rootScope, $firebase, $firebaseAuth, $location, $q ){
    var firebaseObj = new Firebase('https://form-2f1c1.firebaseio.com');
    var userStorageKey = 'authUser';
    var authUser = { status:false, data: false };

    return {
        createUserByEmail: function(email, password){
            var deferred = $q.defer();
            firebaseObj.createUser({
                email    : email,
                password : password
            }, function(error) {
                if (error === null) {
                    deferred.resolve({
                        status: true
                    });
                } else {
                    deferred.resolve({
                        status: false,
                        error: error
                    });
                }
            });

            return deferred.promise;
        },
        signInUserByEmail: function(email, password){
            var deferred = $q.defer();
            firebaseObj.authWithPassword({
                email    : email,
                password : password
            }, function(error, data) {
                if (error === null) {
                    // user authenticated with Firebase
                    authUser = {
                        status: true,
                        data: data
                    };
                    deferred.resolve(authUser);
                    //$.jStorage.set(userStorageKey, authUser);
                } else {
                    deferred.resolve({
                        status: false,
                        error: error
                    });
                }
            });

            return deferred.promise;
        },
        changeUserPass: function(email, password, newPassword){
            firebaseObj.changePassword({
                email       : email,
                oldPassword : password,
                newPassword : newPassword
            }, function(error) {
                if (error === null) {
                    console.log("Password changed successfully");
                } else {
                    console.log("Error changing password:", error);
                }
            });
        },
        resetAndSendPassword: function(email){
            firebaseObj.resetPassword({
                email : email
            }, function(error) {
                if (error === null) {
                    console.log("Password reset email sent successfully");
                } else {
                    console.log("Error sending password reset email:", error);
                }
            });
        },
        deleteUser: function(email, password){
            firebaseObj.removeUser({
                email    : email,
                password : password
            }, function(error) {
                if (error === null) {
                    console.log("User removed successfully");
                } else {
                    console.log("Error removing user:", error);
                }
            });
        },
        getUserState:function(){
            //console.info(Date(authUser.data.expires));

            console.info(authUser);
            if(authUser.data){
                var data = firebaseObj.getAuth();
                authUser = {
                    status: data ? true : false,
                    data: (data == null) ? {} : data
                };
                $.jStorage.set(userStorageKey, authUser);
            }
            return authUser.status;
        },
        logOut: function(){
            $firebaseAuth(firebaseObj).$unauth();
            $.jStorage.deleteKey(userStorageKey);
            $rootScope.$userState = this.getUserState();
        },
        getAuthUser: function(){
            return authUser.data;
        }
    };
}])