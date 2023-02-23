from models.user import User
from models.medical_records import MedicalRecords
from models.appointments import Appointments
from models import storage
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
with open('medical records.json', 'r') as f:
    records = json.load(f)

for record in records:
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
        'patient_id': user.id,
        'gender': user.gender,
        'doctor': 'Dr. Mashaba',
        'first_name': name,
        'last_name': surname,
        'age': user.age,
        'date': record['date'],
        'symptoms': json.dumps(record['symptoms']),
        'diagnosis': json.dumps(record['diagnosis']),
        'prescription': json.dumps(record['prescription'])
    }
    medical_record = MedicalRecords(**create_medical)
    storage.new(medical_record)
    storage.save()

with open('appointments.json', 'r') as f:
    appointments = json.load(f)['appointments']

users = list(storage.all('User').values())
i = 0
for user in users:
    if user.position == 'Doctor':
        doctor_index = i
    i += 1

length = len(users) - 1

for appointment in appointments:
    while True:
        i = random.randint(0, length)
        if users[i].position != 'Doctor' and users[i].position != 'Admin':
            break
    user = users[i]
    doctor = users[doctor_index]
    create_appointment = {
        'patient_id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'doctor': 'Dr. ' + doctor.last_name,
        'doctor_id': doctor.id,
        'date': appointment['date'],
        'start_time':  convert24(appointment['start_time']).split()[0],
        'end_time': convert24(appointment['end_time']).split()[0]
    }
    new_appointment = Appointments(**create_appointment)
    storage.new(new_appointment)
    storage.save()
print('done!!!')

