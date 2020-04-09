"use strict"
const {forEach}=require('lodash');
const odaiterator = (function () {

    ///let customIterator = function () {
        let location = 0;
       let  items= [];
       // return {
         const   getItems = function(argone) {
                return argone;
              }
    
          const   getCount = function(argone) {
                return argone.length;
              }
                 
         const  addItem = function(item)  {
              const arr=[];
              arr.push(item);
              return arr;
              }

                let customIterator = function (argone) {

                      return {
        current :function () {
                return argone[location];
                },
    
     hasMoreItems :function() {
                    if (location < argone.length && argone[location] != null) {
                        return true;
                    } else {
                        return false;
                    }
                },
        hasNext :  function () {
                    let element;
                    if (!hasMoreItems()) {
                    return null;
                    }
                    element = argone[location];
                    location += 1;
                    return element;
                    },

            rewind : function() {
                        location =0;
                    return location= getCount()-1;
                    }
       }
   
   }
    function reverseArrayIterator(array) {
        var index = array.length - 1;
        return {
            next: () =>
            index >= 0 ? {
                value: array[index--],
                done: false
            }
             : {
                done: true
            }
        }
    }


    function toinit() {
        return {
            getCount:getCount,
            addItem:addItem,
            getItems:getItems,           
            customIterator:customIterator,
            reverseArrayIterator: reverseArrayIterator
        };
    }

    return {
        toinit: toinit
    };

})();
module.exports = {
    toinit: odaiterator.toinit
};
