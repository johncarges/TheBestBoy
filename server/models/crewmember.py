from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class Crewmember(db.Model):
    __tablename__ = 'crewmembers'

    id = db.Column(db.Integer, primary_key=True)
    best_boy_id = db.Column(db.Integer, db.ForeignKey('best_boys.id'))
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    created_at  = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    workdays = db.relationship('Workday', backref='crewmember', cascade='all, delete-orphan')
    shootdays = association_proxy('workdays', 'shootday')

    core_roles = db.relationship('CoreRole', backref='crewmember')

    def productions(self):
        return list(set([sd.production for sd in self.shootdays]))
    
    def roles(self):
        return list(set([wd.role for wd in self.workdays]))

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    def to_dict(self):
        try:
            return {
                'id': self.id,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'phone': self.phone,
                'email': self.email,
                'productions': [prod.name for prod in self.productions()] if self.productions() else [],
                'roles': self.roles()
            }
        except:
            print({
                'id': self.id,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'phone': self.phone,
                'productions':self.productions()})


    def to_dict_basic(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'email': self.email
        }
    