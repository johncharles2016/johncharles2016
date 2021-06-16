var docurrency = function(){
    
    console.log("GETTING CURRENCY");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let currency = JSON.parse(this.responseText);
            console.log(currency);
            buildcurrency(currency);
        }
    };
     url = 'https://api.exchangeratesapi.io/latest?base=USD'
        
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function buildcurrency(currency){
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    //TODO : CURRENCY DATA IS IN JSON OBJECT currency
    //All you need to do is build it into content.
	
	let line = document.createElement('span');
    var ctext = document.createTextNode('USD to:');
    line.appendChild(ctext);
    workspace.append(line);
	let h4 = document.createElement('h4');
    text = document.createTextNode('CAD = ' + currency.rates.CAD);
    h4.appendChild(text);
	workspace.appendChild(h4);
	let h5 = document.createElement('h5');
	text = document.createTextNode('EUR = ' + currency.rates.EUR);
    h5.appendChild(text);
	workspace.appendChild(h5);
	let h6 = document.createElement('h6');
	text = document.createTextNode('JPY = ' + currency.rates.JPY);
    h6.appendChild(text);
	workspace.appendChild(h6);
	
}

