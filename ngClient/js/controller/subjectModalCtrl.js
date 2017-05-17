myApp.controller("subjectModalCtrl", ['$scope', '$location','$uibModal', '$log', '$document','subjectUser','update',
  function($scope, $location,$uibModal,$log,$document,subjectUser,update) {

      $scope.update=update;
      $scope.subject=subjectUser;

      $scope.updateSubject=function(){
console.log('Update subject cqalled'+$scope.subject);
      };


      $scope.addSubject=function(){
    console.log('add subject cqalled'+$scope.subject.id);
     };

      $scope.delSubject=function(){
    console.log('add subject cqalled'+$scope.subject.id);
     };

    }

]);