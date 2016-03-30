/////////////////////////////////////////
// Author - Siddharth Mark Joseph      //
// Service - getid.js                  //
// Version - 1.0                       //
// Purpose - Uses city.json to get Id  //
// of the city given the name of the   //
// city                                //
////////////////////////////////////////
(function(){
    'use strict';
    angular
        .module('weatherApp')
        .factory('getid',getid);


        function getid($resource){
           var Id = $resource('data/city.json');

            function getData()
            {
                return Id.query().$promise.then(function(results){
                  return results;
                });
            }
            return{
                getData : getData
            }

        }


})();