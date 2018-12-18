class Idea {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }

  saveToStorage(){
    var stringifiedCard = JSON.stringify(newIdea);
    localStorage.setItem("savedIdea", stringifiedCard);
  }

  deleteFromStorage(){

  }

  updateContent(){

  }

  updateQuality(){

  }
}


