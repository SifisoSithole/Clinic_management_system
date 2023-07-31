let popupWindow;
const url = "http://localhost/"

// Validate name field
function validateName() {
    let nme;

    nme = document.getElementById("fName");

    if (nme.validity.valueMissing) {
        nme.setCustomValidity("Please enter your first name");
    } else {
        nme.setCustomValidity("");
    }
}

// Validate last name field
function validateLastName() {
    let nme;

    nme = document.getElementById("lName");

    if (nme.validity.valueMissing) {
        nme.setCustomValidity("Please enter your last name");
    } else {
        nme.setCustomValidity("");
    }
}

// Validate email
function validateEmail() {
    let email;

    email = document.getElementById("email");

    if (email.validity.patternMismatch || email.validity.valueMissing) {
        email.setCustomValidity("Please enter a valid email address");
    } else {
        email.setCustomValidity("");
    }
}

// Validate password
function validatePassword() {
    let pwd = document.getElementById("pwd");
    let pwd2 = document.getElementById("pwd2");

    if (pwd.value !== pwd2.value) {
        pwd.setCustomValidity("Your passwords must match");
    } else {
        pwd.setCustomValidity("");
    }
}

function openPopup() {
  // Open pop up
  popupWindow = window.open(url + "accounts/newUser", "Popup", "width=600,height=700");

  // Wait for the window to finish loading before manipulating it
  popupWindow.onload = function() {
    // Get the form element from the pop-up window
    const form = popupWindow.document.querySelector('form');

    // Listen for the form's submit event
    form.addEventListener('submit', function(event) {
    
    // validate form fields
    let add_user = popupWindow.document.getElementById("add");
    add_user.addEventListener("click", validateName);
    add_user.addEventListener("click", validateLastName);
    add_user.addEventListener("click", validateEmail);
    add_user.addEventListener("click", validatePassword);

    // Stop the form from submitting normally
    event.preventDefault();

    // Create a new object to hold the form data
    const formData = {};

    // Use jQuery's serializeArray() method to extract the form data into an array of objects
    const dataArray = $(this).serializeArray();

    // Loop over the array of form data objects and add them to the formData object
    $.each(dataArray, function() {
      formData[this.name] = this.value;
    });

    popupWindow.close();
    // Use jQuery's $.ajax() method to send the data to the server
    $.ajax({
      url: url + 'accounts/users',
      method: 'POST',
      data: formData,
      success: function(response) {
        // Handle a successful response from the server
        if (response.result === 'exists') {
          alert("Email address already registered")
        } else if (response.result === 'failed') {
          alert("Failed to create User, please try again")
        } else {
          window.location.reload();
          alert("User created")
        }
      },
      error: function(xhr, status, error) {
        // Handle an error response from the server
        alert("Failed to create User, please try again")
      }
    });
  });
}
}

// Add user
document.getElementById("oval").addEventListener("click", openPopup);

const remove_user = document.querySelectorAll('img');

for (let i = 0; i < remove_user.length; i++) {
  remove_user[i].addEventListener('click', () => {
    let id = remove_user[i].id;
    $.ajax({
      url: url + "accounts/remove/" + id,
      method: 'DELETE',
      success: (response) => {
        if (response.result === 'deleted') {
          window.location.reload();
          alert('User deleted');
        } else if (response.result === 'denied'){
          // change url
          window.location.replace(url)
          alert("Access denied");
        } else {
          alert('Failed to delete user');
        }
      }
    })
  })
}
