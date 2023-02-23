#!/usr/bin/python3
"""Holds sessions"""

from models.base_model import BaseModel, Base
from datetime import datetime
import sqlalchemy
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship


class Session(BaseModel, Base):
    """Representation of a session"""
    __tablename__ = 'session'
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
