//////////////////////////////////////////
// Author - Siddharth Mark Joseph       //
// Controller - SixteenWeather.js       //
// Version - 1.0                        //
// Purpose - Hits the REST end point    //
// corresponding to the weather         //
// information for 8 Days.              //
// Services Used - getid, $http, $filter//
//////////////////////////////////////////
(function() {

    'use strict';

    angular
        .module('weatherApp')
        .controller('SixteenWeather', SixteenWeather)

    function SixteenWeather(getid, $http,$filter) {
        var vm = this;
        vm.countries = [];
        vm.error = false;
        vm.target = "";
        vm.weather=[];
        vm.toggle = true;
        vm.dates=[];
        vm.arr=[];
        vm.arr1=[];
        vm.onSubmit = function ()
        {

            getid.getData().then(function (results)
            {
                vm.countries = results;
                for (var i = 0; i < vm.countries.length; i++)
                {
                    if (vm.countries[i].name.toLowerCase() === vm.name.toLowerCase())
                    {
                        vm.target = vm.countries[i]._id;
                        break;
                    }

                }
                getRequest();
                
            });

        }
        function getRequest()
        {
            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id="+vm.target+"&cnt=8&APPID=ddb46fe87a2dfe703ce1ede0340b7cce";
            $http.get(url).then(function(results){
                if (results["data"].cod == "404") {
                    vm.error = true;
                    return;
                }
                vm.toggle=false;
                for(var i=0;i<results["data"].list.length;i++)
                {
                    vm.weather.push(results["data"].list[i]);

                }
                var d= new Date();
                for(i=0;i<8;i++)
                {
                    if(i==0)
                    vm.dates.push($filter('date')(d.setDate(d.getDate()), 'MM-dd-yyyy'));
                    else
                      vm.dates.push($filter('date')(d.setDate(d.getDate()+1),'MM-dd-yyyy'));
                }
                for(i=0;i<vm.weather.length;i++)
                {
                    var obj =
                    {
                        clouds : vm.weather[i]['clouds'],
                        degree: vm.weather[i]['deg'],
                        humidity: vm.weather[i]['humidity'],
                        pressure: vm.weather[i]['pressure'],
                        rain: vm.weather[i]['rain'],
                        wind:vm.weather[i]['speed']

                    }
                    vm.arr1.push(obj);
                    vm.arr.push(vm.weather[i]["temp"]);
                }


            })
        }
        vm.set = function()
        {
           vm.error=false;
            vm.target="";
            vm.toggle=true;
        }
    }
})();