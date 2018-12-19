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
    var arrayOfIdeas = JSON.parse(localStorage.getItem("savedIdeas"))
    for (var i = 0; i < arrayOfIdeas.length; i++){
      if (arrayOfIdeas[i].id === id) {
        arrayOfIdeas.splice(i, 1);
        //filter through, then delete (filter out ids that != id wanted)
        //reassign to new array var 'filteredIdeas'
        }
      }
    arrayOfIdeas = JSON.stringify(arrayOfIdeas);
    //set back into storage once stringified
  }

  updateContent(){

  }

  updateQuality(){

  }
}



