var main_module = angular.module('finneas_stockholm')

main_module
    .filter('billionPerYear', function(){
        return function(input){
            return `${input} billion per annum`
        };
    })
    .filter('millionPerYear', function(){
        return function(input){
            return `${input} million per annum`
        }
    })
    .filter('moneyVelocity', function(){
        return function(input){
            return `${input} turnover rate per $1 GDP per annum`
        }
    })
    .filter('APR', function(){
        return function(input){
            return `${input} % APR`
        }
    })
    .filter('percent', function(){
        return function(input){
            return `${input} %`
        }
    })
    .filter('houses', function(){
        return function(input){
            return `${input} housing units per annum`
        }
    })
    .filter('oil', function(){
        return function(input){
            return `$${input} per barrel`
        }
    })
    .filter('payroll', function(){
        return function(input){
            return `${input} thousands of people per annum`
        }
    })

