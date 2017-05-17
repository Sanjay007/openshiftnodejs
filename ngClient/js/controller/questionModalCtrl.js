myApp.controller("questionModalCtrl", ['$scope', '$location', '$uibModal', '$log', '$document', 'updatedQues', 'update', 'questionFactory', '$uibModalInstance'
  
	, function ($scope, $location, $uibModal, $log, $document, updatedQues, update, questionFactory, $uibModalInstance) {

		$scope.category = [{
			id: 27
			, name: "Math"

    }, {
			id: 28
			, name: "Physics",

    }, {
			id: 30
			, name: "Chemistry"

    }];
		console.log(updatedQues);
		console.log(updatedQues.category);
		selectedcategIndex($scope.category);

		function selectedcategIndex(category) {

			for (var i = 0; i < category.length; i++) {

				if (category[i].name == updatedQues.category) {
					$scope.selectedCateg = i;
				}
			}
		};
		$scope.question = updatedQues;

		$log.info($scope.question);
		if (update != true) {
			$scope.question.answers = new Array();
		}
		$scope.isUpdate = update;


	
		$scope.update = function () {
			$log.info($scope.question);
		}

		$scope.cancel = function () {

			$uibModalInstance.dismiss();
			selectedcategIndex($scope.category);
		}
		$scope.add = function () {

			if ($scope.question.question == undefined || $scope.question.answers == undefined) {
				$scope.error = true;

			} else {
				questionFactory.create($scope.question)
					.then(function (success) {

						console.log(success.status);
						if (success.status == 200) {
							console.log(success.status);
							$scope.success = true;
							$scope.question = {};
							$scope.question.answers = [];
						}
					});
				$log.info($scope.question);

			}

		}

    }

]);