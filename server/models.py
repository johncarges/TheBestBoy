from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

# from config import db

# Models go here!

class BestBoy(db.Model):
    """User class"""
    __tablename__ = 'best_boys'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    #Password
    name = db.Column(db.String)

    productions = db.relationship('Production',backref='best_boy',cascade='all, delete-orphan')
    crewmembers = db.relationship('Crewmember', backref='best_boy',cascade='all, delete-orphan')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    def __repr__(self):
        return f'< BB {self.username} >'

class Production(db.Model):
    __tablename__ = 'productions'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    best_boy_id = db.Column(db.Integer, db.ForeignKey('best_boys.id'))

    shootdays = db.relationship('Shootday',backref='production',cascade='all, delete-orphan')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    def __repr__(self):
        return f"<Production '{self.name}'>"

class Shootday(db.Model):
    """Day of work planned by production, requires crew"""
    __tablename__ = 'shootdays'
    
    id = db.Column(db.Integer, primary_key=True)
    production_id = db.Column(db.Integer, db.ForeignKey('productions.id'))
    day = db.Column(db.DateTime)
    crew_size = db.Column(db.Integer)
    location = db.Column(db.String)
    notes = db.Column(db.String)        # Make this its own class
    
    workdays = db.relationship('Workday', backref='shootday', cascade='all, delete-orphan')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    def __repr__(self):
        pass
    
    def day_number(self):
        """Returns number for this day, in production (eg 1/24)"""
        pass




class Workday(db.Model):
    """Day of work to be completed by one crewmember"""
    __tablename__ = 'workdays'
    
    id = db.Column(db.Integer, primary_key=True)
    shootday_id = db.Column(db.Integer, db.ForeignKey('shootdays.id'))
    crewmember_id = db.Column(db.Integer,db.ForeignKey('crewmembers.id'))
    role = db.Column(db.String)         # Make this its own class
    rate = db.Column(db.Integer)
    start_time = db.Column(db.Integer)
    lunch_start = db.Column(db.Integer)
    lunch_end = db.Column(db.Integer)
    end_time = db.Column(db.Integer)
    additional_terms = db.Column(db.String)

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    


class Crewmember(db.Model):
    __tablename__ = 'crewmembers'

    id = db.Column(db.Integer, primary_key=True)
    best_boy_id = db.Column(db.Integer, db.ForeignKey('best_boys.id'))
    name = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)

    workdays = db.relationship('Workday', backref='crewmembers', cascade='all, delete-orphan')
    
    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    