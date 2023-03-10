from models.user import User
from models.medical_records import MedicalRecords
from models.appointments import Appointments
from models import storage
from datetime import datetime, timedelta
import random
import json

def convert24(str1):
     
    # Checking if last two elements of time
    # is AM and first two elements are 12
    if str1[-2:] == "AM" and str1[:2] == "12":
        return "00" + str1[2:-2]
         
    # remove the AM    
    elif str1[-2:] == "AM":
        return str1[:-2]
     
    # Checking if last two elements of time
    # is PM and first two elements are 12
    elif str1[-2:] == "PM" and str1[:2] == "12":
        return str1[:-2]
         
    else:
         
        # add 12 to hours and remove PM
        return str(int(str1[:2]) + 12) + str1[2:8]

create_user = {
    'first_name': 'Sifiso',
    'last_name': 'Sithole',
    'email': 'SitHolesifisobrian@gmail.com',
    'password': 'min',
    'age': 26,
    'gender': 'Male',
    'position': 'Admin',
}


user  = User(**create_user)
storage.new(user)
storage.save()
doctors = []
create_user = {
    'first_name': 'Lerato',
    'last_name': 'Mashaba',
    'email': 'leratomashaba@example.com',
    'password': 'min',
    'age': 30,
    'gender': 'Female',
    'position': 'Doctor',
}


user  = User(**create_user)
storage.new(user)
storage.save()
doctors.append(user)
create_user = {
    'first_name': 'Lerato',
    'last_name': 'Khumalo',
    'email': 'leratokhumalo@example.com',
    'password': 'min',
    'age': 30,
    'gender': 'Female',
    'position': 'Doctor',
}


user  = User(**create_user)
storage.new(user)
storage.save()
doctors.append(user)
with open('medical records.json', 'r') as f:
    records = json.load(f)

i = 0
for record in records:
    if i == 2:
        i = 0
    name = record['patient_name'].split()[0]
    surname = record['patient_name'].split()[1]
    email = name + surname + '@sample.com'
    email = email.lower()
    users = storage.all('User')
    for u in users.values():
        if u.email == email:
            print('user found:', u.email)
            user = u
            break
    else:
        print('create user')
        create_user['first_name'] = name
        create_user['last_name'] = surname
        create_user['email'] = email.lower()
        create_user['age'] = record['age']
        create_user['gender'] = record['gender']
        create_user['position'] = 'Patient'
        user = User(**create_user)
        storage.new(user)
        storage.save()
    create_medical = {
        'doctor_email': 'mkhawane@sample.com',
        'doctor_id': doctors[i].id,
        'patient_id': user.id,
        'gender': user.gender,
        'doctor': 'Dr. ' + doctors[i].last_name,
        'first_name': name,
        'last_name': surname,
        'age': user.age,
        'date': record['date'],
        'symptoms': json.dumps(record['symptoms']),
        'diagnosis': json.dumps(record['diagnosis']),
        'prescription': json.dumps(record['prescription'])
    }
    i = i + 1
    medical_record = MedicalRecords(**create_medical)
    storage.new(medical_record)
    storage.save()

with open('appointments.json', 'r') as f:
    appointments = json.load(f)['appointments']

time = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:10', '13:40', '14:10', '14:40', '15:10', '15:40', '16:10', '16:40']

users = list(storage.all('User').values())
i = 0
for user in users:
    if user.position == 'Doctor':
        doctor_index = i
    i += 1

length = len(users) - 1

x = 0
for appointment in appointments:
    if x == 2:
        x = 0
    while True:
        i = random.randint(0, length)
        if users[i].position != 'Doctor' and users[i].position != 'Admin':
            break
    user = users[i]
    doctor = doctors[x]
    x += 1
    index = random.randint(0, len(time) - 1)
    date = datetime.strptime(appointment['date'], '%Y-%m-%d').date()
    start_time = datetime.strptime(time[index], '%H:%M')
    end_time = start_time + timedelta(minutes=30)
    create_appointment = {
        'patient_id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'doctor': 'Dr. ' + doctor.last_name,
        'doctor_id': doctor.id,
        'date': date,
        'start_time': start_time,
        'end_time': end_time
    }
    new_appointment = Appointments(**create_appointment)
    storage.new(new_appointment)
    storage.save()
print('done!!!')

