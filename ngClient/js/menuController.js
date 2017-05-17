myApp.controller("MenuCtrl", ['$scope', '$location','MenuFactory','Upload',
  function($scope, $location,MenuFactory,Upload) {
      $scope.success=false;

     $scope.menus='';

      MenuFactory.getAllmenu().success(function(data){
        console.log('ddd'+data);
        $scope.menus=data;
      });


    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.genPDF=function(){
      console.log('pdfgen');

       html2canvas(document.getElementById('print'), {
            onrendered: function (canvas) {
         
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
            }
        });

    }

    $scope.createMenu=function(){
//     var fd=new FormData();
//      fd.append('file', $scope.menu.file);
//      console.log(fd);
//      $scope.menu.bann=$scope.myfile;
//  console.log($scope.menu);
//     MenuFactory.create($scope.menu).success(function(data){
//     $scope.menus.push($scope.menu);
//      $scope.success=true;
//      $scope.menu='';

//     });

Upload.upload({
            url: 'http://localhost:3001/api/v1/single', //webAPI exposed to upload the file
            data:{somefile:$scope.myFile} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
          
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            
        });
    }
  }
]);