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
  	//pass in the actual new text (1st arg), string of name or content (2nd arg)
  	this[type] = newText;
		  	//type is a string, will match to the right property
		  	// thiscontent = content;
		  }
	 //  var stringifiedCards = JSON.stringify(arrayOfIdeas)
		// localStorage.setItem("savedIdeas", stringifiedCards)

	}
	//WE NEED TO PUT UPDATED OBJECT BACK INTO ARRAY, AND RE SAVE TO LOCAL STORAGE






 // if (counter >= 2) {
 //  	this.quality = 'Genius'
 //  } else if (counter = 1) {
 //  	this.quality = 'Plausible'
 //  } else {
 //  	this.quality = 'Swill'
 //  }


   // updateQuality(){


