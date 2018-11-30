var app = angular.module('shopApp', []);
app.controller('mainCtrl', function($scope, $http) {
    $scope.products = [];
    $scope.shoppingCart = [];
    $scope.cartIds = {};


    $scope.newProductName = "";
    $scope.newProductPrice = "";
    $scope.newProductPicture = "";

    $scope.getProducts = function() {
        $http.get('/products').success(function(data) {
            $scope.products = data;
            for (var i = 0; i < $scope.shoppingCart.length; i++) {
                $scope.cartIds[$scope.shoppingCart[i]._id] = false;
            }
        });
    }

    $scope.getProducts();


    $scope.addProduct = function() {
        var newProduct = {
            Name: $scope.newProductName,
            ImageUrl: $scope.newProductPicture,
            Price: $scope.newProductPrice,
            Ordered: 0
        }
        $http.post('/newProduct', newProduct)
            .success(function(data) {
                $scope.newProductName = "";
                $scope.newProductPrice = "";
                $scope.newProductPicture = "";

                $scope.products.push(data);
            });
    }

    $scope.removeItem = function(id) {
        $http.delete('/products/' + id)
            .success(function(data) {
                console.log("Deleted");
            })
        $scope.getProducts();
    }

    $scope.findItemById = function(id) {
        for (var i = 0; i < $scope.products.length; i++) {
            if ($scope.products[i]._id == id) {
                return $scope.products[i];
            }
        }
    }

    $scope.updateCart = function(id) {
        var idx = $scope.shoppingCart.indexOf($scope.findItemById(id));

        if (idx > -1) {
            $scope.shoppingCart.splice(idx, 1);
            $scope.cartIds[id] = false;
        }

        else {
            $scope.shoppingCart.push($scope.findItemById(id));
            $scope.cartIds[id] = true;
        }

        console.log($scope.cartIds);
    }

    $scope.sendOrder = function() {
        for (var i = 0; i < $scope.shoppingCart.length; i++) {
            $http.put('/products/' + $scope.shoppingCart[i]._id)
                .success(function(data) {
                    console.log("Added order");
                })
        }
        $scope.shoppingCart = [];
        for (var i = 0; i < $scope.shoppingCart.length; i++) {
            $scope.cartIds[$scope.shoppingCart[i]._id] = false;
        }
        alert("Order Submitted!");
    }

})
