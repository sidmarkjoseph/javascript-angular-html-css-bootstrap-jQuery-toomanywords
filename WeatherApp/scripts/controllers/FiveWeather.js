/////////////////////////////////////////
// Author - Siddharth Mark Joseph      //
// Controller - FiveWeather.js         //
// Version - 1.0                       //
// Purpose - Hits the REST end point   //
// corresponding to the weather        //
// information for 5 Days.             //
// Services Used - getid, $http        //
////////////////////////////////////////
(function() {

    'use strict';

    angular
        .module('weatherApp')
        .controller('FiveWeather', FiveWeather)

    function FiveWeather(getid, $http)
    {
        var vm = this;
        vm.countries = [];
        vm.error = false;
        vm.target = "";
        vm.weather=[];
        vm.final=[];
        vm.dates=[];
        vm.toggle = true;
        vm.onSubmit = function ()
        {

            getid.getData().then(function (results) {
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
            var url = "http://api.openweathermap.org/data/2.5/forecast?id="+vm.target+"&APPID=ddb46fe87a2dfe703ce1ede0340b7cce";
            $http.get(url).then(function(results) {
                if (results["data"].cod == "404") {
                    vm.error = true;
                    return;
                }
                vm.toggle = false;

                vm.weather.push(results["data"].list[0]);
                for (var i = 4; i < results["data"].list.length; i += 8) {
                    vm.weather.push(results["data"].list[i]);
                }
                for (var i = 0; i < vm.weather.length; i++)
                {
                    vm.final.push(vm.weather[i].main);
                    vm.dates.push(vm.weather[i].dt_txt);
                }
                for(var i=0;i<vm.dates.length;i++)
                {
                    vm.dates[i]= vm.dates[i].substr(0,10);
                }

            },function(error){
                console.log(error);
            })
        }
        vm.set = function()
        {
            vm.toggle=true;
            vm.target="";
            vm.error=false;

        }
    }
})();