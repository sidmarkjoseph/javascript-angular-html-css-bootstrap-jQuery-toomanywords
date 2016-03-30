/////////////////////////////////////////
// Author - Siddharth Mark Joseph      //
// Name- app.js                        //
// Version - 1.0                       //
// Purpose - Defines angular module    //
// and the respective dependencies.    //
// Also provides state routing details //
// through the config function         //
/////////////////////////////////////////
(function(){
  'use strict';
    angular
        .module('weatherApp',[
            'ui.router',
            'ui.bootstrap',
            'ngResource'


    ])
        .config(function($stateProvider,$urlRouterProvider){
            $urlRouterProvider.otherwise('sixteen');

            $stateProvider
                .state('current',{
                    url: '/current',
                    templateUrl: 'partials/partial-current.html',
                    controller : 'CurrentWeather as vm'

            })
                .state('five',{
                    url: '/five',
                    templateUrl: 'partials/partial-five.html',
                    controller : 'FiveWeather as vm'

                })
                .state('sixteen',{
                    url: '/sixteen',
                    templateUrl: 'partials/partial-sixteen.html',
                    controller: 'SixteenWeather as vm'

                })
                .state('#',{
                    url:'/'
                })

    });
})();