function showMap(lat, lon) {
    var modal = document.getElementById("JohnModal");
    console.log(lat + " " + lon);
    modal.style.display = "block";
    
    buildMap(lat, lon);
}

    function buildMap(lat, lon) { //This function builds the map
        let map1 = document.getElementById("map");
        map1.innerHTML = "";

        let maps = document.createElement('div');
        maps.setAttribute("id", "maps");
        maps.setAttribute("class", "map-image");
        map1.appendChild(maps);
        
        var mapProp =  {
            center: new google.maps.LatLng(lat, lon),
            zoom: 45,
        };

        var map = new google.maps.Map(document.getElementById("maps"), mapProp);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map
        });

    }


function Searchbygps(term) {
    position = navigator.geolocation.getCurrentPosition(function onSuccess(position){
            var lon = position.coords.longitude;
			var lat = position.coords.latitude;
        var Johnlink = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + term + "&latitude=" + lat + "&longitude=" + lon;
            
        Retrieve(Johnlink);
                                 
    },function onerror(){},{maximumAge:9000, timeout:4500, enableHighAccuracy: true});
               
}

function locationSearch() {
    var term = document.getElementById("searchvalue").value;
    var location = document.getElementById("locationvalue").value;
    
    if(term.length != 0 && location.length != 0) //if both input fields have value, create URL and send to Retrieve()
    {
        var Johnlink = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + location;
        Retrieve(Johnlink);
    }
    else if(term.length != 0 && location.length == 0) 
    {
        Searchbygps(term);
		
    }
    else 
    {
    }
    
}


//Retrieve (Search) Fuction
function Retrieve(Johnlink) {
    $.ajax({
        url: Johnlink,
        headers: {
            'Authorization':'Bearer Hs0pVQSFLGH4jtRUqJfMYEL8vzGmz9YZiDNtgWWbaK-q3T5zuNFcx2ImwZ7gEVmmpLkh9b35knkud69HeOv9kv3bKfMpP2XCPAytoYW8CVnifNH_0-mTW-CwgbnWX3Yx',
        },
        method: 'GET',
        dataType: 'json',
        success: function(data){
            // This grabs the results from the API 
            console.log(data);
            
			//Saving total number of results
            var totalresults = data.total;
			
            var searching = document.getElementById("results");
            searching.innerHTML = "";
            
            //if results are greater than zero, then make divs for each
            if(totalresults>=1)
            {
               
                $.each(data.businesses, function(i, item) {
                        
                    //The variables from JSON 
                    var id = item.id;
                    var price = item.price;
                    var rating = item.rating;
                    var name = item.name;
                    var address = item.location.address1;
                    var city = item.location.city;
                    var zipcode = item.location.zip_code;
                    var state = item.location.state;
                    var lat = item.coordinates.latitude;
                    var lon = item.coordinates.longitude;
                    var cat1 = item.categories[0].naming;
                    
                    //create a new div for every result
                    var resulttab = document.createElement('div');
                    resulttab.setAttribute("id",id);
                    resulttab.setAttribute("class","resultstab");
                    
                    //Div naming
                    var naming = document.createElement('p');
                    naming.setAttribute("class","naming");
                    naming.append(name + " (" + rating + "/5)");
                    resulttab.append(naming);
                    
                    //compound description for each div (adds a dot if there is additional content to be added)
                    var description = document.createElement('p');
                    description.setAttribute("class","textfill");
                    if(price != undefined) {
                        var temp = price;
                        if(cat1 != undefined) {
                            var temp = price + "  \u2022  " + cat1;
                        }
                        description.append(temp);
                        resulttab.append(description);
                    }
                    else if(cat1 != undefined) {
                        description.append(cat1);
                        resulttab.append(description);
                    }
                    
                    
                    var loc1 = document.createElement('p');
                    loc1.setAttribute("class","textfill");
                    var temp = address + " " + city + ", " + state + " " + zipcode;
                    loc1.append(temp);
                    resulttab.append(loc1);
                    
                    //location button
                    let locbtn = document.createElement('button');
                    locbtn.setAttribute("class","button3");
                    locbtn.setAttribute("type","submit");
                    locbtn.innerHTML = 'View Location';
                    resulttab.append(locbtn);
                    
                    locbtn.onclick = function() {showMap(lat, lon);}
                    
                    searching.append(resulttab);
                    
                });
                    
            }
            
            else
            {               
            }              
        }
    });  

}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
      document.getElementById("logindiv").style.display = "none";
      document.getElementById("userdiv").style.display = "block";
      
      var user = firebase.auth().currentUser;

      document.getElementById("puser").innerHTML = "User : " + user.email;
      display_home();
      
  } else {
    // No user is signed in.
      document.getElementById("logindiv").style.display = "block";
      document.getElementById("userdiv").style.display = "none";
      
  }
});

function login() {
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        // Signed in 
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert(errorMessage);
      });
    
}

function logout() {
    
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
}

// DISPLAY FUNCTIONS
function display_home() { 
      document.getElementById("home").style.display = "block";
      document.getElementById("search-tab").style.display = "none";
}

function Mainpage_search() { 
      document.getElementById("home").style.display = "none";
      document.getElementById("search-tab").style.display = "block";
}

function hideModal() {
  var modal = document.getElementById("JohnModal");
  modal.style.display = "none";
}
$('#searchvalue').keyup(function(event){
    if(event.keyCode == 13){
        $('#locationvalue').focus();
    }
});

$('#locationvalue').keyup(function(event){
    if(event.keyCode == 13){
        locationSearch();
    }
});