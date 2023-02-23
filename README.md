# Clinic_management_system
Portfolio project for the ALX software engineering program

This is a web application designed to help clinics manage their appointments and medical records in an efficient and organized manner. With this system, patients can easily schedule appointments and access their medical records electronically, while clinic staff can manage appointments, patient records, and medical history seamlessly.

## Features
* Patient account creation and management
* Schedule appointments with doctors
* View and update appointment status
* Electronic medical records management
* Access to medical records for patients and authorized clinic staff
* Search functionality in various pages:
    * User page: search by user id, name, surname, age, gender, or position
    * Medical records page: search by patient id, name, surname, doctor, age, gender, or medical record id
    * Appointments page: search by name, surname, doctor, patient id, or appointment id


## Installation
To run this application, you will need to have python3 and a MySQL database installed on your system. Clone the repository to your local machine and navigate to the project directory in your terminal. Run the following command to install the required dependencies:

```python3
pip3 install flask
pip3 install SQLAlchemy

```

After the dependencies are installed, create a new file named .env in the root directory and set the following environment variables:

```
MYSQL_USER=
MYSQL_PWD=
MYSQL_DB=
```
Replace the values with your MySQL database credentials.

To start the application, run the following command:
```python3
python3 -m web_flask.app
```
The application will now be running on http://localhost:3000.


