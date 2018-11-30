var app = angular.module('shopApp', []);
app.controller('mainCtrl', function($scope, $http) {
    $scope.products = [];
    $scope.shoppingCart = [];

    $scope.newProductName = "";
    $scope.newProductPrice = "";
    $scope.newProductPicture = "";

    $scope.getProducts = function() {
        $http.get('/products').success(function(data) {
            $scope.products = data;
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
})
