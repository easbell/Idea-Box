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

//QUALITY VARIABLES
var swill = document.getElementById("swill");
var plausible = document.getElementById("plausible");
var genius = document.getElementById("genius");

//ARRAY VARIABLE
var arrayOfIdeas = [];
var qualityArray = ["Swill", "Plausible", "Genius"];

//AREA VARIABLE
var cardsArea = document.querySelector(".cards-section");

//SEARCH BOX VARIABLE
var searchField = document.getElementById("search");

//CARD
var card = document.querySelector(".card");
var cardTitle = document.querySelector(".card-title");
var bodyText = document.querySelector(".body-text");


///////////////////////////////////////////////
//EVENT LISTENERS

searchField.addEventListener('input', searchFunction);

saveBtn.addEventListener('click', saveFunction);

cardsArea.addEventListener('click', deleteCard);

window.addEventListener('load', pageLoad);

cardsArea.addEventListener('dblclick', editCard);

swill.addEventListener('click', sortSwill);

plausible.addEventListener('click', sortPlausible);

genius.addEventListener('click', sortGenius);

///////////////////////////////////////////////
//FUNCTIONS

function sortSwill() {
  console.log("in swill");
  var localStorageArray = JSON.parse(localStorage.getItem("savedIdeas"));
  cardsArea.innerHTML = "";
  var filteredQuality = localStorageArray.filter(function(idea) {
    return idea.quality === 0;
  })
   filteredQuality.forEach(function(element){
    var newIdea = new Idea(element.name, element.content, element.id, element.quality);
    newIdeaCard(element);
  });
}


function sortPlausible() {
  var localStorageArray = JSON.parse(localStorage.getItem("savedIdeas"));
  cardsArea.innerHTML = "";
  var filteredQuality = localStorageArray.filter(function(idea) {
    return idea.quality === 1;
  });
  filteredQuality.forEach(function(element){
  var newIdea = new Idea(element.name, element.content, element.id, element.quality);
  newIdeaCard(element);
  });
}

function sortGenius() {
  var localStorageArray = JSON.parse(localStorage.getItem("savedIdeas"));
  cardsArea.innerHTML = "";
  var filteredQuality = localStorageArray.filter(function(idea) {
    return idea.quality === 2;
  });
    filteredQuality.forEach(function(element){
    var newIdea = new Idea(element.name, element.content, element.id, element.quality);
    newIdeaCard(element);
  });
}

function editCard(event){
  event.target.contentEditable = true;
  document.body.addEventListener('keypress', function (e) {
    var key = e.keyCode;
    if (key === 13) {
      event.target.contentEditable = false;
      var index = parseInt(event.target.parentElement.dataset.id);
      var ideaTarget = arrayOfIdeas.find(function(idea) {
        return idea.id === index;
      });
      if (event.target.classList.contains("card-title")) {
        ideaTarget.updateContent(event.target.innerText, "name");
      } else if (event.target.classList.contains("body-text")) {
        ideaTarget.updateContent(event.target.innerText, "content");
      }
      ideaTarget.saveToStorage(arrayOfIdeas);
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
      arrayOfIdeas.push(newIdea);
    });
  }
}

// var characterNum = document.querySelector(".displayCount");
// console.log(characterNum)
// function charCounter(countFrom, displayTo) {
//   console.log(countFrom);
//   var len = bodyInput.value.length;
//   console.log(len);
//   characterNum.innerText = "hello";
// }

function newIdeaCard(idea) {
// CREATE CARD
var cardSection = document.querySelector(".cards-section");
cardSection.insertAdjacentHTML('afterbegin', 
  `<article data-id=${idea.id} class="card">
  <h2 contenteditable="false" class = "card-input card-title">${idea.name}</h2>
  <p contenteditable="false" class = "card-input body-text">${idea.content}</p>
  <div>
  <img class="downvote" onclick="updateQuality(${-1})" src="assets/downvote.svg">
  <img class="upvote" onclick="updateQuality(${1})" src="assets/upvote.svg">
  <p class="quality">Quality: ${qualityArray[idea.quality]}</p>
  <img class="delete" src="assets/delete.svg">
  </div>
  </article>`
  );
}

function updateQuality(num) {
  var index = parseInt(event.target.parentElement.parentElement.dataset.id);
  var qualityTarget = arrayOfIdeas.find(function(idea) {
    return idea.id === index;
  });
  if (num === 1) {
    var qualityText = event.target.nextSibling.nextElementSibling;
    if (qualityTarget.quality === 0) {
      qualityText.innerText = `Quality: ${qualityArray[1]}`;
      qualityTarget.quality++;
    } else if (qualityTarget.quality === 1) {
    qualityText.innerText = `Quality: ${qualityArray[2]}`;
      qualityTarget.quality++;
    }
  } else if (num === -1) {
    var qualityTextNext = event.target.nextSibling.nextSibling.nextElementSibling;
    if (qualityTarget.quality === 1) {
      qualityTextNext.innerText = `Quality: ${qualityArray[0]}`;
      qualityTarget.quality--;
    } else if (qualityTarget.quality === 2) {
      qualityTextNext.innerText = `Quality: ${qualityArray[1]}`;
      qualityTarget.quality--;
    }
  }
  qualityTarget.updateQuality(arrayOfIdeas);
}

function searchFunction() {
//SEARCH FUNCTION
  var localStorageArray = JSON.parse(localStorage.getItem("savedIdeas"));
  cardsArea.innerHTML = "";
  var toFind = searchField.value;
  var filteredIdeas = localStorageArray.filter(function(idea) {
    return idea.name.includes(toFind) || idea.content.includes(toFind);
  });
  filteredIdeas.forEach(function(element){
    var newIdea = new Idea(element.name, element.content, element.id, element.quality);
    newIdeaCard(element);
  });
}

var showMoreBtn = document.querySelector(".show-more");

showMoreBtn.addEventListener('click', showAll);

function showAll() {
  if(showMoreBtn.innerText === "Show More"){
    showMoreBtn.innerText = "Show Less";  
  }else if(showMoreBtn.innerText === "Show Less"){
    showMoreBtn.innerText = "Show More";
    showTen();  
  }
}