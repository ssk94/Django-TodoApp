'use strict';

var app = angular.module('TodoApp', ['720kb.datepicker']);


app.config(function($locationProvider,$interpolateProvider){
    $locationProvider.html5Mode({
              enabled:true
    });
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');


 });    

app.controller('TodoController', ['$scope', '$http', function($scope, $http) {
    var tdc = this;


    this.initialize = function(){
      $http({method: 'GET', 'url': 'http://localhost:8000/api/v1/task/'}).then(function(res){
        if(res.status == 200){
          tdc.tasks = res.data.objects;
        }
      }).catch(function(error){
        console.log(error)
      });
    }

    tdc.today = new Date();
    tdc.subPanel = false;
    tdc.initialize();

    this.submit = function(){
    	
    	var body = {"title": tdc.title, "due_date": tdc.due_date, "status": "Pending"};
    	$http({method: 'POST', 'url': 'http://localhost:8000/api/v1/task/', data: body}).then(function(res){
        if(res.status == 201){
          tdc.title = "";
          tdc.due_date = "";
          tdc.initialize();
        }
    	}).catch(function(error){
        console.log(error)
    	});
    }

    this.markComplete = function(task, bool){
      var body = {"status": "Completed"};
      var url = "http://localhost:8000" + task.resource_uri;
      $http({method: 'PUT', 'url': url, data: body}).then(function(res){
        if(res.status == 204){
          tdc.initialize()
          if(bool){
            tdc.showSubPanel(tdc.parent);
          }
        }
      }).catch(function(error){
        console.log(error)
      });
    }

    this.markDeleted = function(task, bool){
      var body = {"deleted": true, "deletion_date": new Date()};
      var url = "http://localhost:8000" + task.resource_uri;
      $http({method: 'PUT', 'url': url, data: body}).then(function(res){
        if(res.status == 204){
          tdc.initialize()
          if(bool){
            tdc.showSubPanel(tdc.parent);
          }
        }
      }).catch(function(error){
        console.log(error)
      });
    }

    this.showSubPanel = function(task){

      tdc.subPanel = true;
      tdc.parent = task;
      var url = "http://localhost:8000/api/v1/subtasks/" + task.id + '/';
      $http({method: 'GET', 'url': url}).then(function(res){
        if(res.status == 200){
          tdc.subtasks = res.data.subtasks;
        }
      }).catch(function(error){
        console.log(error)
      });
    }

    this.submitSubtask = function(){

      var body = {"title": tdc.subtitle, "due_date": tdc.subdue_date, "parent": tdc.parent.resource_uri, "status": "Pending"};
      $http({method: 'POST', 'url': 'http://localhost:8000/api/v1/task/', data: body}).then(function(res){
        if(res.status == 201){
          tdc.subtitle = "";
          tdc.subdue_date = "";
          tdc.initialize();
          tdc.showSubPanel(tdc.parent);
        }
      }).catch(function(error){
        console.log(error)
      });
    }

    this.filter = function(filter){
      var url = "http://localhost:8000/api/v1/filter/?during=" + filter;
      $http({method: 'GET', 'url': url}).then(function(res){
        if(res.status == 200){
          tdc.tasks = res.data.objects;
        }
      }).catch(function(error){
        console.log(error)
      });
    }

    this.search = function(){


      var url = "http://localhost:8000/api/v1/task?title__contains=" + tdc.searchkeyword;
      $http({method: 'GET', 'url': url}).then(function(res){
        if(res.status == 200){
          console.log("hey")
          tdc.tasks = res.data.objects;

        }
      }).catch(function(error){
        console.log(error)
      });
    }



    // alert
    this.matchDte = function(item){
      var newdate = new Date(item);
      var duehours = 2;
      var today = moment().format('YYYY-MM-DD');
      var curTime = new moment().format("HH:mm");
      var duetime = moment("24:00", 'HH:mm').subtract('hours', duehours).format('HH:mm');
      console.log(duetime);

      var contractMoment = moment();
      var start = moment(today).add(1, 'days');
      start = moment(start).format('YYYY-MM-DD');
      if(today > item){
        alert("overdue");
      } else if(today < item && start == item && curTime >=  duetime){
        alert("You are close to end this. Hurry Up!!")
      }else {
        alert("Relax still there is time for perfection");
      }
    }

    // this.matchDte = function(){
    //   var url = "http://localhost:8000/api/v1/alert";
    //   $http({method: 'GET', 'url': url}).then(function(res){
    //     if(res.status == 200){
    //         console.log("hey")
    //         tdc.tasks = res.data.objects;

    //       }
    //     }).catch(function(error){
    //       console.log(error)
    //     });
    //   }
    



    $scope.$watch(function(){return tdc.searchkeyword;}, function(val){
      if(val == ""){
        tdc.initialize();
      }
    });



}]);