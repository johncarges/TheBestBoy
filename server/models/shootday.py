from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

from config import db


class Shootday(db.Model):
    """Day of work planned by production, requires crew"""
    __tablename__ = 'shootdays'
    
    id = db.Column(db.Integer, primary_key=True)
    production_id = db.Column(db.Integer, db.ForeignKey('productions.id'))
    date = db.Column(db.DateTime)
    location = db.Column(db.String)
    notes = db.Column(db.String)        # Make this its own class
    
    workdays = db.relationship('Workday', backref='shootday', cascade='all, delete-orphan')
    crewmembers = association_proxy('workdays','crewmember')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    def __repr__(self):
        return f'Shootday {self.day_number()}/{self.production.days_scheduled()} for {self.production.name}' 
    
    def to_dict(self):
        return {
            'id':self.id,
            'production': {'id':self.production_id, 'name':self.production.name},
            'date': self.date.isoformat(),
            'location':self.location,
        }

    def crew_size(self):
        return len(self.workdays)

    def num_hired(self):
        """Return number of crew hired"""
        return len([wd for wd in self.workdays if wd.crewmember_id])
    
    def to_hire(self):
        """Return number of open positions"""
        return self.crew_size() - self.num_hired()
    
    def positions_to_hire(self):
        """Return dictionary with role: number of open positions"""
        positions_to_hire = {}
        for position in self.workdays:
            if not position.crewmember_id:
                if position.role in positions_to_hire:
                    positions_to_hire[position.role] += 1
                else:
                    positions_to_hire[position.role] = 1
        return positions_to_hire

    
    def crew_list(self):
        return {wd.role:wd.crewmember.name for wd in self.workdays if wd.crewmember_id}

    def day_number(self):
        """Returns number for this day, in production (eg 1/24)"""
        return self.production.shootdays.index(self) + 1

