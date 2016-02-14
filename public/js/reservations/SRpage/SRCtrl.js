angular.module('salonOApp')
.controller('SRCtrl', function($scope, SRService){
    
    $scope.times = ['4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'];
    
    $scope.getUsers = function(){
        SRService.getUsers().then(function(response){
//            console.log(response);
        })
    };
    
    $scope.selectedDay = (new Date(Date.now())).toDateString();
    
    $('#appointmentsCalanderDiv').datepicker({
        defaultDate: 0,
        onSelect: function(selected){
            $scope.selectedDay = (new Date(selected)).toDateString();
            $scope.$apply();
            $scope.getDaysAppointments((new Date(selected)));
        }
    });
    
    $scope.getTeam = function(){
        SRService.getTeam().then(function(response){
            $scope.team = response;
        })
    };
    
    $scope.getTeam();
    
    $scope.selectedStylist = null;
    
    $scope.selectStylist = function(data){
        if($scope.selectedStylist !== data){
            $scope.selectedStylist = data;
        }
        else {
            $scope.selectedStylist = null;
        }
    };
    
    $('#leftAngle').unbind().click(function(){
        var date = $('#appointmentsCalanderDiv').datepicker('getDate');
        date = new Date(Number(date)-86400000);
        $('#appointmentsCalanderDiv').datepicker('setDate', date);
        $scope.selectedDay = date.toDateString();
        $scope.$apply();
        $scope.getDaysAppointments(date);
    });
    
    $('#rightAngle').unbind().click(function(){
        var date = $('#appointmentsCalanderDiv').datepicker('getDate');
        date = new Date(Number(date)+86400000);
        $('#appointmentsCalanderDiv').datepicker('setDate', date);
        $scope.selectedDay = date.toDateString();
        $scope.$apply();
        $scope.getDaysAppointments(date);
    });
    
    $('#gototoday').unbind().click(function(){
        var date = new Date(Date.now());
        $('#appointmentsCalanderDiv').datepicker('setDate', date);
        $scope.selectedDay = date.toDateString();
        $scope.selectedStylist = null;
        $scope.$apply();
        $scope.getDaysAppointments(date);
    })
    
    $scope.getDaysAppointments = function(date){
        SRService.getDaysAppointments(date).then(function(response){
            $scope.daysAppointments = response;
        })
    };
    
    $scope.getDaysAppointments($('#appointmentsCalanderDiv').datepicker('getDate'));
    
    $scope.setProperties = function(date, duration){
        var topV = $scope.setAppTop(date);
        var heightV = $scope.setAppHeight(duration);
        return {top: topV, height: heightV}
    };
    
    $scope.setAppTop = function(date){
        var perc = (Number(date)) - Date.parse($scope.selectedDay);
        perc = ((perc / 72000000)*100)-20;
        var percS = perc.toString() + '%';
        return percS
    };
    
    $scope.setAppHeight = function(duration){
        var num = Number(duration);
        num = num*5;
        var numS = num.toString()+'%';
        return numS
        
    };
    
    $scope.addAppValue = false;
    
    $scope.changeAddApp = function(){
        $scope.addAppValue = !$scope.addAppValue;
    };
    
    $scope.getClients = function(){
        SRService.getClients().then(function(response){
            $scope.clients = response;
        })
    };
    
    $scope.getClients();
    
    $scope.filterSearch = function(client){
        var names = $scope.appointment.client.split(' ');
        if(client.firstname === names[0] && client.lastname === names[1]){
            return client
        }else{
            return null
        }
    };
    
    $('#calanderSelect').datepicker({
        defaultDate: 0,
        onSelect: function(selected){
            $scope.selectedDay = (new Date(selected)).toDateString();
            $scope.$apply();
            $scope.getDaysAppointments((new Date(selected)));
        }
    });
    
    $scope.createAppointment = function(data){
        $scope.toSend = data;
        $scope.toSend.clientID = $scope.clients.filter($scope.filterSearch)[0]._id;
        $scope.toSend.halfDate = new Date($('#calanderSelect').datepicker('getDate'));
        $scope.toSend.date = $scope.toSend.halfDate.toString();
        $scope.toSend.date = $scope.toSend.date.split(' ');
        $scope.toSend.date.splice(4,1, $scope.toSend.time.toString().split(' ')[4]);
        $scope.toSend.finalDate = Date.parse(new Date($scope.toSend.date.join(' '))); 
        
        SRService.createAppointment($scope.toSend).then(function(response){
            $scope.addAppValue = false;
            var date = new Date(Date.now());
            $('#appointmentsCalanderDiv').datepicker('setDate', date);
            $scope.selectedDay = date.toDateString();
            $scope.getDaysAppointments(date);
        });
    };
    
    $scope.addNewClient = function(data){
        SRService.addNewClient(data).then(function(response){
            $scope.newC = {};
            $scope.getClients();
        })
    };
    
    $scope.deleteAppointment = function(id){
        SRService.deleteAppointment(id).then(function(){
            console.log(Date.parse(new Date($scope.selectedDay)));
            $scope.getDaysAppointments(new Date($scope.selectedDay));
        })
    };
    
})