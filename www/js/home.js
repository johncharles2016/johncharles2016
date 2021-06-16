var dohome = function(){
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";
    let h1 = document.createElement('h1');
    let text = document.createTextNode("Welcome to John's FAU Mobile app!");
    h1.appendChild(text);
    workspace.append(h1);
    let h3 = document.createElement('h3');
    text = document.createTextNode("John Charles : Z23400888");
    h3.appendChild(text);
    workspace.appendChild(h3);
	let h4 = document.createElement('h4');
    text = document.createTextNode("Please click on a tab above");
    h4.appendChild(text);
    workspace.appendChild(h4);
    
}