
myApp.factory('questionFactory', function($http) {

  var urlBase = 'http://localhost:3000/api/v1/ques';
  var questionFactory = {};

  questionFactory.create = function(ques) {
    return  $http.post(urlBase,ques);
  }; 

  questionFactory.getbyUser=function(){

    return $http.get(urlBase);
  };

    questionFactory.getquesbySubject=function(subject){

    return $http.post('http://localhost:3000/api/v1/ques/getbySubject',{
        subject: subject
       
      });
  };

  return questionFactory;
});
