	class Idea {
	constructor(name, content, id, quality) {
		this.name = name;
		this.content = content;
		this.id = id;
		this.quality = quality;
	}

	saveToStorage(ideaArray){
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

	updateContent(newText, type) {
  	this[type] = newText;
	}

	updateQuality(array){
		this.saveToStorage(array)
	}

}





 


