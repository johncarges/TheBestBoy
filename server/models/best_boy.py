from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class BestBoy(db.Model):
    """User class"""
    __tablename__ = 'best_boys'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)

    productions = db.relationship('Production',backref='best_boy',cascade='all, delete-orphan')
    crewmembers = db.relationship('Crewmember', backref='best_boy',cascade='all, delete-orphan')

    shootdays = association_proxy('productions','shootdays')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'< BB {self.username} >'
    
    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    


    ## FOR JSON:
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email
        }
    
