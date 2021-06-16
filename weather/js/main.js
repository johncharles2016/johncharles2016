'use strict';

document.addEventListener("DOMContentLoaded", function(){

//Add event listeners for buttons
document.getElementById("gobutton").onclick = onGoButtonClick;
document.getElementById("locbutton").onclick = onLocationClick;0
});

//Weather API KEY
const WEATHER_API_KEY = "946b75c9be64c46eda90e6f61898a396"

//reads input from input box, called when the go button is pushed.
function onGoButtonClick(){
    
	//find the element
    var val = document.getElementById("textbox").value
    if(val === ""){ //Check for empty string, if empty provide error message
        var e = document.createElement('p');
		e.innerHTML = "Can't search for empty string";
        resetMapContent()
        addMapContent(e);
        return;

    }
    if(isNaN(val)){ //If value is not a number, call weather API by CITY
        console.log("CITY Detected");
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + val + "&appid=" + WEATHER_API_KEY;
        xmlRequest(url,onWeatherSuccess,onWeatherFail);
        
    }
    else{ //ELSE CALL BY ZIP CODE
        console.log("ZIP Detected");
        var url = "https://api.openweathermap.org/data/2.5/weather?zip=" + val + "&appid=" + WEATHER_API_KEY;
        xmlRequest(url,onWeatherSuccess,onWeatherFail);
    }

}

//Some helpers to aid in repeated tasks
function resetMapContent(){
    var r = document.getElementById("map");
    r.innerHTML = "";
}

function addMapContent(element){
    var r = document.getElementById("map");
    r.appendChild(element);

}

function addWeatherContent(element){
    var r = document.getElementById("weather");
    r.appendChild(element);
}

function resetWeatherContent(){
    var r = document.getElementById("weather");
    r.innerHTML = "";
}

//This function is called when the location button is pushed.
function onLocationClick(){
    navigator.geolocation.getCurrentPosition(onLocationSuccess,onLocationError,{
        enableHighAccuracy: true,
        timeout: 30000}


    );
}


function xmlRequest(url,onSuccess,onFailure){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          onSuccess(JSON.parse(this.responseText));        
        }
        else if(this.readyState == 4){
            onFailure(this.status);
        }
      };

    request.open("GET", url, true);
    request.send();
      

    
}

function onWeatherSuccess(data){
    var line1 = "Weather for " + data.name;
    var line2 = "Temperature " + data.main.temp + "K";
	var line3 = "Longitude " + data.coord.lon;
	var line4 = "Latitude " + data.coord.lat;
	var line5 = "Weather type: " + data.weather.main;
	var line6 = "Feels like: " + data.main.feels_like + "K";
	var line7 = "Atmosphereic Pressure: " + data.main.pressure + "hPa";
	var line8 = "Humidity: " + data.main.humidity + "%";
	var line9 = "Minimum temperature " + data.main.temp_min + "K";
	var line10 = "Maximum temperature " + data.main.temp_max + "K";
	var line11 = "Cloudiness:  " + data.clouds.all + "%";
    var ele1 = document.createElement('p');
    var ele2 = document.createElement('p');
	var ele3 = document.createElement('p');
    var ele4 = document.createElement('p');
	var ele5 = document.createElement('p');
    var ele6 = document.createElement('p');
	var ele7 = document.createElement('p');
    var ele8 = document.createElement('p');
	var ele9 = document.createElement('p');
    var ele10 = document.createElement('p');
	var ele11 = document.createElement('p');
    ele1.innerHTML = line1;
    ele2.innerHTML = line2;
	ele3.innerHTML = line3;
    ele4.innerHTML = line4;
	ele5.innerHTML = line5;
    ele6.innerHTML = line6;
	ele7.innerHTML = line7;
    ele8.innerHTML = line8;
	ele9.innerHTML = line9;
    ele10.innerHTML = line10;
	ele11.innerHTML = line11;
    addWeatherContent(ele1);
    addWeatherContent(ele2);
	addWeatherContent(ele3);
    addWeatherContent(ele4);
	addWeatherContent(ele5);
    addWeatherContent(ele6);
	addWeatherContent(ele7);
    addWeatherContent(ele8);
	addWeatherContent(ele9);
    addWeatherContent(ele10);
	addWeatherContent(ele11);
    resetMapContent();
    var mapp = new Gmap(data.coord.lat,data.coord.lon,12,300,300);
    addMapContent(mapp);
}

function onWeatherSuccessNoMap(data){
    var line1 = "Weather for " + data.name;
    var line2 = "Temperature " + data.main.temp + "K";
    var ele1 = document.createElement('p');
    var ele2 = document.createElement('p');
    ele1.innerHTML = line1;
    ele2.innerHTML = line2;
    addWeatherContent(ele1);
    addWeatherContent(ele2);
}

function onWeatherFail(status){
    alert("Failed to get weather on Code " + toString(status));
}


//Getting location was successful, make a new Gmap element and add it to the content after resetting the content.
function onLocationSuccess(p){
    resetMapContent();
    addMapContent(new Gmap(p.coords.latitude,p.coords.longitude,14,300,300));
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + p.coords.latitude.toString() + 
               "&lon=" + p.coords.longitude.toString() + "&appid=" + WEATHER_API_KEY;
	xmlRequest(url,onWeatherSuccessNoMap,onWeatherFail);
    
};

function onLocationError(e){
	alert("Error getting location");
}


