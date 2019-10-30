angular.module('finneas_stockholm', [])
        .controller('market', ['$scope', function($scope){

        }])
        .factory('prices', [ '$http', function($http){

            var getClosingPrice = function(ticker, date){
                var url = getEODUrl(ticker)
                url = appendColumn(url, quandl.columnValues.close)
                url = appendLimit(url, 1)
                return $http.get(url).then(function(response){
                    console.log(response)
                })

            }

            return{
                closingPrice: getClosingPrice
            }
        }])