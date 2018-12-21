//VARIABLES

//INPUT VARIABLES
var titleInput = document.getElementById("title");
var bodyInput = document.getElementById("body");

//BUTTON VARIABLES
var saveBtn = document.getElementById("save");
var upvoteBtn = document.querySelector(".upvote");
var downvoteBtn = document.querySelector(".downvote");
var deleteBtn = document.querySelector(".delete");
var searchBtn = document.getElementById("searchBtn");

//ARRAY VARIABLE
var arrayOfIdeas = JSON.parse(localStorage.getItem("savedIdeas")) || [];
var qualityArray = ["Swill", "Plausible", "Genius"]

//AREA VARIABLE
var cardsArea = document.querySelector(".cards-section");

//SEARCH BOX VARIABLE

//CARD
var card = document.querySelector(".card")
var cardTitle = document.querySelector(".card-title");
var bodyText = document.querySelector(".body-text");



///////////////////////////////////////////////
//EVENT LISTENERS

saveBtn.addEventListener('click', saveFunction);
cardsArea.addEventListener('click', deleteCard);

window.addEventListener('load', pageLoad);

cardsArea.addEventListener('keyup', function (e) {
  var key = e.keyCode;
  if (key === 13) {
    editCard();
  }
});


///////////////////////////////////////////////
//FUNCTIONS

function editCard(){
  var editedIdea = new Idea("","", event.target.parentElement.dataset.id);
  if (event.target.className === "card-input") {    
    editedIdea.updateContent(editedIdea.id);
  }
}


function deleteCard(){
  var oldIdea = new Idea("", "", event.target.parentElement.parentElement.dataset.id);
  if (event.target.className === "delete") {
    event.target.parentElement.parentElement.remove();
    oldIdea.deleteFromStorage(oldIdea.id);
  }
}

function saveFunction() {
// SAVE IDEA
  id = Date.now();
  var quality = 0;
  var newIdea = new Idea(titleInput.value, bodyInput.value, id, quality);
  arrayOfIdeas.push(newIdea);
  newIdea.saveToStorage(arrayOfIdeas);
  newIdeaCard(newIdea);
  titleInput.value = "";
  bodyInput.value = "";
}

function pageLoad(){
// CREATE CARDS ON PAGE LOAD
//recreate new instances on page load
  
  
  arrayOfIdeas.forEach(function(element,index){
    // var newArr = JSON.parse(localStorage.key(index));
    console.log('another');

    // var newArr = JSON.parse(arrayOfIdeas);
    var newIdea = new Idea(element.name, element.content, element.id, element.quality);
    newIdeaCard(arrayOfIdeas[index]);
    
    
    arrayOfIdeas.push(newIdea)
  });
}



function newIdeaCard(idea) {
// CREATE CARD
  var cardSection = document.querySelector(".cards-section");
  cardSection.insertAdjacentHTML('beforeend', 
    `<article data-id=${idea.id} class="card">
      <h2 contenteditable = true class= "card-input card-title">${idea.name}</h2>
      <p contenteditable = true class= "card-input body-text">${idea.content}</p>
      <div>
        <img class="downvote" onclick="updateQuality(this, -1)" src="assets/downvote.svg">
        <img class="upvote" onclick="updateQuality(this, 1)" src="assets/upvote.svg">
        <p class="quality">Quality: ${idea.quality}</p>
        <img class="delete" src="assets/delete.svg">
      </div>
    </article>`
  );
  // var card = 
    
  // cardSection.innerHTML = card + cardSection.innerHTML;
// downvoteBtn.addEventListener('click', updateQuality);
// upvoteBtn.addEventListener('click', updateQuality);

}

function updateQuality(thisElement, num) {
  // console.log(id)

  // get the object find
  // arrayOfIdeas


  
  counter += num;

  
  // If this element has class of upvote, allow this, if the element has a class of downvote, do this

  thisElement.nextElementSibling.innerHTML = qualityArray[counter];

}




// var searchField = document.getElementById("search");

// searchField.addEventListener('keyup', search)

// function search() {
//   var index = arrayOfIdeas.indexOf(searchField.value)
  
//   if(index !== -1) {
//     alert('exist');
//   } else {
//     alert('not exist');
//   }

//   document.getElementById('pgh').innerHTML = myArr;
// }
