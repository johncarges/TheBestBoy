from sqlalchemy.ext.associationproxy import association_proxy

from datetime import datetime
from config import db

class Production(db.Model):
    __tablename__ = 'productions'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    best_boy_id = db.Column(db.Integer, db.ForeignKey('best_boys.id'))
    created_at  = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    shootdays = db.relationship('Shootday',backref='production',order_by='Shootday.date',cascade='all, delete-orphan')
    # core_crew = db.relationship('Production',
    #                             secondary = core_role,
    #                             primaryjoin = (core_role.c.production_id== id),
    #                             secondaryjoin = (core_role.c.crewmember_id==id),
    #                             backref='core_productions')
    
    core_roles = db.relationship('CoreRole', backref='production')
    core_crewmembers = association_proxy('core_roles','crewmember')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    def __repr__(self):
        return f"<Production '{self.name}'>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'start_date': self.start_date().isoformat() if self.shootdays else None,
            'end_date': self.end_date().isoformat() if self.shootdays else None
        }
    
    def to_dict_with_days_and_core(self):
        return {
            **self.to_dict(),
            'shootdays': [shootday.to_dict() for shootday in self.shootdays] if self.shootdays else [],
            'core_roles': [role.to_dict() for role in self.core_roles]
        }
    
    def days_scheduled(self):
        return len(self.shootdays)
    
    def start_date(self):
        if self.shootdays:
            return self.shootdays[0].date # do this the sql way? HOW?  ALSO: PRODUCTION WITHOUT SHOOTDAYS?
        return None
    
    def end_date(self):
        if self.shootdays:
            return self.shootdays[-1].date
        return None
    
    def is_ongoing(self):
        if self.end_date():
            return self.end_date() >= datetime.now()
        return True                                     # If no dates scheduled, consider it ongoing. User should delete canceled productions