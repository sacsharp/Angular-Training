var utils = angular.module("utils",[]);
        utils.value("defaultTrimLength", 30);
        utils.filter("trimText", function(defaultTrimLength){
            return function(data, trimLength){
                trimLength = trimLength || defaultTrimLength;
                return data.length < trimLength
                    ? data : data.substr(0,trimLength)+'...';
            }
        });
        utils.value("momentAPI",moment);

        utils.filter("toMoment",function(momentAPI){
        return function(data){
            return momentAPI(data).fromNow();
        }
        });