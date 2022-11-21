//const momentLibrary = require('moment');
//validate fields, returns true if value isn't null and contains at least one non-space character
function validateExists(value) {
    return value && value.trim();//trimming removes whitespace from both ends, returns new string w/out modifying original
};

function validateDate(value) {
    const date = moment(value);
    return date.isValid();
}

//validate rating field to be a number, between 1 and 5 inclusively
function validateNumber(value) {
    return !isNaN(value);
}
  
function validateRange(value, min, max) {
    return value >= min && value <= max;
}


//main validation function
function validateForm(formData) {
    const errors = {};

    //formData.get("input name"); corresponds to the name of the <input> element
  
    // Check if name was entered
    if (!validateExists(formData.get("name"))) {
      errors.name = "Please enter a name";
    }
  
    // Check if rating was entered
    if (!validateExists(formData.get("rating"))) {
      errors.rating = "Please enter a rating";
    } else {
        // Check if the rating is a number
        if (!validateNumber(formData.get("rating"))) {
          errors.rating = "Rating must be a number";
        } else {
          // Because it is a number, convert it
          const rating = Number.parseFloat(formData.get("rating"));
          // Check that the rating is between 1 and 5, inclusive
          if (!validateRange(rating, 1, 5)) {
            errors.rating = "Rating must be between 1 and 5 inclusive";
          }
        }
      }
  
    // Check if description was entered
    if (!validateExists(formData.get("description"))) {
      errors.description = "Please enter short description";
    }
  
    // check if established date was entered
    if (!validateExists(formData.get("established"))) {
        errors.established = "Please enter date";
    } else {
        // check if the value entered was a correct date
        if (!validateDate(formData.get("established"))) {
            errors.established =
            "The date is not correctly formatted. (e.g. July 4, 1776)";
        }
    }
  
    // Check if area was entered
    if (!validateExists(formData.get("area"))) {
      errors.area = "Please enter the area of the park";
    }
  
    // Check if location date was entered
    if (!validateExists(formData.get("location"))) {
      errors.location = "Please enter the location of the park";
    }
  
    return errors;
  };

//create a submit handler helper function
const submitHandler = (event) => {
    //default setting once submitted is to refresh page. We don't want this.
    event.preventDefault();
    const form = event.target;
    /*
    //Get the name input
    const parkName = document.querySelector("#name-input").value;
    console.log(parkName);
    */
    //using the 'FormData' object
    const formData = new FormData(form);
    const errors = validateForm(formData);
    //Clear all previous errors
    const errorElements = document.querySelectorAll(".error");
    for (let element of errorElements) {
        element.style.display = "none";
    }//Display any new errors
    Object.keys(errors).forEach((key) => {
        //Find the specific error element
        const errorElement = document.querySelector(`#${key}-form .error`);
        errorElement.innerHTML = errors[key];
        errorElement.style.display = "block";
    });

    // If there are no errors
    if (!Object.keys(errors).length) {
        // Create a new element
        const parkSection = document.createElement("section");
  
        // Add the park class
        parkSection.classList.add("park-display");
  
        // Construct the HTML for this element
        const content = `
            <h2>${formData.get("name")}</h2>
            <div class="location-display">${formData.get("location")}</div>
            <div class="description-display">${formData.get("description")}</div>
            <button class="rate-button" title="Add to Favourites">&#9734;</button>
            <div class="stats">
                <div class="established-display stat">
                    <h3>Established</h3>
                    <div class="value">${moment(formData.get("established")).format(
                        "MMMM D, YYYY"
                    
                    )}</div>
                </div>
                <div class="area-display stat">
                    <h3>Area</h3>
                    <div class="value">${formData.get("area")}</div>
                </div>
                <div class="rating-display stat">
                    <h3>Rating</h3>
                    <div class="value">${formData.get("rating")}</div>
                </div>
            </div>
        `;
  
        // Set the innerHTML
        parkSection.innerHTML = content;
  
        // Append to the main element
        document.querySelector("main").appendChild(parkSection);
    }
};
//add a 'main()' function that creates an event listener for the form submission
const main = () => {
    //get the form element
    const form = document.querySelector("#park-form");
    //attach the submit handler
    form.addEventListener("submit", submitHandler);
};
//add event listener for 'DOMContentLoaded' that invokes the 'main()' function
window.addEventListener("DOMContentLoaded", main);

