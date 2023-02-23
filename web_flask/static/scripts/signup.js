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

let sign_in = document.getElementById("signbtn");
sign_in.addEventListener("click", validateName);
sign_in.addEventListener("click", validateLastName);
sign_in.addEventListener("click", validateEmail);
sign_in.addEventListener("click", validatePassword);
