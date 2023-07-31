let position = document.cookie.split('; ').find(row => row.startsWith('position=')).split('=')[1];
function openRecords(){
    let table_rows = document.querySelectorAll('.records');
    table_rows.forEach((table_row) => {
        table_row.addEventListener('click', () => {
            $.ajax({
                url: 'http://localhost:5000/search/record/' + table_row.id,
                method: 'GET',
                success: (response) => {
                    $('.rows ul').remove();
                    let first_half = document.getElementById('first-half');
                    let second_half = document.getElementById('second-half');
                    document.getElementsByClassName('back-button')[0].addEventListener('click', () => {
                        first_half.style = 'display: block;'
                        second_half.style = 'display: none;'
                    })
                    if (position !== 'Patient') {
                        document.getElementsByClassName('back-button')[1].addEventListener('click', () => {
                            $.ajax({
                                url: 'http://localhost:5000/accounts/remove/MedicalRecords/' + response.id,
                                method: 'delete',
                                success: (response) => {
                                    if (response.result === 'deleted') {
                                        window.location.reload();
                                        alert('Medical record deleted');
                                    } else if (response.result === 'denied'){
                                        window.location.replace(url)
                                        alert("Access denied");
                                    }
                                }
                            })
                        })
                    }

                    let ind_table_rows = document.querySelectorAll('.rows');
                    ind_table_rows[0].innerHTML = response.first_name;
                    ind_table_rows[1].innerHTML = response.last_name;
                    ind_table_rows[2].innerHTML = response.gender
                    ind_table_rows[3].innerHTML = response.age
                    let symptoms;
                    if (typeof(response.symptoms) === 'string') {
                        symptoms = JSON.parse(response.symptoms);
                    } else {
                        symptoms = response.symptoms;
                    }
                    let list = document.createElement('ul');
                    symptoms.forEach( (symptom) => {
                        let item = document.createElement('li');
                        item.innerHTML = symptom;
                        list.appendChild(item);
                    })
                    ind_table_rows[4].appendChild(list);
                    ind_table_rows[5].innerHTML = response.diagnosis;
                    let prescription;
                    if (typeof(response.prescription) === 'string') {
                        prescription = JSON.parse(response.prescription);
                    } else {
                        prescription = response.prescription;
                    }
                    let medication_list = document.createElement('ul');
                    let dosage_list = document.createElement('ul');
                    prescription.forEach( (pre) => {
                        let medication_item = document.createElement('li')
                        medication_item.innerHTML = pre.medication_name;
                        medication_list.appendChild(medication_item);
                        let dosage_item = document.createElement('li')
                        dosage_item.innerHTML = pre.medication_name;
                        let msg = 'Take ' + pre.dosage + ' ' + pre.frequency + ' for ' + pre.duration
                        let lst = document.createElement('li');
                        lst.innerHTML = msg;
                        let lst2 = document.createElement('ul')
                        lst2.appendChild(lst);
                        dosage_item.appendChild(lst2);
                        dosage_list.appendChild(dosage_item);
                    });
                    ind_table_rows[6].appendChild(medication_list);
                    ind_table_rows[7].appendChild(dosage_list);
                    first_half.style = 'display: none;'
                    second_half.style = 'display: block;'
                }
            })
        })
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('medical').addEventListener('click', () => {
        $('#tables tr td').slice(0).remove();
        let string = document.getElementById('search_string').value;
        if (string === '') {
            window.location.reload();
        }
        let search;
        $.ajax({
            url: 'http://localhost:5000/search/MedicalRecords/' + string,
            method: 'GET',
            success: (response) => {
                const headers = ['first_name', 'last_name', 'doctor', 'date', 'age', 'gender'] 
                const table = document.querySelector('#tables');
                for (let i = 0; i < response.length; i++) {
                    let table_row = table.insertRow(1);
                    table_row.id = response[i].id;
                    table_row.className = 'records';
                    for (let x = 0; x < headers.length; x++) {
                        if (headers[x] == 'date'){
                            let date = new Date(response[i].date)
                            response[i].date = date.toISOString().substring(0, 10)
                        }

                        table_row.insertCell(x).innerHTML = response[i][headers[x]];
                    }
                }
                openRecords();
            }
        })
    });
    openRecords();
});