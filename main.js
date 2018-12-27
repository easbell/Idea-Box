//VARIABLES


//  
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

cardsArea.addEventListener('dblclick', editCard);

// showMoreBtn.addEventlListener('click', showAll);


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



function newIdeaCard(idea) {
// CREATE CARD
var cardSection = document.querySelector(".cards-section");
cardSection.insertAdjacentHTML('afterbegin', 
  `<article data-id=${idea.id} class="card">
  <h2 contenteditable="false" class = "card-input card-title">${idea.name}</h2>
  <p contenteditable="false" class = "card-input body-text">${idea.content}</p>
  <div>
  <img class="downvote" onclick="updateQuality(-1)" src="assets/downvote.svg">
  <img class="upvote" onclick="updateQuality(1)" src="assets/upvote.svg">
  <p class="quality">Quality: <span>${qualityArray[idea.quality]}</span></p>
  <img class="delete" src="assets/delete.svg">
  </div>
  </article>`
  );
}

// cardsArea.addEventListener('click', updateQuality);
// upvoteBtn.addEventListener('click', updateQuality);

 // console.log("hello")
 //  if (event.target.className === "downvote") {

function updateQuality(num) {
    var index = parseInt(event.target.parentElement.parentElement.dataset.id);
    var qualityTarget = arrayOfIdeas.find(function(idea) {
      return idea.id === index;
    })

    var qualityText = event.target.nextSibling.nextElementSibling;
    if (num === 1) {
      qualityTarget.quality++;
    } else if (num === -1) {
      qualityTarget.quality--;
    }

    console.log(qualityTarget.quality)

    var qualityTextNext = event.target.nextSibling.nextSibling.nextElementSibling;

    
    if (qualityTarget.quality === 1) {
      qualityText.innerText = `Quality: ${qualityArray[1]}`;
    } else if (qualityTarget.quality === 2){
      qualityText.innerText = `Quality: ${qualityArray[2]}`;
    } else if (qualityTarget.quality === 0) {
      qualityText.innerText = `Quality: ${qualityArray[0]}`;
    } else if (qualityTarget.quality--);

    if (qualityTarget.quality-1) {
      qualityTextNext.innerText = `Quality: ${qualityArray[0]}`;
    } else if (qualityTarget.quality-2) {
      qualityTextNext.innerText = `Quality: ${qualityArray[1]}`;
    } else if (qualityTarget.quality);
  }
  

  

// for (var i = 0; i >= qualityArray.length; i++) {
//   if (qualityTarget.quality === 1) {
//       qualityText.innerText = `Quality: ${qualityArray[1]}`;
//     } else if (qualityTarget.quality === 2){
//       qualityText.innerText = `Quality: ${qualityArray[2]}`;
//     } else if (qualityTarget.quality === 0) {
//       qualityText.innerText = `Quality: ${qualityArray[0]}`;
//     }
// }





    // console.log(index)
    // var qualityText = event.target.nextSibling.nextElementSibling;
    // console.log(event.target)
    // if (num === 1) {
    //   qualityTarget.quality = 1;
    // } else if (num === -1) {
    //   qualityTarget.quality--;
    // }

    // console.log(qualityTarget.quality)


  //   if (qualityTarget.quality === 1) {
  //     qualityText.innerText = `Quality: ${qualityArray[1]}`;
  //   } else if (qualityTarget.quality === 2){
  //     qualityText.innerText = `Quality: ${qualityArray[2]}`;
  //   } else if (qualityTarget.quality === 0)
  //     qualityText.innerText = `Quality: ${qualityArray[0]}`;
  



  // var index = parseInt(event.target.parentElement.dataset.id);

  // get the object find
  // arrayOfIdeas

  // counter += num;
  // If this element has class of upvote, allow this, if the element has a class of downvote, do this

  // thisElement.nextElementSibling.innerHTML = qualityArray[counter];


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
///////SHOW MORE BUTTON
var showMoreBtn = document.getElementById("show-more");

showMoreBtn.addEventlListener('click', showLess);

function showLess() {
  // var shortList = arrayOfIdeas.slice(-10);
  showMoreBtn.innerText = "Show Less";
}


// function showAll(){
// }

//////////////

// on pageLoad (with empty localStorage)
//     button.hidden = true (default)
// when saving cards
//     if (arrayOfIdeas.length >=11){
//       button.hidden= false(Show More)
//       display (-10) most recent ideas
//     }(default)
// when showMoreBtn is clicked
//     full arrayOfIdeas is displayed
//     button.innerText = "Show Less"
// when Show Less button clicked
//     (defaults restored)
//     10 most recent cards displayed on DOM
//     button.innerText = "Show More"