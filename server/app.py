#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

from datetime import datetime

# Local imports
from config import app, db, api
# Add your model imports

from models import BestBoy, Crewmember, Production, Shootday, Workday

# Views go here!


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class UsersByID(Resource):
    def patch(self, id):
        pass

    def delete(self, id):
        if not (id == session.get('best_boy_id')):
            return {'error':'401 Unauthorized'}, 401

        if not (bb:=BestBoy.find_by_id(id)):
            return {'error': 'Not a valid best boy'}, 404
            
        session['best_boy_id'] = None
        db.session.delete(bb)
        db.session.commit()
        return {}, 204
        
api.add_resource(UsersByID, '/user')

class Productions(Resource):
    def get(self):
        if (best_boy_id:=session.get('best_boy_id')):
            productions = Production.query.filter(Production.best_boy_id==best_boy_id).all()
            return [prod.to_dict() for prod in productions if prod.is_ongoing()], 200
        return {'error':'401 Unauthorized'}, 401

    def post(self):
        if (best_boy_id:=session.get('best_boy_id')):
            rq = request.get_json()
            try:
                new_prod = Production(
                    name=rq.get('name'),
                    best_boy_id=best_boy_id
                )
                db.session.add(new_prod)
                db.session.commit()
                return new_prod.to_dict(), 201
            except ValueError:
                return {'error':'invalid data'}, 422

        return {'error':'401 Unauthorized'}, 401

api.add_resource(Productions, '/productions')

class ProductionsByID(Resource):

    def get(self,id):
        if not (prod := Production.find_by_id(id)):
            return {'error': '404 not found'}, 404
        
        if prod.best_boy_id == session.get('best_boy_id'):
            return prod.to_dict_with_days(), 200
        return {'error': '401 Unauthorized'}, 401

    def patch(self,id):
        if not (prod := Production.find_by_id(id)):
            return {'error': '404 not found'}, 404
        
        if prod.best_boy_id == session.get('best_boy_id'):
            rq = request.get_json()
            for attr in rq:
                setattr(prod, attr, rq[attr])
            db.session.add(prod)
            db.session.commit()
            return prod.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

    def delete(self,id):
        if not (prod := Production.find_by_id(id)):
            return {'error': '404 not found'}, 404
        
        if prod.best_boy_id == session.get('best_boy_id'):
            db.session.delete(prod)
            db.session.commit()
            return {}, 204
        return {'error': '401 Unauthorized'}, 401

api.add_resource(ProductionsByID, '/productions/<int:id>')

class Shootdays(Resource):
    def get(self):
        if not (id:=session.get('best_boy_id')):
            return {'error':'401 Unauthorized'}, 401

        if not (bb:=BestBoy.find_by_id(id)):
            return {'error': 'Not a valid best boy'}, 404
        
        shootdays = []
        for prod in bb.productions:
            shootdays += prod.shootdays
        
        return [sd.to_dict() for sd in shootdays], 200

    def post(self):
        if not (id:=session.get('best_boy_id')):
            return {'error':'401 Unauthorized'}, 401

        rq = request.get_json()
        if not (prod:=Production.find_by_id(rq.get('production_id'))):
            return {'error':'Not a valid production'}, 401
        
        year, month, day = rq.get('date').split('-')
        # try:
        new_shootday = Shootday(
            production_id=rq.get('production_id'),
            date=datetime(int(year), int(month), int(day)),
            location=rq.get('location'),
            notes=rq.get('notes')
        )
        db.session.add(new_shootday)
        db.session.commit()
        return new_shootday.to_dict(), 201
        # except:
        #     return {'error':'Validation Errors'}, 401           #CHECK THIS

api.add_resource(Shootdays, '/shootdays')

class ShootdaysBulk(Resource):
    def post(self):
        if not (id:=session.get('best_boy_id')):
            return {'error':'401 Unauthorized'}, 401

        rq=request.get_json()
        if not (prod:=Production.find_by_id(rq.get('production_id'))):
            return {'error':'Not a valid production'}, 401
        
        response = []
        for shootday in rq.get('dates'):
            year, month, day = shootday.split('-')
            # try:
            new_shootday = Shootday(
                production_id=rq.get('production_id'),
                date=datetime(int(year), int(month), int(day)),
            )
            db.session.add(new_shootday)
            db.session.commit()
            response.append(new_shootday.to_dict())
        return response, 201

api.add_resource(ShootdaysBulk,'/shootdays_bulk')

class ShootdaysByID(Resource):

    def get(self,id):
        if not (bb_id:=session.get('best_boy_id')):
            return {'error':'401 Unauthorized'}, 401
        if not (shootday := Shootday.find_by_id(id)):
            return {'error':'404 Not Found'}, 404
        if shootday.production.best_boy_id != bb_id:
            return {'error': '401 Unauthorized'}, 401
        
        return shootday.to_dict_full(), 200
    
    def patch(self,id):
        if not (bb_id:=session.get('best_boy_id')):
            return {'error':'401 Unauthorized'}, 401
        
        if not (shootday := Shootday.find_by_id(id)):
            return {'error':'404 Not Found'}, 404
        
        if shootday.production.best_boy_id != bb_id:
            return {'error': '401 Unauthorized'}, 401
        
        for attr in (rq := request.get_json()):
            if attr =="date":
                year, month, day = rq["date"].split('-')
                shootday.date = datetime(int(year),int(month),int(day))
            else:
                setattr(shootday, attr, rq[attr])

        db.session.add(shootday)
        db.session.commit()

        return shootday.to_dict(), 200

    def delete(self,id):
        if not (bb_id:=session.get('best_boy_id')):
            return {'error':'401 Unauthorized'}, 401
        
        shootday = Shootday.find_by_id(id)
        if shootday.production.best_boy_id != bb_id:
            return {'error': '401 Unauthorized'}, 401
        
        db.session.delete(shootday)
        db.session.commit()

        return {}, 204

