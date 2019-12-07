document.addEventListener("DOMContentLoaded", function () {
 
});

function formatTime(hours, minutes) {
    const ampm = (hours >= 12)? 'PM' : 'AM';
    const fhours = (hours > 12)? hours - 12 : hours;
    const fmin = (JSON.stringify(minutes).length === 1)? `0${minutes}` : minutes;
    const ftime = `${fhours}:${fmin} ${ampm}`;
    return ftime;
}

function getCookie(name){
    arrayCookie=(document.cookie).split(';');
    for (let index = 0; index < arrayCookie.length; index++) {
        if (arrayCookie[index].indexOf(name)!=-1) {
            return {name : decodeURI(arrayCookie[index].split('=')[0]), value : decodeURI(arrayCookie[index].split('=')[1])};
        }
    }
}

function formatName(str){
    let formattedString = (str.charAt(0)).toUpperCase()+(str.substring(1)).toLowerCase();
    return formattedString;
}


// Custom helper functions 

function genHex(length){
    length = length || 16;
    let counter = 0;
    let generated_hex = "t";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    while(counter <= length){
        let rand_index = Math.round((Math.random()*characters.length)+1);
        generated_hex += characters.charAt(rand_index);
        counter += 1;
    }
    return generated_hex;
}

function getQuery() {
    const object = {};
    const query_list = window.location.search.substring(1).split('&');

    for (let index = 0; index < query_list.length; index++){
        object[query_list[index].split('=')[0]] = query_list[index].split('=')[1];
    }
    
    return object;
}

function get(selector) {
    return document.getElementById(selector);
}

function forEach(elements, reaction){
    for(let i = 0; i < elements.length; i++){
        (reaction)(elements[i]);
    }
}

const validateSearch = function() {
    if(document.getElementById("searchField").value !== "" && document.getElementById("searchField").value.length >= 3){
        return true;
    }
    return false;
};


function create(element) {
    return document.createElement(element);
}

function createText(text) {
    return document.createTextNode(text);
}

function createComponent(type, value) {
    value = value || null;
    const component = document.createElement(type);
    if (value){
        text = document.createTextNode(value);
        component.appendChild(text);
    }
    return component;
}

function joinComponent(container, ...components) {
    for (let component of components){
        container.appendChild(component);
    }
    return container;
}

function log(output) {
    return console.log(output);
}

const displayResponse = function(response) {
    const component = document.querySelector("#response");
    component.innerHTML = response;
    component.style.top = 0;

    setTimeout(function() {
        component.style.opacity = 0;
        component.style.top = "-10rem";
        setTimeout(function() {
            component.style.opacity = 1;
        }, 600);
    }, 3000);
};

const formatAsMoney = price => {
    let formattedPrice = price.toLocaleString(undefined, {
        style: "currency",
        currency: "NGN"
    });

    return formattedPrice;
};