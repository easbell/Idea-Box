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

///////////////////////////////////////////////
//EVENT LISTENERS

saveBtn.addEventListener('click', saveFunction);
cardsArea.addEventListener('click', deleteCard);


///////////////////////////////////////////////
//FUNCTIONS


function deleteCard(){
  var oldIdea = new Idea("", "", event.target.parentElement.parentElement.dataset.id);
  if (event.target.className === "delete") {
    event.target.parentElement.parentElement.remove();
    oldIdea.deleteFromStorage(oldIdea.id);
    // console.log(oldIdea.id)
  }
}

function saveFunction() {
// SAVE IDEA
  var newIdea = new Idea(titleInput.value, bodyInput.value, Date.now());
  arrayOfIdeas.push(newIdea);
  newIdea.saveToStorage(arrayOfIdeas);
  console.log(newIdea.id);  
  newIdeaCard(newIdea.name, newIdea.content, newIdea.id);
  titleInput.value = "";
  bodyInput.value = "";
}

function onPageLoad(){
// CREATE CARDS ON PAGE LOAD
  arrayOfIdeas.forEach(function(element){
    newIdeaCard(element.name, element.content, element.id);
  })
}
onPageLoad();

function newIdeaCard(name, content, id) {
// CREATE CARD
  var cardSection = document.querySelector(".cards-section")
  var card = 
    `<article data-id=${id} class="card">
      <h2 contenteditable = true>${name}</h2>
      <p contenteditable = true class="body-text">${content}</p>
      <div>
        <img class="downvote" src="assets/downvote.svg">
        <img class="upvote" src="assets/upvote.svg">
        <p class="quality">Quality: Swill</p>
        <img class="delete" src="assets/delete.svg">
      </div>
    </article>`;
  cardSection.innerHTML = card + cardSection.innerHTML;
}