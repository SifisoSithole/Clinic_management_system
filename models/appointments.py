#!/usr/bin/python3
"""Holds appointments class"""

from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship


class Appointments(BaseModel, Base):
    """Representation of a user"""
    __tablename__ = 'appointments'
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    doctor = Column(String(128), nullable=False)
    patient_id = Column(String(60), nullable=False)
    doctor_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    date = Column(Date)
    start_time = Column(Time)
    end_time = Column(Time)
    confirmed = Column(String(60), default='false')
