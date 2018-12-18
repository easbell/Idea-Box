class Idea {
  constructor(name, content, id) {
    this.name = name;
    this.content = content;
    this.id = id;
  }

  //concat to add to variable so we can combine arrays

  saveToStorage(ideaArray){
    //Stringifying and setting in local storage

    var stringifiedCards = JSON.stringify(ideaArray);
    localStorage.setItem("savedIdeas", stringifiedCards);
  }

  deleteFromStorage(){

  }

  updateContent(){

  }

  updateQuality(){

  }
}

//add empty array to a saved localStorage key


    // var arrayOfIdeas = stringifiedCard.push(stringifiedCard);
    // var existingIdeas = stringifiedCard.concat(stringifiedCard)
