from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Production(db.Model):
    __tablename__ = 'productions'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    best_boy_id = db.Column(db.Integer, db.ForeignKey('best_boys.id'))

    shootdays = db.relationship('Shootday',backref='production',order_by='Shootday.date',cascade='all, delete-orphan')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()
    
    def __repr__(self):
        return f"<Production '{self.name}'>"
    
    def days_scheduled(self):
        return len(self.shootdays)
    
    def start_date(self):
        return self.shootdays[0].date # do this the sql way? HOW?

    def end_date(self):
        return self.shootdays[-1].date