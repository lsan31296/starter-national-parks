/*
//Having access to the whole document due to DOM(Document Object Model)
console.log(document);
//Using 'querySelector()' method to find first matching CSS selector. Equivalent to 'find()'
const headingH1 = document.querySelector("h1");
console.log(headingH1);
//1. Find element with class="value"
const valueClass = document.querySelector(".value");
console.log(valueClass);
//2. Find <button> element
const buttonElement = document.querySelector("button");
console.log(buttonElement);
//3. Find element w/class="area"
const areaClass = document.querySelector(".area-display.stat");
console.log(areaClass);
//4. Find a 'div' that is a descendant of an element w/class="stat"
const divDescendantOfClassStat = document.querySelector(".stat div");
console.log(divDescendantOfClassStat);
//5. Find an element w/class="hello". Take note of what is returned.
const helloClass = document.querySelector(".hello");
console.log(helloClass);
//5. Received null is seems
//Using 'querySelectorAll()' method to find all buttons
const buttons = document.querySelectorAll("button");
console.log(buttons);
*/

//const { Button } = require("bootstrap"); //don't know where this line came from

/*
//Using 'queryLisAll()' to iterate over using 'values()' method
// Get a list of all `<h3>` elements
const heading3List = document.querySelectorAll("h3");
// Iterate over the list and print each one
for (let element of heading3List.values()) {
  console.log(element);
}
*/
/*
//Using simple 'for' loop to iterate over NodeList
for (let i = 0; i < heading3List.length; i++) {
    const element = heading3List[i];
    console.log(element);
  }
*/

/*
//Get a list of all 'div' elements containing ratings on the page, log using 'value' method
const divsContainingRatings = document.querySelectorAll(".rating-display");
for (let element of divsContainingRatings.values()) {
    console.log(element);
}
//Log using simple for loop
for (let i=0; i<divsContainingRatings.length; i++) {
    const el = divsContainingRatings[i];
    console.log(el);
}
*/


//Get a list of all the descriptions on your page. Which happen to be in class="description-display"
const descriptions = document.querySelectorAll(".description-display");
//console.log(descriptions); //returns a list of 'div's that contain the descriptions
//Now let's use the 'innerText' property to show the text of each description, using 'values()'
/* for (let desc of descriptions.values()) {
    let content = desc.innerText;
    console.log(content);
 }
*/

/*
//Truncate any description over 250 characters and add ellipses to them. Seems like you lose the content but you may not because it is just a property. You're not actually changing the HTML itself, I believe. 
for (let desc of descriptions.values()) {
    let content = desc.innerText;
    if(content.length > 250) {
        content = content.slice(0, 250);
        content = content + "...";
    }
    console.log(content);
}
*/

/*
//Now you can update the 'HTMLElement' using the code above. Update code to include the following assignment to 'desc.innerText'
for (let desc of descriptions.values()) {
    let content = desc.innerText;
  
    if (content.length > 250) {
      content = content.slice(0, 250);
      content = content + "...";
    }
  
    desc.innerText = content;
  }
*/

/*
//Using the innerHTML property to make ellipses clickable with an <a> tag. If you use innterText you will get the literal string of HTML code. 
for (let desc of descriptions.values()) {
  let content = desc.innerText;

  if (content.length > 250) {
    content = content.slice(0, 250);
    content = content + '<a href="#">...</a>';
  }

  desc.innerHTML = content;
}
*/

/*
//Dynamically adding classes. When rating is greater than 4.7, replace 'value' class with the 'high-rating' class.
const ratings = document.querySelectorAll(".rating-display .value");
for (let rating of ratings) {
    let ratingValue = parseFloat(rating.innerText);
  
    if (ratingValue > 4.7) {
      rating.classList.add("high-rating");
      rating.classList.remove("value");
    }
  }
*/


