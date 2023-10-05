from sqlalchemy.ext.associationproxy import association_proxy

from config import db

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
    
    def __repr__(self):
        return f'{self.crewmember.name} working on {self.shootday}'