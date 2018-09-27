let app = angular.module('app', ['ui.router', 'firebase']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/login");

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'page-blocks/login/l-login.html',
            controller: 'login'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'page-blocks/registration/l-registration.html',
            controller: 'registration'
        })
        .state('edit', {
            url: '/edit',
            templateUrl: 'page-blocks/edit/l-edit.html',
            controller: 'edit'
        })
        .state('info', {
            url: '/info',
            templateUrl: 'page-blocks/info/l-info.html',
            controller: 'info'
        })
});
app.factory('$transferService', function(){
    let data = {}, obj = {};

    obj.setData = function(params){
        data[params.name] = params.data;
    }

    obj.getData = function(name) {
        return data[name]
    }

    return obj;
})