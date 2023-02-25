#!/usr/bin/python3
"""Holds MedicalRecords class"""

from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Date, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship


class MedicalRecords(BaseModel, Base):
    """Representation of a medical records"""
    __tablename__ = 'medical_records'
    doctor = Column(String(128), nullable=False)
    doctor_id = Column(String(60), nullable=False)
    patient_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    gender = Column(String(60), nullable=False)
    age = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    symptoms = Column(JSON, nullable=False)
    diagnosis = Column(JSON, nullable=False)
    prescription = Column(JSON, nullable=False)
