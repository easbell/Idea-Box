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

///////////////////////////////////////////////
//EVENT LISTENERS

saveBtn.addEventListener('click', saveFunction);


///////////////////////////////////////////////
//FUNCTIONS

function saveFunction() {
// SAVE IDEA
  var newIdea = new Idea(titleInput.value, bodyInput.value, Date.now());
  arrayOfIdeas.push(newIdea);
  newIdea.saveToStorage(arrayOfIdeas);
  newIdeaCard(newIdea.name, newIdea.content);
  titleInput.value = "";
  bodyInput.value = "";
}

function onPageLoad(){
// CREATE CARDS ON PAGE LOAD
  arrayOfIdeas.forEach(function(element){
    newIdeaCard(element.name, element.content);
  })
}

onPageLoad();

function newIdeaCard(name, content) {
// CREATE CARD
  var cardSection = document.querySelector(".cards-section")
  var card = 
    `<article class="card">
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