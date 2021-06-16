var domap = function() { //This function should be used to build the map in the content element
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    const key = "946b75c9be64c46eda90e6f61898a396"
    const google_key = "AIzaSyAb1LdfInlHw5pZLtUjNU2jc1o29ku3LY8"
    //TODO : ADD MAP CONTENT
    
    let caption = document.createElement('span');
    caption.id = "Caption";
    var ctext = document.createTextNode('Click to Search for maps:');
    caption.appendChild(ctext);
    workspace.append(caption);
    
    var iframe = document.createElement('iframe');
    
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
        
        console.log("GPS clicked");
        
        var getGps = function(){
            
        
            position = navigator.geolocation.getCurrentPosition(function onSuccess(position){
            
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                
                iframe.src = 'https://www.google.com/maps/embed/v1/view?key=' + google_key + '&center=' + lat + ',' + long + '&zoom=10&maptype=satellite'; 
                workspace.appendChild(iframe);
                                  
        
            },function onerror(){},{maximumAge:10000, timeout:5000, enableHighAccuracy: true});}
        
        getGps();
    }
    
    button2.onclick = function(){
        
        //var search = document.getElementById('term');
        var search = term.value;
        console.log(search);
        
        var input = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + key;
        
        $.getJSON(input, function(json){
            
            console.log(json.sys.country);
            iframe.src = 'https://www.google.com/maps/embed/v1/view?key=' + google_key + '&center=' + json.coord.lat + ',' + json.coord.lon + '&zoom=10&maptype=satellite'; 
            workspace.appendChild(iframe);
            
        });
        
    }
    
}