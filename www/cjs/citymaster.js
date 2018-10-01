var citymasterApp = angular.module('citymasterApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
citymasterApp.controller('citymasterController', function ($scope, $http, $window) {


    //add data
    $scope.addkitchen = function () {
            
            //alert($scope.pridected1);
           
               // alert("name"+ kitcheneadd.name +"ctn" + $scope.kitcheneadd.ctn +"predicted" +kitchenedit.predicted );
        $http({
            method: 'POST',
            url: '/api/addcitymaster/',
            data: $scope.kitcheneadd,
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

    //edit data
    $scope.editcitymaster = function () {
        $scope.bal1 = $scope.getcitymasterdata[0].quantity;
        $scope.bal2 = $scope.getcitymasterdata[0].ctn;
        $scope.total = $scope.bal1 * $scope.bal2;
        if ($scope.total <= $scope.getcitymasterdata[0].predicted) {
            $http({
                method: 'POST',
                url: '/api/editcitymaster/',
                data: $scope.getcitymasterdata,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (data) {
                // console.log(data);
                if (!data.success) {
                    $scope.formMessage = data.message;
                    $scope.status = data.status;
                     if ($scope.status == 0) {
                        alert('Edit citymaster  Successful');
                        $window.location.reload();
                    } else {
                        alert('Unsuccessful');
                        $window.location.reload();
                    }
                }
                ;
            })


        } else
        {
            alert("there is some issue");

        }


    };
    //delete data
    $scope.deletecitymaster = function (cityid) {
        $http({
            method: 'DELETE',
            url: '/api/deletecitymaster/' + cityid,
            dataType: 'jsonp'
        }).success(function (data) {
            if (!data.success) {
                $scope.formMessage = data.message;
                $scope.status = data.status;
                if ($scope.status == 0) {
                    alert('Delete citymaster Successful');
                    $window.location.reload();
                } else {
                    alert('Unsuccessful');
                    $window.location.reload();
                }
            }
            ;
        })
    };
    $scope.getcitymaster = function (cityid) {
        $http({
            method: 'GET',
            url: '/api/getcitymaster/' + cityid,
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.getcitymasterdata = response.data;
            // console.log($scope.getcitymasterdata);
        });
    };
    $scope.listcitymaster = function () {
        //alert($scope.total);
        $http({
            method: 'GET',
            url: '/api/listcitymaster',
            dataType: 'jsonp'
        }).then(function (response) {
            $scope.listcitymasterdata = response.data;
            console.log($scope.listcitymasterdata);
            //console.log($scope.listcitymasterdata);
            //$scope.done = [];
            
            $scope.mycountry = $scope.listcitymasterdata;
            $scope.pagedItems = $scope.listcitymasterdata;
            $scope.currentPage = 0;
            $scope.entryLimit = 5;
            $scope.maxpage = Math.ceil($scope.listcitymasterdata.length / $scope.pageSize);
        });
    };

});