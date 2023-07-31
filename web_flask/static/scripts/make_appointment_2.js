let appointment_rec = {}
document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        url: 'http://localhost/search/User/Doctor',
        method: 'GET',
        success: (response) => {
            console.log(response)
            response.forEach( (doctor) => {
                let option = document.createElement('option');
                option.value = doctor.id;
                option.innerHTML = 'Dr. ' + doctor.last_name;
                document.getElementById('doctors').appendChild(option)
            })
        }
    })
    let id = document.getElementById('select-date').className;
    $.ajax({
        url: 'http://localhost/search/User/' + id,
        method: 'GET',
        success: (response) => {
            appointment_rec.first_name = response[0].first_name;
            appointment_rec.last_name = response[0].last_name
            appointment_rec.patient_id = response[0].id
        }
    })

    let appointments;
    document.getElementById('doctors').addEventListener('change', (event) => {
        appointment_rec.doctor_id = event.target.value;
        $.ajax({
            url: 'http://localhost/search/Appointments/' + event.target.value,
            method: 'GET',
            success: (response) => {
                appointment_rec.doctor = response[0].doctor;
                appointments = response;
                document.getElementById('date').style.display = 'block';
            }
        })
        document.getElementById('date').addEventListener('change', (e) => {
            let parts = e.target.value.split('-')
            let formatedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
            appointment_rec.date = formatedDate;
            let days = [];
            appointments.forEach((appointment) => {
                if (appointment.date === formatedDate) {
                    days.push(appointment.start_time);
                }
            })
            let timeObj = [];
            let time = '09:00';

            for(let i=0; time<'17:00'; i++) {
                timeObj[i] = time;
                let [hours, minutes] = time.split(':').map(Number);
                minutes += 30;
                if(minutes >= 60) {
                    hours++;
                    minutes -= 60;
                }
                time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

                if (i === 6) { // add a 40-minute break after the fourth item
                    timeObj[i + 0.5] = "BREAK";
                    hours += 0;
                    minutes += 40;
                    if(minutes >= 60) {
                    hours++;
                    minutes -= 60;
                    }
                    time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                }
            }
            days.forEach((day) => {
                if (timeObj.includes(day)){
                    let index = timeObj.indexOf(day);
                    delete timeObj[index]
                }
            })
            timeObj.forEach( time => {
                let option = document.createElement('option');
                option.value = time;
                option.innerHTML = time;
                let select = document.getElementById('time');
                select.appendChild(option);
            })
            document.getElementById('time').style.display = 'block';
            document.getElementById('time').addEventListener('change', (e) => {
                appointment_rec.start_time = e.target.value;
                document.getElementsByClassName('back-button')[0].style.display = 'block'
            })

            document.getElementsByClassName('back-button')[0].addEventListener('click', () => {

                const xhr = new XMLHttpRequest();
                const url = 'http://localhost/accounts/add_appointment';

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
                xhr.send(JSON.stringify(appointment_rec));

            })
            console.log(appointment_rec);


        });
    });


})