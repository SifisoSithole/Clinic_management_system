function openRecords(){
    let table_rows = document.querySelectorAll('.records');
    table_rows.forEach((table_row) => {
        table_row.addEventListener('click', () => {
            $.ajax({
                url: 'http://127.0.0.1:5000/search/MedicalRecords/' + table_row.id,
                method: 'GET',
                success: (response) => {
                    let first_half = document.getElementById('first-half');
                    let second_half = document.getElementById('second-half');
                    document.getElementsByClassName('back-button')[0].addEventListener('click', () => {
                        first_half.style = 'display: block;'
                        second_half.style = 'display: none;'
                    })
                    let cls = 'medical_history';
                    if (response.length === 0) {
                        document.querySelector('.medical_history .date p').innerHTML = 'No record';
                    }
                    for (let i = 0; i < response.length; i++){
                        let query = '.' + cls + ' .rows ul';
                        $(query).remove();
                        query = '.' + cls + ' .date p';
                        let date = new Date(response[i].date)
                        response[i].date = date.toISOString().substring(0, 10)
                        document.querySelector(query).innerHTML = response[i].date + '    &#9662;';
                        query = '.' + cls + ' .rows';
                        let ind_table_rows = document.querySelectorAll(query);
                        ind_table_rows[0].innerHTML = response[i].first_name;
                        ind_table_rows[1].innerHTML = response[i].last_name;
                        ind_table_rows[2].innerHTML = response[i].gender
                        ind_table_rows[3].innerHTML = response[i].age
                        let symptoms = JSON.parse(response[i].symptoms);
                        let list = document.createElement('ul');
                        symptoms.forEach( (symptom) => {
                            let item = document.createElement('li');
                            item.innerHTML = symptom;
                            list.appendChild(item);
                        })
                        ind_table_rows[4].appendChild(list);
                        ind_table_rows[5].innerHTML = JSON.parse(response[i].diagnosis);
                        let prescription = JSON.parse(response[i].prescription);
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
                        if (i < response.length - 1) {
                            let div = document.querySelectorAll('.medical_history')[0].cloneNode(true)
                            cls = cls + i;
                            div.className = cls;
                            document.querySelector('#second-half').appendChild(div);
                        }
                    }
                    first_half.style = 'display: none;'
                    second_half.style = 'display: block;'
                },
                error: (error) => {
                    console.log(error)
                }
            })
        })
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let div_ele = document.querySelectorAll('#second-half .date');
    let table = document.querySelectorAll('#second-half .content-table');
    console.log(div_ele)
    console.log(table)
    for (let i = 0; i < table.length; i++) {
        div_ele[i].addEventListener('click', () => {
            if (document.querySelector('.medical_history .date p').innerHTML !== 'No record'){
                if (table[i].style.display === 'none') {
                    table[i].style.display = 'block';
                } else {
                    table[i].style.display = 'none';
                }
            }
        });
    }
    document.getElementById('medical').addEventListener('click', () => {
        $('#tables tr td').slice(0).remove();
        let string = document.getElementById('search_string').value;
        if (string === '') {
            window.location.reload();
        }
        $.ajax({
            url: 'http://127.0.0.1:5000/search/Appointments/' + string,
            method: 'GET',
            success: (response) => {
                const headers = ['first_name', 'last_name', 'doctor', 'date', 'start_time', 'end_time'] 
                const table = document.querySelector('#tables');
                for (let i = response.length - 1; i >= 0; i--) {
                    let table_row = table.insertRow(1);
                    table_row.id = response[i].patient_id;
                    table_row.className = 'records';
                    for (let x = 0; x < headers.length; x++) {
                        table_row.insertCell(x).innerHTML = response[i][headers[x]];
                    }
                }
                openRecords();
            }
        })
    });
    openRecords();
});