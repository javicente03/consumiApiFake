window.onload = function(){
	json.forEach(e => {
		recorrer(e)
	});
	var button = document.createElement("button")
	button.type = "submit"
	button.className = "send"
	button.innerHTML = "Enviar"
	let colButton = document.createElement("div")
	colButton.className = "col-sm-12 col-md-7"
	colButton.appendChild(button)
	document.querySelector("#form .row").appendChild(colButton)
}

function recorrer(myObject){
	for(key in myObject){
		if(typeof myObject[key] === 'object'){
			col = document.createElement("div")
			col.className = "col-sm-12"
			label = document.createElement('label')
			label.innerHTML = key
			col.appendChild(label)
			document.querySelector("#form .row").appendChild(col)

			myObject[key].forEach(i => {
				recorrer(i)
			})
		} else{
			if(key == 'type'){
				newElement = document.createElement("input")
				switch(myObject[key]){
					case 'text':
						newElement = document.createElement("input")
						newElement.type = "text"
						newElement.placeholder = myObject['placeholder']
						newElement.className = "input-text"
						insertObject(newElement, myObject)
						break;
					case 'radio':
						newElement = document.createElement("input")
						newElement.type = "radio"
						insertObjectLabel(newElement, myObject)
						break;
					case 'checkbox':
						newElement = document.createElement("input")
						newElement.type = "checkbox"
						insertObjectLabel(newElement, myObject)
						break;
					case 'email':
						newElement = document.createElement("input")
						newElement.type = "email"
						newElement.placeholder = myObject['placeholder']
						newElement.className = "input-text validate"
						insertObject(newElement, myObject)
						break;
					case 'number':
						newElement = document.createElement("input")
						newElement.type = "number"
						newElement.placeholder = myObject['placeholder']
						newElement.className = "input-text"
						insertObject(newElement, myObject)
						break;
					case 'textarea':
						newElement = document.createElement("textarea")
						newElement.className = "form-control"
						newElement.placeholder = myObject['placeholder']
						insertObject(newElement, myObject)
						break;
					case 'select':
						newElement = document.createElement("select")
						newElement.className = "form-control"
						insertObject(newElement, myObject)
						loadOptionSelect(newElement)
						break;
				}
			}
		}
	}
}


function insertObject(newElement, myObject){
	newElement.name = myObject['name']
	newElement.id = myObject['name']
	if(myObject['required'])
		newElement.required = true
	col = document.createElement("div")
	col.className = "col-sm-12 col-md-6"
	col.appendChild(newElement)
	document.querySelector("#form .row").appendChild(col)
}

function insertObjectLabel(newElement, myObject){
	labelElement = document.createElement("label")
	labelElement.htmlFor = myObject["name"]
	labelElement.innerHTML = myObject["label"]
	labelElement.className = "label-for"

	newElement.name = myObject['name']
	newElement.id = myObject['name']
	if(myObject['required'])
		newElement.required = true
	col = document.createElement("div")
	col.className = "col-sm-12 col-md-6"
	col.appendChild(newElement)
	col.appendChild(labelElement)
	document.querySelector("#form .row").appendChild(col)
}

function loadOptionSelect(newElement){
	let endpoint = "https://my-json-server.typicode.com/joseluisgs/APIRESTFake/users"
	request = new XMLHttpRequest
	request.open('GET', endpoint, true)
	request.send()

	request.onreadystatechange = function(){
		if(request.readyState === 4){
			if(request.status === 200){
				response = request.responseText
				response = JSON.parse(response)
				response.forEach(e => {
					id = e["id"]
					option = document.createElement("option")
					option.value = id
					console.log(option)
					option.innerHTML = id + " - " + e["username"]
					newElement.appendChild(option)
				});
						
			} else {
				console.log("Error: "+request.responseText);
			}
		}
	}
}