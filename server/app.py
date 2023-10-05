#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports

from models import BestBoy, Crewmember, Production, Shootday, Workday

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Productions(Resource):
    def get(self):
        pass

    def post(self):
        pass


class ProductionsByID(Resource):

    def get(self,id):
        pass

    def patch(self,id):
        pass

    def delete(self,id):
        pass


class Shootdays(Resource):
    def get(self):
        pass

    def post(self):
        pass


class ShootdaysByID(Resource):

    def get(self,id):
        pass
    
    def patch(self,id):
        pass

    def delete(self,id):
        pass






if __name__ == '__main__':
    app.run(port=5555, debug=True)

