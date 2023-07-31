let position = document.cookie.split('; ').find(row => row.startsWith('position=')).split('=')[1];
document.addEventListener('DOMContentLoaded', function() {
    $('img').click((e) => {
        let image = e.currentTarget.id
        $.ajax({
        url: "http://localhost:5000/accounts/remove/User/" + image,
        method: 'DELETE',
        success: (response) => {
            if (response.result === 'deleted') {
            window.location.reload();
            alert('User deleted');
            } else if (response.result === 'denied'){
            // change url
            window.location.replace(url)
            alert("Access denied");
            }
        },
        error: function(xhr, status, error) {
            // Handle an error response from the server
            alert("Failed to delete user, please try again")
        }
        });

    })
    document.getElementById('users').addEventListener('click', () => {
        $('table tr td').slice(0).remove();
        let string = document.getElementById('search_string').value;
        if (string === '') {
            window.location.reload();
        }
        $.ajax({
            url: 'http://localhost:5000/search/User/' + string,
            method: 'GET',
            success: (response) => {
                let headers;
                if (position === 'Receptionist') {
                    headers = ['first_name', 'last_name', 'email', 'age', 'gender'];
                } else {
                    headers = ['first_name', 'last_name', 'email', 'age', 'gender', 'position'];
                }
                const table = document.querySelector('table');
                for (let i = 0; i < response.length; i++) {
                    if (position === 'Receptionist') {
                        if (response[i].position !== 'Patient'){
                            continue;
                        }
                    }
                    let table_row = table.insertRow(1);
                    for (let x = 0; x < headers.length; x++) {
                        table_row.insertCell(x).innerHTML = response[i][headers[x]];
                    }
                    let image = document.createElement('img');
                    image.src = '../static/images/delete.png';
                    image.id = response[i].id;
                    image.addEventListener('click', () => {
                        $.ajax({
                        url: "http://localhost:5000/accounts/remove/User/" + image.id,
                        method: 'DELETE',
                        success: (response) => {
                            if (response.result === 'deleted') {
                            window.location.reload();
                            alert('User deleted');
                            } else if (response.result === 'denied'){
                            // change url
                            window.location.replace(url)
                            alert("Access denied");
                            }
                        },
                        error: function(xhr, status, error) {
                            // Handle an error response from the server
                            alert("Failed to delete user, please try again")
                        }
                        });
                    });
                    if (position === 'Admin') {
                        table_row.insertCell(6).appendChild(image);
                    }
                }
            }
        })
    });
});