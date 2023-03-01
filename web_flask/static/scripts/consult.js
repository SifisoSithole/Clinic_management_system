function viewTable(){
    let div_ele = document.querySelectorAll('#second-half .date');
    let table = document.querySelectorAll('#second-half .content-table');
    for (let i = 0; i < table.length; i++) {
        if (div_ele[i].id === 'event') {
            div_ele[i].removeEventListener('click', openTable);
            div_ele[i].id = 'noevent';
        }
        div_ele[i].addEventListener('click', function openTable() {
        if (document.querySelector('.medical_history .date p').innerHTML !== 'No record'){
            if (table[i].style.display === 'none') {
                table[i].style.display = 'block';
            } else {
                table[i].style.display = 'none';
            }
        }
        });
        div_ele[i].id = 'event'
    }
}

function openRecords(){
    let table_rows = document.querySelectorAll('.records');
    table_rows.forEach((table_row) => {
        table_row.addEventListener('click', () => {
            console.log(table_row.id)
            let url = 'http://127.0.0.1:5000/search/MedicalRecords1/' + table_row.id;
            $.ajax({
                url: url,
                method: 'GET',
                success: (response) => {
                    console.log(response)
                    let first_half = document.getElementById('first-half');
                    let second_half = document.getElementById('second-half');
                    let third_half = document.getElementById('third-half');
                    document.getElementsByClassName('back-button')[0].addEventListener('click', () => {
                        window.location.reload()
                    })
                    document.getElementsByClassName('back-button')[1].addEventListener('click', () => {
                        first_half.style = 'display: none;'
                        second_half.style = 'display: none;'
                        third_half.style = 'display: block';
                    })
                    document.getElementsByClassName('back-button')[2].addEventListener('click', () => {
                        first_half.style = 'display: none;'
                        second_half.style = 'display: block;'
                        third_half.style = 'display: none';
                    })
                    let validator = ['0', '0', '0']
                    let doc_id = document.querySelector('#third-half .content-table').id;
                    let doc_name = document.getElementById('user-info');
                    doc_name = doc_name.innerHTML.split(' ')
                    doc_name = doc_name[1].slice(0, doc_name[1].length - 1)
                    let app_id = table_row.childNodes[1].childNodes[0].id;
                    let record;
                    if (response.length > 0){
                        record = {
                            'id': app_id,
                            'patient_id': response[0].patient_id,
                            'first_name': response[0].first_name,
                            'last_name': response[0].last_name,
                            'doctor': 'Dr. ' + doc_name,
                            'age': response[0].age,
                            'gender': response[0].gender,
                            'doctor_id': doc_id,
                            'symptoms': [],
                            'diagnosis': "",
                            'prescription': []
                        }
                    } else {
                        $.ajax({
                            url: 'http://127.0.0.1:5000/accounts/get_user/' + table_row.id,
                            method: 'GET',
                            success: (response) => {
                                console.log(response)
                                record = {
                                    'id': app_id,
                                    'patient_id': response.id,
                                    'first_name': response.first_name,
                                    'last_name': response.last_name,
                                    'doctor': 'Dr. ' + doc_name,
                                    'age': response.age,
                                    'gender': response.gender,
                                    'doctor_id': doc_id,
                                    'symptoms': [],
                                    'diagnosis': "",
                                    'prescription': []
                                }
                            }
                        });

                    }
                    document.getElementsByClassName('back-button')[3].addEventListener('click', () => {
                        if (validator.includes('0')){
                            alert('Please complete the medical record before submiting')
                        } else {
                            const xhr = new XMLHttpRequest();
                            const url = 'http://127.0.0.1:5000/accounts/add_record';

                            xhr.open('POST', url);
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.onload = function() {
                            if (xhr.status === 200) {
                                console.log(xhr.responseText);
                                alert('Medical record added')
                                window.location.reload()
                            } else {
                                alert('Failed to add record');
                            }
                            };
                            xhr.send(JSON.stringify(record));

                        }
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
                        ind_table_rows[2].innerHTML = response[i].doctor;
                        ind_table_rows[3].innerHTML = response[i].gender
                        ind_table_rows[4].innerHTML = response[i].age
                        let symptoms;
                        if (typeof(response[i].symptoms) === 'string') {
                            symptoms = JSON.parse(response[i].symptoms);
                        } else {
                            symptoms = response[i].symptoms;
                        }
                        let list = document.createElement('ul');
                        symptoms.forEach( (symptom) => {
                            let item = document.createElement('li');
                            item.innerHTML = symptom;
                            list.appendChild(item);
                        })
                        ind_table_rows[5].appendChild(list);
                        ind_table_rows[6].innerHTML = response[i].diagnosis;
                        let medication_list = document.createElement('ul');
                        let dosage_list = document.createElement('ul');
                        let prescription;
                        if (typeof(response[i].prescription) === 'string') {
                            prescription = JSON.parse(response[i].prescription);
                        } else {
                            prescription = response[i].prescription;
                        }
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
                        ind_table_rows[7].appendChild(medication_list);
                        ind_table_rows[8].appendChild(dosage_list);
                        if (i < response.length - 1) {
                            let div = document.querySelectorAll('.medical_history')[0].cloneNode(true)
                            cls = cls + i;
                            div.className = cls;
                            document.querySelector('#second-half').appendChild(div);
                        }
                    }
                    first_half.style = 'display: none;'
                    second_half.style = 'display: block;'
                    let images = document.querySelectorAll('#third-half img');
                    let rows = document.querySelectorAll('#third-half .rows');
                    $('#third-half p').remove()
                    let index = 0;
                    let prescriptions = {
                            'medication_name': "",
                            'dosage': "",
                            'frequency': "",
                            'duration': ""
                    }
                    let childNode = 1;
                    document.getElementById('diagnosis').style.display = 'block';
                    document.getElementById('diagnosis').value = '';
                    images[1].style.display = 'block';
                    images[1].style = 'text-align: center;'
                    let ind = 1;
                    for (let i = 0; i < images.length; i++){
                        if (images[i].id === 'event'){
                            document.querySelectorAll('#third-half #prescription input') .forEach((node) => {
                                node.style = 'border: none;'
                            })
                            images[i].removeEventListener('click', addPrescription)
                            images[i].id = 'noevent';
                        }
                        if (images[i].id === 'noevent') {
                            images[i].addEventListener('click', function addPrescription() {
                                if (i < 2) {
                                    let paragraph;
                                    if (i === 0) {
                                        let text = rows[i].childNodes[childNode].value;
                                        if (text !== "") {
                                            rows[i].childNodes[childNode].value = "";
                                            paragraph = document.createElement('p');
                                            paragraph.innerHTML = text;
                                            console.log(paragraph)
                                            rows[i].insertBefore(paragraph, document.getElementById('sysm'));
                                            childNode++;
                                            record.symptoms.push(text)
                                            validator[0] = '1';
                                        }
                                    } else if (i === 1) {
                                        let text = rows[i].childNodes[1].value;
                                        if (text !== "") {
                                            paragraph = document.createElement('p');
                                            paragraph.innerHTML = text;
                                            console.log(paragraph)
                                            rows[i].insertBefore(paragraph, document.getElementById('diagnosis'));
                                            record.diagnosis = text;
                                            document.getElementById('diagnosis').style.display = 'none';
                                            images[1].style.display = 'none';
                                            validator[1] = '1';
                                            console.log(validator);
                                        }
                                    }
                                } else {
                                    let prescription = ["", "", "", ""];
                                    let medication = rows[i].childNodes;
                                    console.log(medication)
                                    prescription[0] = medication[ind].value;
                                    if (prescription[0] === "") {
                                        medication[ind].style = "border: solid #FF0000;"
                                    } else {
                                        medication[ind].style = "border: none;"
                                        prescriptions.medication_name = prescription[0];
                                    }
                                    prescription[1] = medication[ind + 2].value;
                                    if (prescription[1] === "") {
                                        medication[ind + 2].style = "border: solid #FF0000;"
                                    } else {
                                        medication[ind + 2].style = "border: none;"
                                        prescriptions.dosage = prescription[1];
                                    }
                                    prescription[2] = medication[ind + 4].value;
                                    if (prescription[2] === "") {
                                        medication[ind + 4].style = "border: solid #FF0000;"
                                    } else {
                                        medication[ind + 4].style = "border: none;"
                                        prescriptions.frequency = prescription[2];
                                    }
                                    prescription[3] = medication[ind + 6].value;
                                    if ( prescription[3] === "") {
                                        medication[ind + 6].style = "border: solid #FF0000;"
                                    }else {
                                        medication[ind + 6].style = "border: none;"
                                        prescriptions.duration = prescription[3];
                                    }
                                    if (prescription.includes("")) {
                                        console.log(prescription);
                                        console.log(record.prescription)
                                    } else {
                                        record.prescription.push(prescriptions);
                                        let input = document.getElementById('pre');
                                        
                                        let medication_name = document.createElement('p');
                                        medication_name.innerHTML = "Medication Name: " + prescriptions.medication_name;
                                        let dosage = document.createElement('p')
                                        dosage.innerHTML = "Dosage: " + prescriptions.dosage;
                                        let frequency = document.createElement('p')
                                        frequency.innerHTML = "Frequency: " + prescriptions.frequency;
                                        let duration = document.createElement('p');
                                        duration.innerHTML = "Duration: " + prescriptions.duration;
                                        rows[2].insertBefore(medication_name, pre)
                                        rows[2].insertBefore(dosage, pre)
                                        rows[2].insertBefore(frequency, pre)
                                        rows[2].insertBefore(duration, pre)
                                        ind = ind + 4;
                                        medication[ind].value = "";
                                        for (let i = 2; i <= 6; i += 2 ) {
                                            medication[ind + i].value = "";
                                        }
                                        validator[2] = '1';
                                    }
                                }
                            })
                            images[i].id = 'event'
                        }
                    }
                    viewTable();
                },
                error: (error) => {
                    console.log(error)
                }
            })
        })
    });
}

document.addEventListener('DOMContentLoaded', function() {
    openRecords();
});