var main_module = angular.module('finneas_stockholm')

main_module.filter('GDP', function(){
    return function(input){
        return `${input} billion per year`
    };
})