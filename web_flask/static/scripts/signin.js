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

    if (pwd.validity.valueMissing) {
        pwd.setCustomValidity("Please enter your password");
    } else {
        pwd.setCustomValidity("");
    }
}

let sign_in = document.getElementById("signbtn");
sign_in.addEventListener("click", validateEmail);
sign_in.addEventListener("click", validatePassword);
