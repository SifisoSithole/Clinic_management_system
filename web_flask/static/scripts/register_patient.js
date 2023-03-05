const form = document.getElementById("register_patient");
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
        url: 'https://www.healtheasehub.live/signup',
        method: 'POST',
        data: formData,
        success: function(response) {
        console.log(response)
        // Handle a successful response from the server
        if (response.result === 'exists') {
            alert("Email address already registered")
        } else if (response.result === 'failed') {
            alert("Failed to create User, please try again")
        } //else {
            //alert("User created")
            //window.location.reload();
        //}
        },
        error: function(xhr, status, error) {
        // Handle an error response from the server
        alert("Failed to create User, please try again")
        }
    });
});