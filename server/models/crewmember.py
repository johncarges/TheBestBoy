from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class Crewmember(db.Model):
    __tablename__ = 'crewmembers'

    id = db.Column(db.Integer, primary_key=True)
    best_boy_id = db.Column(db.Integer, db.ForeignKey('best_boys.id'))
    name = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)

    workdays = db.relationship('Workday', backref='crewmember', cascade='all, delete-orphan')
    
    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()