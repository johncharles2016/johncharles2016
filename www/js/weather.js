var doweather = function() { //This function should be used to build your weather information in the content element
	const key = "946b75c9be64c46eda90e6f61898a396"
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    //TODO : ADD WEATHER CONTENT
    let caption = document.createElement('span');
    caption.id = "Caption";
    var ctext = document.createTextNode('Search for current weather.');
    caption.appendChild(ctext);
    workspace.append(caption);
    
    let button1 = document.createElement('button');
    button1.className = "myButton1";
    button1.id = "GPS";
    let text = document.createTextNode("GPS");
    button1.appendChild(text);
    workspace.appendChild(button1);
    
    let button2 = document.createElement('button');
    button2.className = "myButton1";
    button2.id = "LOCATION";
    text = document.createTextNode("LOCATION");
    button2.appendChild(text);
    workspace.appendChild(button2);
    
    let term = document.createElement('input');
    term.id = "term";
    term.className = "searchTerm";
    term.placeholder = "Enter city, state, or zip";
    workspace.appendChild(term);
    
    button1.onclick = function(){
        
        var getGps = function(){
        var input;
            

        
            position = navigator.geolocation.getCurrentPosition(function onSuccess(position){
            
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                
                input = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + key; 
                
                        var getJSON =(input, function(json){
            
            workspace.innerHTML = "";
            console.log(json.sys.country);
                            
            let button3 = document.createElement('button');
            button3.className = "myButton1";
            button3.id = "BACK";
            text = document.createTextNode("BACK");
            button3.appendChild(text);
            workspace.appendChild(button3);
            
            var f = Math.round((json.main.temp - 273.15));
            var fl = Math.round((json.main.feels_like - 273.15));
            var fll = Math.round((json.main.temp_min - 273.15));
            var fh = Math.round((json.main.temp_max - 273.15));
            var dir = convertDeg(json.wind.deg);
            var condition = json.weather[0].description;
            condition = condition.toUpperCase();
                
            
            let header = document.createElement('span');
            var htext = '<div id = "Weather_at"><span>Weather at '
                        + json.name + ',' + json.sys.country + '</span></div><div id="DisplayTemp"><span> ' + f + '°C</span></div><div id="DisplaySecondary"><span>' + condition + ' ' + fll+'-'+  fh+'°C</span></div>';
            header.innerHTML = htext;
            workspace.appendChild(header);
            
            
            let description = document.createElement('p');
            var ptext = '<div id="Section"><span><p class = "standard">Feels like<br>Wind Speed<br>Wind Direct.<br>Humidity<br>Latitude<br>Longitude<br>Pressure</p></span></div>';
            description.innerHTML = ptext;
            workspace.appendChild(description);
            
            
            let result = document.createElement('p');
            ptext = '<div id="Result"><p class="standard"><span>'+ fl + '°C'
                        + '<br/>' + json.wind.speed + ' m/s'
                        + '<br/>' + json.wind.deg + ' (' + dir + ')'
                        + '<br/>' + json.main.humidity + '%'
                        + '<br/>' + json.coord.lat
                        + '<br/>' + json.coord.lon
                        + '<br/>' + json.main.pressure + ' mPa'
                        + '</p></span></div>';
            result.innerHTML = ptext;
            workspace.appendChild(result);
                            
            button3.onclick = doweather;
            
        });
                                  
        
            },function onerror(){},{maximumAge:10000, timeout:5000, enableHighAccuracy: true});}
        
        getGps();
        

    }
    
    button2.onclick = function(){
        
        //var search = document.getElementById('term');
        var search = term.value;
        console.log(search);
        

        
        var input;
        
        if(search == '')
        {
            let caption = document.createElement('span');
            caption.id = "TemporaryDisp";
            var ctext = document.createTextNode('Please enter something.');
            caption.appendChild(ctext);
            workspace.append(caption);
        }
        
        else{
        
        if(isNaN(search))
            {
                 input = "https://api.openweathermap.org/data/2.5/weather?zip=" + search + "&appid=" + key; 
            }
        else{
            input = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + key; 
        }
        
        var getJSON =(input, function(json){
            
            workspace.innerHTML = "";
            console.log(json.sys.country);
                    
            let button3 = document.createElement('button');
            button3.className = "myButton1";
            button3.id = "BACK";
            text = document.createTextNode("BACK");
            button3.appendChild(text);
            workspace.appendChild(button3);
            
            var f = Math.round((json.main.temp - 273.15));
            var fl = Math.round((json.main.feels_like - 273.15));
            var fll = Math.round((json.main.temp_min - 273.15));
            var fh = Math.round((json.main.temp_max - 273.15));
            var dir = convertDeg(json.wind.deg);
            var condition = json.weather[0].description;
            condition = condition.toUpperCase();
                
            
            let header = document.createElement('span');
            var htext = '<div id = "Weather_at"><span>Weather at '
                        + json.name + ',' + json.sys.country + '</span></div><div id="DisplayTemp"><span> ' + f + '°C</span></div><div id="DisplaySecondary"><span>' + condition + ' ' + fll+'-'+  fh+'°C</span></div>';
            header.innerHTML = htext;
            workspace.appendChild(header);
            
            
            let description = document.createElement('p');
            var ptext = '<div id="Section"><span><p class = "standard">Feels like<br>Wind Speed<br>Wind Direct.<br>Humidity<br>Latitude<br>Longitude<br>Pressure</p></span></div>';
            description.innerHTML = ptext;
            workspace.appendChild(description);
            
            
            let result = document.createElement('p');
            ptext = '<div id="Result"><p class="standard"><span>'+ fl + '°C'
                        + '<br/>' + json.wind.speed + ' m/s'
                        + '<br/>' + json.wind.deg + ' (' + dir + ')'
                        + '<br/>' + json.main.humidity + '%'
                        + '<br/>' + json.coord.lat
                        + '<br/>' + json.coord.lon
                        + '<br/>' + json.main.pressure + ' mPa'
                        + '</p></span></div>';
            result.innerHTML = ptext;
            workspace.appendChild(result);
            
            button3.onclick = doweather;
        });
        }
    }
    
    
}


var convertDeg = function(deg)
{
    
                    switch(true){
                    case (deg < 90):
                        return "NE";
                        break;
                    case (deg>90 && deg<180):
                        return "SE";
                        break;
                    case (deg>180 && deg<270):
                        return "SW";
                        break;
                    case (deg>270 && deg<360):
                        return "NW";
                        break;
                    case (deg==0 || deg==360):
                        return "N";
                        break;
                    case (deg==90):
                        dir = "E";
                        break;
                    case (deg==180):
                        return "S";
                        break;
                    case (deg==270):
                        return "W";
                        break;
                }
    
}