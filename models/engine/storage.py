#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.user import User
from models.base_model import BaseModel, Base
from models.appointments import Appointments
from models.medical_records import MedicalRecords
from models.session import Session
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine, or_
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {'Appointments': Appointments, 'MedicalRecords': MedicalRecords, 'User': User, 'Session': Session}


class Storage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        MYSQL_USER = getenv('MYSQL_USER')
        MYSQL_PWD = getenv('MYSQL_PWD')
        MYSQL_DB = getenv('MYSQL_DB')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@127.0.0.1/{}'.
                                      format(MYSQL_USER,
                                             MYSQL_PWD,
                                             MYSQL_DB))

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        if cls is None:
            for clss in classes.values():
                objs = self.__session.query(clss).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        else:
            if cls in classes:
                objs = self.__session.query(classes[cls]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.keys():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

        return None

    def search(self, cls, str):
        """Search using name or email address"""
        if '@' in str and cls != 'MedicalRecords':
            result =  self.__session.query(classes[cls]).filter(classes[cls].email == str).all()
        else:
            if cls == 'User':
                result = self.__session.query(classes[cls]).filter(or_(classes[cls].first_name == str, classes[cls].last_name == str,
                                                                    classes[cls].position == str, classes[cls].id == str,
                                                                    classes[cls].age == str, classes[cls].gender == str)).all()
            elif cls == 'Appointments':
                result = self.__session.query(classes[cls]).filter(or_(classes[cls].first_name == str, classes[cls].last_name == str,
                                                                    classes[cls].doctor == str, classes[cls].id == str,
                                                                    classes[cls].patient_id == str)).all()
            elif cls == 'MedicalRecords':
                result = self.__session.query(classes[cls]).filter(or_(classes[cls].first_name == str, classes[cls].last_name == str,
                                                                    classes[cls].id == str, classes[cls].patient_id == str, classes[cls].doctor == str,
                                                                    classes[cls].age == str, classes[cls].gender == str)).all()
        return result

    def new(self, obj):
        """add the object to the current database session"""
        if 'email' in obj.to_dict():
            setattr(obj, 'email', obj.email.lower())
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

