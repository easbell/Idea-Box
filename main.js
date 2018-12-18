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

///////////////////////////////////////////////
//EVENT LISTENERS

saveBtn.addEventListener('click', saveFunction);


///////////////////////////////////////////////
//FUNCTIONS

function saveFunction() {
  newIdea.saveToStorage(newIdea);
  newIdeaCard();
}

var newIdea = new Idea(titleInput.value, bodyInput.value);


function newIdeaCard() {
  var title = titleInput.value;
  var body = bodyInput.value;
  var cardSection = document.querySelector(".cards-section")
  var card = 
    `<article class="card">
        <h2>${title}</h2>
        <p class="body-text">${body}</p>
        <div>
          <img class="downvote" src="assets/downvote.svg">
          <img class="upvote" src="assets/upvote.svg">
          <p class="quality">Quality: Swill</p>
          <img class="delete" src="assets/delete.svg">
        </div>
      </article>`;
  cardSection.innerHTML = card + cardSection.innerHTML;
}





