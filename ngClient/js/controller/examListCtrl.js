myApp.controller("ExamListCtrl", ['$scope', '$location', '$uibModal', '$log', '$document', 'questionFactory', 'toasty', 'examFactory',
 function ($scope, $location, $uibModal, $log, $document, questionFactory,toasty, examFactory)
	{
		
    examFactory.getexambyUser().then(function(success){
$scope.data=success.data;
      console.log(success.data);
    });


    $scope.viewCoupon=function(exam){
toasty.success(
				{
					title: 'Coupon Code  !', msg:  exam.coupon
				});

    }
		// $scope.data = [{
		// 	"name": "Bell",
    //          "id": "K0H 2V5"
		// },{"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          ,{"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          , {"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          , {"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          ,{"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          , {"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          , {"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          , {"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          , {"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          , {"name": "Bedll",
    //          "id": "K0cddsH 2V5"}
    //          ,   {
		// 	"name": "Octavius"
		// 	, "id": "X1E 6J0"
		// }];















    }

]);