from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class BestBoy(db.Model):
    """User class"""
    __tablename__ = 'best_boys'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    #Password
    name = db.Column(db.String)

    productions = db.relationship('Production',backref='best_boy',cascade='all, delete-orphan')
    crewmembers = db.relationship('Crewmember', backref='best_boy',cascade='all, delete-orphan')

    shootdays = association_proxy('productions','shootdays')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    def __repr__(self):
        return f'< BB {self.username} >'
