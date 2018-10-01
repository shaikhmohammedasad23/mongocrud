var ProductmasterApp = angular.module('ProductmasterApp', ['ui.bootstrap'])
ProductmasterApp.controller('ProductmasterController', function ($scope, $http, $window) {


    //add data
    $scope.Productadd = function () {
        // alert("asad");
        $http({
            method: 'POST',
            url: '/api/addproduct/',
            data: $scope.product,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Added kitchen Successfully Add');
                    $window.location.reload();
                } else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            };

        })
    };


    $scope.listcitymaster = function () {
        //alert($scope.total);
        $http({
            method: 'GET',
            url: '/api/listcitymaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listcitymasterdata = response.data;
            //console.log($scope.listcitymasterdata);
            //console.log($scope.listcitymasterdata);
            //$scope.done = [];


        });
    };

    $scope.listcityproduct = function () {
        //alert($scope.total);
        $http({
            method: 'GET',
            url: '/api/listproduct',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listproduct = response.data;
            console.log($scope.listproduct);
            // for (var i = 0; i < $scope.listproduct.length; i++) {
            //     $scope.listdata = $scope.listproduct[i].id[0].categotyname;
            //     console.log($scope.listdata);
            // }

            //console.log($scope.listcitymasterdata);
            //$scope.done = [];


        });
    };


});