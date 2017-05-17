myApp.controller("QuestionCtrl", ['$scope', '$location', '$uibModal', '$log'
	, '$document', 'questionFactory'
  
	, function ($scope, $location, $uibModal, $log, $document, questionFactory)
	{
		$scope.success = false;
		$scope.correct = [
		{
			id: "A"
			, name: "option A"
    }
		, {
			id: "B"
			, name: "Option B"
    , }
		, {
			id: "C"
			, name: "option C"
    }
		, {
			id: "D"
			, name: "Option D"
    , }];
		$scope.ques = [];
		getQuestionbyuser();
		doPagainate();
		$scope.question = new Object();
		$scope.heading = 'lklkl';
		$scope.oneAtATime = true;
		$scope.test = function (x)
		{
			console.log('hh' + x.question);
		};
		$scope.save = function (x)
		{
			console.log($scope.question);
		};

		function getQuestionbyuser()
		{
			questionFactory.getbyUser()
				.then(function (success)
				{
					$scope.totalItems = success.data.length
					angular.copy(success.data, $scope.ques)
				})
		};

		function doPagainate()
		{
			$scope.viewby = 3;
			$scope.currentPage = 4;
			$scope.itemsPerPage = $scope.viewby;
			$scope.maxSize = 5; //Number of pager buttons to show
			$scope.setPage = function (pageNo)
			{
				$scope.currentPage = pageNo;
			};
			$scope.pageChanged = function ()
			{
				console.log('Page changed to: ' + $scope.currentPage);
			};
			$scope.setItemsPerPage = function (num)
			{
				$scope.itemsPerPage = num;
				$scope.currentPage = 1; //reset to first paghe
			}
		}
		$scope.openEditmodal = function (data, size, parentSelector)
		{
			console.log(data);
			var parentElem = parentSelector ? angular.element($document[0].querySelector(
				'.modal-demo ' + parentSelector)) : undefined;
			console.log(data);
			var modalInstance = $uibModal.open(
			{
				templateUrl: 'partials/questionModal.html'
				, controller: 'questionModalCtrl'
				, size: size
				, appendTo: parentElem
				, resolve:
				{
					updatedQues: function ()
					{
						console.log(data);
						return data;
					}
					, update: function ()
					{
						return true;
					}
				}
			});
			modalInstance.result.then(function (selectedItem)
			{
				console.log(selectedItem);
				$ctrl.selected = selectedItem;
			}, function ()
			{
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
		$scope.open = function (data, size, parentSelector)
		{
			var parentElem = parentSelector ? angular.element($document[0].querySelector(
				'.modal-demo ' + parentSelector)) : undefined;
			console.log(data);
			var modalInstance = $uibModal.open(
			{
				templateUrl: 'partials/questionModal.html',
                controller: 'questionModalCtrl',
                size: size,
                appendTo: parentElem
				, resolve:
				{
					updatedQues: function ()
					{
						console.log(data);
						return data;
					}
				}
			});
			modalInstance.result.then(function (selectedItem)
			{
				$ctrl.selected = selectedItem;
			},function ()
            {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
		
        $scope.add = function (size, parentSelector)
		{
			var parentElem = parentSelector ? angular.element($document[0].querySelector(
				'.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open(
			{
				templateUrl: 'partials/questionModal.html',
                 controller: 'questionModalCtrl',
                  size: size,
                  appendTo: parentElem,
                  resolve:{
					updatedQues: function ()
					{
						var ob = new Object();
						ob.answers = '';
						return ob;
					},
                     update: function ()
					{
						return false;
					}
				}
			});
			modalInstance.result.then(function (selectedItem)
			{
				$ctrl.selected = selectedItem;
			}, function ()
			{
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
		$scope.groups = [
			{
				title: 'Dynamic Group Header - 1',
                 content: 'Dynamic Group Body - 1'  
            },
             {
				title: 'Dynamic Group Header - 2',
                 content: 'Dynamic Group Body - 2'
             }];
		
        $scope.items = ['Item 1', 'Item 2', 'Item 3'];
		$scope.addItem = function ()
		{
			var newItemNo = $scope.items.length + 1;
			$scope.items.push('Item ' + newItemNo);
		};
		$scope.status = {
			isCustomHeaderOpen: false
			, isFirstOpen: true
			, isFirstDisabled: false
		};
    }

]);