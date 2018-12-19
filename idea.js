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
      var arrayOfIdeas = JSON.parse(arrayOfIdeas[i]);
      if (arrayOfIdeas[i].id === arrayOfIdeas.dataset.id) {
        arrayOfIdeas.splice(i, 1);
        }
      }
  }
  
  updateContent(){

  }

  updateQuality(){

  }
}



