var check1 = false;
const request = new XMLHttpRequest();

request.open('GET', endpoint, true)
request.send()

request.onreadystatechange = function(){
	if(request.readyState === 4){
		if(request.status === 200){
			response = request.responseText
			response = JSON.parse(response)
			response.forEach(e => {
				var tr = document.createElement("tr")
				recorrer(e, tr)
				check1 = true;
				document.querySelector("#table tbody").appendChild(tr)
			});
					
		} else {
			console.log("Error: "+request.responseText);
		}
	}
}

function recorrer(myObject, tr){
	for(key in myObject){
		if(typeof myObject[key] === 'object'){
			recorrer(myObject[key], tr)
		} else{
			if(!check1)
				createTable(key)
			loadTable(myObject[key], tr)
		}
	}
}

function createTable(key, tr){
	let th = document.createElement("th")
	th.innerHTML = key
	document.querySelector("#table thead").appendChild(th)
}

function loadTable(value, tr){
	if(typeof value === "string" && value.length > 4 && value.substring(0,4) == "http"){
		let td = `<td><a href="${value}">${value}</a></td>`
		tr.innerHTML = tr.innerHTML + td
	} else {
		let td = `<td>${value}</td>`
		tr.innerHTML = tr.innerHTML + td
	}
}