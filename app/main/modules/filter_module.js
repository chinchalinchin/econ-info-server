var main_module = angular.module('finneas_stockholm')

main_module
    .filter('billionPerYear', function(){
        return function(input){
            return `${input} billion per year`
        };
    })
    .filter('moneyVelocity', function(){
        return function(input){
            return `${input} turnover rate per $1 GDP`
        }
    })
