'use strict'

export function empty(htmlElement) {
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.firstChild);
    }
}

export function guid() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export function getIndex(child) {
    var i = 0;
    while( (child = child.previousSibling) != null ) 
        i++;

    return i;
}

export default { empty,guid, getIndex }