from config import db



class CoreRole(db.Model):
    __tablename__ = 'core_roles'
    __table_args__ = (
        db.UniqueConstraint('production_id', 'crewmember_id', name='unique-core-role'),
    )

    id = db.Column(db.Integer, primary_key=True)
    production_id = db.Column(db.Integer, db.ForeignKey('productions.id'))
    crewmember_id = db.Column(db.Integer, db.ForeignKey('crewmembers.id'))
    role = db.Column(db.String, nullable=False)
    created_at  = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            'id':self.id,
            'production':self.production_id,
            'crewmember':self.crewmember.to_dict_basic() if self.crewmember_id else None,
            'role':self.role
        }