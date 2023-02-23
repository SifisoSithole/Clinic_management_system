#!/usr/bin/python3
"""
Contains class BaseModel
"""

import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()


class BaseModel:
     """The BaseModel class from which future classes will be derived"""
     id = Column(String(60), primary_key=True)
     def __init__(self, *args, **kwargs):
         """Initialization of the models"""
         if kwargs:
             if kwargs.get("id", None) is None:
                 self.id = str(uuid.uuid4())
             for key, value in kwargs.items():
                 setattr(self, key, value)
         else:
             self.id = str(uuid.uuid4())

     def save(self):
        """Commits the changes to a database"""
        from models import storage
        storage.save()
        storage.reload()

     def to_dict(self):
        """returns a dictionary containing all keys/values of the instance"""
        new_dict = self.__dict__.copy()
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']
        if 'password' in new_dict:
            del new_dict['password']
        if 'calender_id' in new_dict:
            del new_dict['calender_id']
        return new_dict
        

     def delete(self):
        """delete the current instance from the storage"""
        from models import storage
        storage.delete(self)
        storage.save()
        storage.reload()
