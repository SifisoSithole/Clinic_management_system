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

let sign_in = document.querySelectorAll("#signbtn")[0];
sign_in.addEventListener("click", validateEmail);
sign_in.addEventListener("click", validatePassword);

document.querySelectorAll('#signbtn')[1].addEventListener('click', () => {
    document.getElementById('login-accounts').style.display = 'grid';
})

document.getElementById('admin').addEventListener('click', () => {
    document.getElementById('email').value = "Sitholesifisobrian@gmail.com";
    document.getElementById('pwd').value = 'min'
    document.getElementById("signin").submit();
})

document.getElementById('receptionist').addEventListener('click', () => {
    document.getElementById('email').value = "sitholesifiso@example.com";
    document.getElementById('pwd').value = 'min'
    document.getElementById("signin").submit();
})

document.getElementById('doctor').addEventListener('click', () => {
    document.getElementById('email').value = "leratomashaba@example.com";
    document.getElementById('pwd').value = 'min'
    document.getElementById("signin").submit();
})

document.getElementById('patient').addEventListener('click', () => {
    document.getElementById('email').value = "thabokhumalo@sample.com";
    document.getElementById('pwd').value = 'min'
    document.getElementById("signin").submit();
})