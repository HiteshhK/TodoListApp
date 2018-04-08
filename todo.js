var module = angular.module('myApp', []);

		module.controller('TimeCtrl', function($scope, $interval) 
		{
			$scope.tasks=[];//array to hold the task list

        var tasksData=localStorage['taskList'];
        if(tasksData !== undefined)
        {
          $scope.tasks=JSON.parse(tasksData);
        }

  			var tick = function() 
  			{
    		$scope.clock = Date.now();
  			}
  			tick();
  			$interval(tick, 1000);
  			
  			$scope.searchEnter=function(){
  				if(event.which == 13 && $scope.todo != "")//13 is keycode for enter
  				{
  					$scope.addTask();//call this function when pressed enter to add task
  				}
  			};
  			$scope.addTask=function(){
  				$scope.tasks.push({'taskMsg':$scope.todo, 'status':false});
  				console.log($scope.tasks);
          $scope.todo= '';//to empty the list after entering a task

          //adding localstorage 
          localStorage['taskList'] = JSON.stringify($scope.tasks);
          console.log(localStorage);
  			};
        $scope.contentEdit=function(msg){
          console.log(msg);
          for(i=0;i<$scope.tasks.length;i++)
          {
            if($scope.tasks[i].taskMsg==msg){
              $scope.tasks[i].taskMsg=event.target.innerText;
            }
          }
           localStorage['taskList'] = JSON.stringify($scope.tasks);
          
          event.target.contentEditable=event.target.contentEditable=="false"?"true":"false";

        };
        $scope.enterAgain=function(msg){
          if(event.which==13 && msg!= "")
          {
            $scope.contentEdit(msg);
          }
        };
        $scope.delete=function(pos){
		  $scope.tasks.splice(pos,1);//first parameter is the index value..second is number of elements...this will remove the selected task.
          localStorage['taskList'] = JSON.stringify($scope.tasks);
          
        };
        $scope.deleteAll=function(all){
          var ans=confirm("are you sure you want to delete all the task scheduled");
          if(ans)
          {
            $scope.tasks.splice(all);
            localStorage['taskList'] = JSON.stringify($scope.tasks);
          }
        };
        
});