/*
//select a list of parks
const parks = document.querySelectorAll(".park-display");
//get the length
const numberParks = parks.length;
//create a new 'div'
const newElement = document.createElement("div");
//add to the div using the innerText property
newElement.innerText = `${numberParks} exciting parks to visit!`;
//add a class to it, that you've defined in CSS using classList() and add() methods
newElement.classList.add("header-statement");
//find the element you will be adding new div to
const header = document.querySelector("header");
//add it on the page with appendChild() method
header.appendChild(newElement);
*/

/*
// Get the parent element of all parks
const main = document.querySelector("main");

// Select a single park
const park = main.querySelector(".park-display");

// Remove that park
main.removeChild(park);
*/

/*
//Add event listener to a button
const firstBtn = document.querySelector("button");//first select your associated element
//now use addEventListener() method, which takes two arguments. event name and event handler
firstBtn.addEventListener("click", (event) => {
  console.log("You clicked the button", event);
  console.log(event.target);//targets the element that was associated with event
});//Output: above message + event: PointerEvent {...} lots of data in event object
*/

/*
//Imagine you want to highlight the park when the buttons associated with that park is clicked.
//Select all the buttons for all the parks
const allBtns = document.querySelectorAll(".rate-button");
//Iterate through the list of buttons and add an event handler to each
allBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(event.target.parentNode);//allows you to determine which park button was pressed since the parent node '<section>' represents the park
    const park = event.target.parentNode;
    park.style.backgroundColor = "#c8e6c9";//changes the bg-color when clicked
  });
});
*/

//A complete example. Suppose you wanted to give the user the ability to sort by either name or rating.
//You can add links and allow user to click which one they want. You would then get the list of 
//parks from the DOM, perform the specified sort, and insert the sorted parks back into the DOM.
//HTML code already preset to have two links named Name and Rating.
//style already added in style.css for sorter class

//sort by name
//add event listener to link
const nameSorter = document.querySelector("#name-sorter");
nameSorter.addEventListener("click", (event) => {
  //remember that the defaul behavior of a link is to follow the clicked link. Which will just reload
  //the page, so in order to stop this default behavior we use the next line of code.
  event.preventDefault();
  //get name of main element
  const main = document.querySelector("main");//contains all the parks
  //get the list of parks
  const parksList = main.querySelectorAll(".park-display");
  //Empty the main element
  main.innerHTML = "";
  //create an array
  const parksArray = Array.from(parksList);
  //sort the array
  parksArray.sort((parkA, parkB) => {
    const parkAName = parkA.querySelector("h2").innerText;
    const parkBName = parkB.querySelector("h2").innerText;
    if (parkAName < parkBName) {
      return -1;
    } else if (parkAName > parkBName) {
      return 1;
    } else {
      return 0;
    }
  });
  //insert each park into the DOM
  parksArray.forEach((park) => {
    main.appendChild(park);
  });
});

//sort by rating
//Function for sorting
const sortByRating = (parkA, parkB) => {
  const parkARating = parkA.querySelector(".rating-display .value").innerText;
  const parkBRating = parkB.querySelector(".rating-display .value").innerText;
  if (parkARating > parkBRating) {
    return -1;
  } else if (parkARating < parkBRating) {
    return 1;
  } else {
    return 0;
  }
};
//Function for 'ratingSorter' click
const ratingSorterClickHandler = (event) => {
  event.preventDefault();
  //get main element
  const main = document.querySelector("main");
  //get list of parks
  const parksList = main.querySelectorAll(".park-display");
  //empty the main
  main.innerHTML = "";
  //create an array
  const parksArray = Array.from(parksList);
  //sort the array
  parksArray.sort(sortByRating);
  //insert each park into the DOM
  parksArray.forEach((park) => {
    main.appendChild(park);
  });
};
//select rating sorter link
const ratingSorter = document.querySelector("#rating-sorter");
//add eventlistener to this link
ratingSorter.addEventListener("click", (ratingSorterClickHandler));



