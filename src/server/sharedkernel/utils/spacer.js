"use strict";
const spacer = (function () {

    const blank = function () {
        return "";
    };

    const newLine = function () {
        return "\n";
    };

    const line = function (length, character) {
        var characterIndex;

        var longString = "****************************************";
        longString += "----------------------------------------";
        longString += "========================================";
        longString += "++++++++++++++++++++++++++++++++++++++++";
        longString += "                                        ";

        length = Math.max(0, length);
        length = Math.min(40, length);

        characterIndex = longString.indexOf(character);

        if (characterIndex === -1) {
            characterIndex = 0;
        }

        return longString.substr(characterIndex, length);
    };

    const wrap = function (text, length, character) {
        var padLength = length - text.length - 3;
        var wrapText = character + " " + text;
        wrapText +=line(padLength, " ");
        wrapText += character;
        return wrapText;
    };

    const box = function (text, length, character) {
        var boxText =newLine();
        boxText +=line(length, character) +newLine();
        boxText +=wrap(text, length, character) +newLine();
        boxText +=line(length, character) +newLine();
        return boxText;
    };

    function toinit() {
        return {
            blank:blank,
            line:line,
            wrap : wrap,
            newLine:newLine,
            box:box
        };
    }


    return {
        toinit: toinit
    };

})();
module.exports = {
    toinit: spacer.toinit
};
