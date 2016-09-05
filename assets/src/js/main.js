 var app = angular.module("ej", []);
    app.controller("flightsCtrl", function ($scope, $http) {
         $http.get('http://ejtestbed.herokuapp.com/flights').success(function (response) {
            console.log("success!");
            $scope.ejdata = response;

        });

        //data filter
        $scope.searchButton = function () {
            $scope.flights = $scope.ejdata.filter(function (ele) {
                $scope.departureTime = new Date(ele.localDepartureTime);
                $scope.arrivalTime = new Date(ele.localArrivalTime);
                $scope.seatsAvailable = ele.seatsAvailable;

                $scope.seatsRequest = $scope.adult + $scope.child;
                return ($scope.departureTime > $scope.startDate && $scope.arrivalTime < $scope.endDate && $scope.seatsAvailable >= $scope.seatsRequest
                    && ele.departureAirportCode == $scope.airportFromCode
                    && ele.arrivalAirportCode == $scope.airportToCode)

            });
        }

    });