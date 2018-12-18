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

  deleteFromStorage(){

  }

  updateContent(){

  }

  updateQuality(){

  }
}