class Idea {
	constructor(name, content, id) {
		this.name = name;
		this.content = content;
		this.id = id;
	}

	saveToStorage(ideaArray){
		//Stringifying and setting in local storage
		var stringifiedCards = JSON.stringify(ideaArray);
		localStorage.setItem("savedIdeas", stringifiedCards);
	}

	deleteFromStorage(id){
		for (var i = 0; i < arrayOfIdeas.length; i++){
			if (arrayOfIdeas[i].id == id) {
				var removedIdeas = arrayOfIdeas.splice(i, 1);
				var stringifiedCards = JSON.stringify(arrayOfIdeas)
				localStorage.setItem("savedIdeas", stringifiedCards)
				}
			}
		}


  updateContent(id, name, content){
  	for (var i = 0; i < arrayOfIdeas.length; i++){
			if (arrayOfIdeas[i].id == id) {
		  	this.name = name;
		  	this.content = content;

  // updateQuality(){

	  }

	}
}
}