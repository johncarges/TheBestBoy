#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import timedelta, datetime as d
# Local imports
from app import app, db
from models import BestBoy, Crewmember, Production, Shootday, Workday,CoreRole

# from models import db

NUMBESTBOYS=2
NUMPRODUCTIONS=10
NUMCREWMEMBERS=100
NUMSHOOTDAYS=200
NUMWORKDAYS=2000

EARLIESTDAY= d.now() - timedelta(days=30)
LATESTDAY = d.now() + timedelta(days=60)

ROLES = ['Gaffer', 'Best Boy', 'Generator Operator','Lamp Operator','Dimmer Board Operator']
MOVIE_TITLES = ['Soldier Of Our Culture', 'Creature Of Everywhere','Friend Of Life', 'Pilot Of Eternity','Creatures From The Portal','Volunteers Of Space','Rebels Of Space',
"Creatures Of Earth's Legacy","Traitors And Officers","Armies And Officers","Mercenaries And Aliens","Martians And Guardians","Statue Of The Ocean","Edge Of Honor",
"Demise Of New Earth","Reincarnation Of Earth's Legacy","Alive In A Nuclear War","Frozen By The Eyes","Broken Outer Space","Haunted By Technology","The Immortals", "Married To The Ocean"]

crew_potential_roles = {role:[] for role in ROLES} 

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        BestBoy.query.delete()
        Production.query.delete()
        Shootday.query.delete()
        Crewmember.query.delete()
        Workday.query.delete()
        CoreRole.query.delete()
        
        print("Adding user John Carges...")
        new_bb= BestBoy(first_name="John", last_name="Carges",username="johncarges",email="johncarges@gmail.com")
        new_bb.password_hash = 'abcd1234'
        db.session.add(new_bb)
        db.session.commit()

        print("Adding user Lola...")
        new_bb= BestBoy(first_name="Lauren", last_name="Laffey",username="Lola",email="lola@gmail.com")
        new_bb.password_hash = 'supersecure'
        db.session.add(new_bb)
        db.session.commit()


        print("Adding BB's...")
        for _ in range(NUMBESTBOYS - 2):
            first_name = fake.first_name()
            last_name = fake.last_name()
            username = first_name.lower() + last_name.lower()
            email = username + '@gmail.com'
            new_bb = BestBoy(first_name=first_name, last_name=last_name, username=username, email=email)
            db.session.add(new_bb)
        db.session.commit()

        print('Adding Productions...')
        for _ in range(NUMPRODUCTIONS):
            name = MOVIE_TITLES.pop()
            notes = fake.paragraph()
            new_prod = Production(name=name, best_boy_id=1, notes=notes)  # CURRENTLY HARD-CODED FOR John best boy
            db.session.add(new_prod)
        db.session.commit()

        print('Adding Shootdays...')
        count = 0
        skipped = 0
        current_prod_id = 1
        while count < NUMSHOOTDAYS:
            date= d.now() + timedelta(days=count+skipped)
            while date.weekday() in (5,6):
                skipped+=1
                date= d.now() + timedelta(days=count+skipped)
            if randint(1,4) == 2:
                skipped+=1
                date= d.now() + timedelta(days=count+skipped)
            location_header = ['EXT','INT'][randint(0,1)]
            location = f'{location_header}: {fake.city()}'
            notes = fake.paragraph()
            new_sd = Shootday(production_id=current_prod_id, date=date, location=location, notes=notes)
            db.session.add(new_sd)
            db.session.commit()
            count +=1
            if randint(1,8)==1:
                current_prod_id+=1
                if current_prod_id >= NUMPRODUCTIONS:
                    current_prod_id =1


        print('Adding crewmembers...')
        for _ in range(NUMCREWMEMBERS):
            best_boy_id = randint(1,NUMBESTBOYS)
            first_name = fake.first_name()
            last_name = fake.last_name()
            email = first_name.lower() + last_name.lower() + '@gmail.com'
            phone = f'{randint(100,1000)}-{randint(100,1000)}-{randint(1000,10000)}'
            new_cm = Crewmember(
                best_boy_id=best_boy_id,
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone=phone
            )
            db.session.add(new_cm)
            db.session.commit()
            for key in crew_potential_roles:
                if randint(0,4)==4:
                    crew_potential_roles[key].append(new_cm)
            

        print('Adding Workdays...')
        count_empty = 0
        for _ in range(NUMWORKDAYS):
            shootday_id = randint(1,NUMSHOOTDAYS)
            role = rc(ROLES)
            #rate, times, additional_terms
            if randint(0,5)>1:
                sd = Shootday.find_by_id(shootday_id)
                # crewmember_id=randint(1,NUMCREWMEMBERS)
                cm = rc(crew_potential_roles[role])  #Crewmember.find_by_id(crewmember_id)
                crewmember_id=cm.id
                while sd in cm.shootdays:
                    crewmember_id=randint(1,NUMCREWMEMBERS)
                    cm = Crewmember.find_by_id(crewmember_id)

            else:
                crewmember_id=None
                count_empty +=1


            new_wd = Workday(
                shootday_id=shootday_id,
                role=role,
                crewmember_id=crewmember_id
            )
            db.session.add(new_wd)
            db.session.commit()

        print(f'{count_empty} open positions')

