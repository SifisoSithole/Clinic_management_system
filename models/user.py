#!/usr/bin/python3
"""Holds user class"""

from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, UniqueConstraint, Integer, JSON
from sqlalchemy.orm import relationship


i = 0

def mydefault():
    global i
    i += 1
    return i

class User(BaseModel, Base):
    """Representation of a user"""
    __tablename__ = 'users'
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    age = Column(Integer)
    gender = Column(String(60))
    password = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    position = Column(String(128), nullable=False)
    calendar_id = Column(Integer, default=mydefault)
    appointments = relationship('Appointments', backref='user', cascade="all, delete")
    medicalRecords = relationship('MedicalRecords', backref='user', cascade="all, delete")
    session = relationship('Session', backref='user', cascade="all, delete")


    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

