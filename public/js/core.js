var toDoApp = angular.module('myTodoApp',[]);

function mainController($scope, $http){
	$scope.formData = {};

	$http.get('/api/todos').success(function(data)
		{
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error:' + data);
		});
	$scope.createItem = function(){
		$http.post('/api/todos', $scope.formData)
		.success(function(data){
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data)
		});
	};
	$scope.markComplete = function(id){
		$http.delete('/api/todos/'+id)
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: '+ data);
		});
	};
}