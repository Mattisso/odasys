"use strict"
const odaiterator = (function () {

    //	data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // length = data.length;
    let myiterator = function (argone) {
        let location = 0,
        length = argone.length;
        return {
            next: function () {
                return argone[location++];
            },
            next: function () {
                let element;
                if (!this.hasNext()) {
                return null;
                }
                element = argone[location];
                location += 1;
                return element;
                },
                rewind: function () {
                    location = 0;
                    return argone[location];
                    },
                    current: function () {
                    return argone[location];
                    },
            hasNext: function () {
                if (location < argone.length && argone[location] != null) {
                    return true;
                } else {
                    return false;
                }
            }
        }
         /*    return {
        hasNext: function () {
        return index < length;
        },
        next: function () {
        var element;
        if (!this.hasNext()) {
        return null;
        }
        element = argone[index];
        index += 1;
        return element;
        },

        rewind: function () {
        index = 0;
        return argone[index];
        },
        current: function () {
        return argone[index];
        }
        } */

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
            myiterator: myiterator,
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
