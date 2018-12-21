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
var arrayOfIdeas = [];
var qualityArray = ["Swill", "Plausible", "Genius"]

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

window.addEventListener('load', pageLoad);

cardsArea.addEventListener('dblclick', editCard)
// bodyText.addEventListener('dblclick', editCard)


///////////////////////////////////////////////
//FUNCTIONS

function editCard(event){
  event.target.contentEditable = true;

  document.body.addEventListener('keypress', function (e) {
    var key = e.keyCode;
    if (key === 13) {
      event.target.contentEditable = false;
      var index = parseInt(event.target.parentElement.dataset.id);
      var ideaTarget = arrayOfIdeas.find(function(idea) {
        return idea.id === index;
      })
      if (event.target.classList.contains("card-title")) {
        ideaTarget.updateContent(event.target.innerText, "name")
      } else if (event.target.classList.contains("body-text")) {
        ideaTarget.updateContent(event.target.innerText, "content")
      }
      ideaTarget.saveToStorage(arrayOfIdeas)
    //removing event listener
    }
  });
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
  if (localStorage.hasOwnProperty("savedIdeas")){
    var localStorageArray = JSON.parse(localStorage.getItem("savedIdeas"));
    localStorageArray.forEach(function(element,index){
      var newIdea = new Idea(element.name, element.content, element.id, element.quality);
      newIdeaCard(element);
      arrayOfIdeas.push(newIdea)
    });
  }
}

function newIdeaCard(idea) {
// CREATE CARD
var cardSection = document.querySelector(".cards-section");
cardSection.insertAdjacentHTML('afterbegin', 
  `<article data-id=${idea.id} class="card">
  <h2 contenteditable="false" class = "card-input card-title">${idea.name}</h2>
  <p contenteditable="false" class = "card-input body-text">${idea.content}</p>
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

// function updateQuality(thisElement, num) {
//   // console.log(id)

//   // get the object find
//   // arrayOfIdeas

//   counter += num;
//   // If this element has class of upvote, allow this, if the element has a class of downvote, do this

//   thisElement.nextElementSibling.innerHTML = qualityArray[counter];
// }

function searchFunction() {
//SEARCH FUNCTION
  var localStorageArray = JSON.parse(localStorage.getItem("savedIdeas"));
  cardsArea.innerHTML = "";
  var toFind = searchField.value;
  var filteredIdeas = localStorageArray.filter(function(idea) {
    return idea.name.includes(toFind) || idea.content.includes(toFind);
  })
  filteredIdeas.forEach(function(element){
    var newIdea = new Idea(element.name, element.content, element.id, element.quality);
    newIdeaCard(element);
  })
}
