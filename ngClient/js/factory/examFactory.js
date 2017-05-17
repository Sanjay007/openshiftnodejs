
myApp.factory('examFactory', function($http) {

  var urlBase = 'http://localhost:3000/api/v1/exam';
  var questionFactory = {};

  questionFactory.create = function(ques) {
    return  $http.post(urlBase,{exam:ques});
  };
   questionFactory.getexambyUser = function() {
    return  $http.get(urlBase);
  };


  return questionFactory;
});