api.add_resource(ShootdaysByID, '/shootdays/<int:id>')

class Workdays(Resource):
    def get(self):
        pass

    def post(self):
        if (best_boy_id:=session.get('best_boy_id')):
            
            try:
                rq = request.get_json()
                shootday_id = rq['shootday_id']
                shootday=Shootday.find_by_id(shootday_id)
                
                # if shootday.best_boy.id != best_boy_id:
                #     return {'error':'401 Unauthorized'}, 401 ## Can't association_proxy backref ?
                response = []
                print(rq['workdays'])
                for workday in rq['workdays']:
                    new_wd = Workday(
                        shootday_id=shootday_id,
                        role=workday
                    )
                
                    db.session.add(new_wd)
                    db.session.commit()
                    response.append(new_wd.to_dict())
            
                return response, 200
            except ValueError:
                return {'error': '422 Validation Error'}, 422
        return {'error':'401 Unauthorized'}, 401

api.add_resource(Workdays, '/workdays')

class WorkdaysByID(Resource):
    def patch(self, id):
        print('trying?')
        if not (wd := Workday.find_by_id(id)):
            return {'error': '404 not found'}, 404
        
        rq = request.get_json()
        for attr in rq:
            setattr(wd, attr, rq[attr])
        db.session.add(wd)
        db.session.commit()
        print('committed')
        return wd.to_dict(), 200

    def delete(self):
        pass

api.add_resource(WorkdaysByID, '/workdays/<int:id>')

class Crewmembers(Resource):
    def get(self):
        if (best_boy_id:=session.get('best_boy_id')):
            crewmembers = Crewmember.query.filter(Crewmember.best_boy_id==best_boy_id).order_by(Crewmember.last_name).all()
            return [cm.to_dict() for cm in crewmembers], 200
        return {'error':'401 Unauthorized'}, 401

    def post(self):
        if (best_boy_id:=session.get('best_boy_id')):
            try:
                rq = request.get_json()

                new_cm = Crewmember(
                    best_boy_id = best_boy_id,
                    first_name = rq.get('first_name'),
                    last_name = rq.get('last_name'),
                    phone = rq.get('phone'),
                    email = rq.get('email'),
                )
                
                db.session.add(new_cm)
                db.session.commit()
            
                return new_cm.to_dict(), 200
            except ValueError:
                return {'error': '422 Validation Error'}, 422
        return {'error':'401 Unauthorized'}, 401

api.add_resource(Crewmembers, '/crewmembers')

class CrewmembersByID(Resource):
    def get(self, id):
        if not (cm := Crewmember.find_by_id(id)):
            return {'error': '404 not found'}, 404
        
        if cm.best_boy_id == session.get('best_boy_id'):
            return cm.to_dict(), 200
        return {'error':'401 Unauthorized'}, 401

    def patch(self, id):
        if not (cm := Crewmember.find_by_id(id)):
            return {'error': '404 not found'}, 404
        
        if cm.best_boy_id != session.get('best_boy_id'):
            return {'error':'401 Unauthorized'}, 401
        
        rq = request.get_json()
        for attr in rq:
            setattr(cm, attr, rq[attr])

        db.session.add(cm)
        db.session.commit()
        
        return cm.to_dict(), 200

    def delete(self, id):
        pass

api.add_resource(CrewmembersByID, '/crewmembers/<int:id>')

################

###   AUTH  ####
 
################

class Signup(Resource):

    def post(self):
        rq = request.get_json()

        username = rq.get('username')
        first_name = rq.get('first_name')
        last_name = rq.get('last_name')
        email = rq.get('email')
        password = rq.get('password')

        best_boy = BestBoy(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )

        best_boy.password_hash = password
        
        try:
            db.session.add(best_boy)
            db.session.commit()
            session['best_boy_id'] = best_boy.id
            
            return best_boy.to_dict(), 201
        except ValueError:
            return {'error':'Unprocessable Entity'}, 422
        
api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        best_boy = BestBoy.query.filter(BestBoy.username == username).first()

        if best_boy:
            if best_boy.authenticate(password):

                session['best_boy_id'] = best_boy.id
                return best_boy.to_dict(), 200
            return {'error': 'Incorrect password'}, 401

        return {'error': 'Username not found'}, 401

api.add_resource(Login, '/login')

class Logout(Resource):
    
    def delete(self):
        if session.get('best_boy_id'):
            session['best_boy_id'] = None
            return {}, 204
        return {'error': '401 Unauthorized'}, 401

api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        if session.get('best_boy_id'):
            best_boy = BestBoy.query.filter(BestBoy.id == session['best_boy_id']).first()
            return best_boy.to_dict(), 200
        return {'error':'401 Unauthorized'}, 401

api.add_resource(CheckSession, '/check_session')


            

if __name__ == '__main__':
    app.run(port=5555, debug=True)

