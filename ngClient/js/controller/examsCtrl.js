myApp.controller("ExamCtrl", ['$scope', '$location', '$uibModal', '$log', '$document', 'questionFactory', 'toasty', 'examFactory',
 function ($scope, $location, $uibModal, $log, $document, questionFactory,toasty, examFactory)
	{
		$scope.manualPick = false;
		doPagainate();
		$scope.ques = [
		{
			"qid": "1232"
			, "question": "What is the name of Saturn's largest moon What is the name of Saturn's largest moon ?"
			, "answers": [
			{
				"id": "A"
				, "text": "Hercules"
            }
			, {
				"id": "B"
				, "text": "Europa"
            }
			, {
				"id": "C"
				, "text": "Goliath"
            }
			, {
				"id": "F"
				, "text": "Triton"
            }]
			, "correct": "A"
        }
		, {
			"qid": "245"
			, "question": "Saturn is visible from Earth without a telescope"
			, "answers": [
			{
				"id": "A"
				, "text": "True"
            }
			, {
				"id": "B"
				, "text": "False"
            }]
			, "correct": "B"
        }];
        
		console.log($scope.ques);
		$scope.data = [];
		$scope.showQuesbySubject = function (sname)
		{
			$scope.quesList = [];
			questionFactory.getquesbySubject(sname)
				.then(function (success)
				{
					console.log(success.data);
					$scope.totalItems = success.data.length;
					angular.copy(success.data, $scope.data);
					$scope.showQuestion = true
				});
		}
		$scope.manualPickQues = function (pickValue)
		{
			//alert(pickValue);
			if (pickValue == 2)
			{
				$scope.manualPick = true;
				$scope.showQuestion == false;
			}
			else
			{
				$scope.manualPick = false;
			}
			console.log(pickValue);
		}
		$scope.addQuestions = function (val, ques)
		{
			if (val == true)
			{
				$scope.quesList.push(ques.qid);
				console.log($scope.quesList);
			}
			else
			{
				var index = $scope.quesList.indexOf(ques.qid);
				console.log('Removing from' + index);
				$scope.quesList.splice(index, 1);
				console.log('Removing from' + $scope.quesList);
			}
		};
	
    	$scope.addExam = function ()
		{
			if ($scope.quesList != undefined)
			{
				$scope.exam.selectedQues = $scope.quesList;
			}
			var result = validateInput($scope.exam);
			if (result.length > 0)
			{
				toasty.error(
				{
					title: 'User added!'
					, msg: result.toString()
				});
			}
			else
			{
				examFactory.create($scope.exam)
					.then(function (success)
					{
						console.log(success);
						if (success.status == 200)
						{
							toasty.success(
							{
								title: 'Exam added! Successfully'
							});
							$scope.manualPick = false;
							$scope.exam = new Object();
						}
						else
						{
							toasty.success(
							{
								title: 'Error Adding Exam !'
							});
						}
					});
			}
			console.log($scope.exam);
		};

		function validateInput(exam)
		{
			var errors = [];
			if (exam == undefined || exam.name == undefined || exam.name.length < 10)
			{
				errors.push('Length Of name Should be >10');
			}
			else if (exam.duration == undefined)
			{
				errors.push('Enter Duration Properly');
			}
			else if (exam.totalques == undefined || isNaN(exam.totalques))
			{
				errors.push('Enter Total Ques Properly');
			}
			return errors;
		}

		function doPagainate()
		{
			$scope.viewby = 3;
			$scope.currentPage = 1;
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
    }

]);