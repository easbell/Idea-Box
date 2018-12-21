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

//AREA VARIABLE
var cardsArea = document.querySelector(".cards-section");

//SEARCH BOX VARIABLE
var searchField = document.getElementById("search");

//CARD
var card = document.querySelector(".card")
var cardTitle = document.querySelector(".card-title");
var bodyText = document.querySelector(".body-text");

///////////////////////////////////////////////
//EVENT LISTENERS

searchField.addEventListener('input', searchFunction);

saveBtn.addEventListener('click', saveFunction);

cardsArea.addEventListener('click', deleteCard);

cardsArea.addEventListener('keyup', function (e) {
  var key = e.keyCode;
  if (key === 13) {
    editCard();
  }
});


///////////////////////////////////////////////
//FUNCTIONS

function editCard(){
  var editedIdea = new Idea(event.target.innerText, event.target.parentElement.innerText, event.target.parentElement.dataset.id);
  //WE NEED TO FIGURE OUT HOW TO CAPTURE BOTH FIELDS AT ONCE INSTEAD OF JUST THE TARGET
    editedIdea.updateContent(editedIdea.id, editedIdea.name, editedIdea.content);
    console.log(editedIdea.id, editedIdea.name, editedIdea.content)

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
  var newIdea = new Idea(titleInput.value, bodyInput.value, Date.now());
  arrayOfIdeas.push(newIdea);
  newIdea.saveToStorage(arrayOfIdeas);
  newIdeaCard(newIdea.name, newIdea.content, newIdea.id);
  titleInput.value = "";
  bodyInput.value = "";
}

function onPageLoad(){
// CREATE CARDS ON PAGE LOAD
  arrayOfIdeas.forEach(function(element){
    newIdeaCard(element.name, element.content, element.id);
  });
}
onPageLoad();


function newIdeaCard(name, content, id) {
// CREATE CARD
  var cardSection = document.querySelector(".cards-section");
  var card = 
    `<article data-id=${id} class="card">
      <h2 contenteditable = true class= "card-input card-title">${name}</h2>
      <p contenteditable = true class= "card-input body-text">${content}</p>
      <div>
        <img class="downvote" src="assets/downvote.svg">
        <img class="upvote" src="assets/upvote.svg">
        <p class="quality">Quality: Swill</p>
        <img class="delete" src="assets/delete.svg">
      </div>
    </article>`;
  cardSection.innerHTML = card + cardSection.innerHTML;
}

function searchFunction() {
//SEARCH FUNCTION
  cardsArea.innerHTML = "";
  var toFind = searchField.value;
  var index = arrayOfIdeas.filter(function(idea) {
    return idea.name.includes(toFind) || idea.content.includes(toFind);
  })
    index.forEach(function(element){
    newIdeaCard(element.name, element.content);
  })
}






