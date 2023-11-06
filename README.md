# The Best Boy

Designed for film production professionals, this app allows users to create a schedule of upcoming film productions, and assign contacts to roles on those productions, either for the duration of the production or for specific days.

### The Concept:
Many departments in film production have a role called 'The Best Boy'. He or she is responsible for hiring crew, managing equipment rentals, and working with production to adapt to schedule changes, interface with locations, and onboard any new hires. Hiring a crew for a multi-day film production can be a headache. Each day presents its own difficulties and requirements, meaning you may need 8 crewmembers on Monday, 5 on Tuesday, 20 on Wednesday, etc., and the necessary roles (think rigging electrician, lighting programmer, generator operator) may differ on each day. With The Best Boy App, users can create a rolodex of crewmembers they have or would like to work with, with information about their capabilities and roles, and assign them to days on a production calendar, as needed.


## Back-End

### Models
 - The Best_Boy model encompasses a user. Beyond basic contact information, the instances (or rows in the 'best_boys' table) will also hold a username and password hash. 

 - The Production model stores the name and notes for a given production, and is tied to a user (Best_boy)

 - The Shootday model encompasses one planned day of work for a production. This can contain notes and a location, for quick reference.

 - The Crewmember model encompasses a crewmember that the user may hire for a given production or specific shootday. The model holds the contact information for the crewmember.

 - A Workday is a joining class between a Shootday and Crewmember, but also holds its own important information. A Workday instance represents a day worked (or to be worked) by a crewmember, for a completed (or planned) Shootday. This class also holds information about the role (or position) the crewmember filled on that day, as well as any other details about their work on that day (hours, additional terms, rentals, etc.). This is important as an individual crewmember might be able to fill different roles on different days, and the necessary positions for a production can change from day to day.

 - A Core Role is a joining class between a Production and Crewmember. This represents a consistent post for the duration of a production. If the user chooses, any new Shootday added to a production will automatically create a new Workday instance of any core Crewmembers, with their role and additional terms pre-filled. Those automatically added Workdays can be later removed (if a member of the core crew takes a day off, etc.)


## API ( server/app.py )
The API used to link the front-end and back-end uses flask_restful's Resource class. At each point, authorization checks are made to unsure that information requested in the fetch corresponds to the current user (Best_Boy).

## Front-End
The front end is built on React.js, with a folder for pages and their sub-components, and a folder for universal components such as contact info modals and buttons.

### Full Calendar
Two pages use the Full Calendar React package: the homepage (showing all shootdays, across all of a user's productions), and the production page (showing shootdays for a given production). On both pages, users can click into scheduled shootdays to go to that shootday's detail page. On a production page, users can also add new shootdays.

### Crewmembers (Contacts)
On the crewmembers page, users can add and edit contact information for crewmembers. They can also filter their crewmember list by role and production. When crewmember names are shown on other pages (on a production detail page, as a core crewmember, or on a shootday detail page), names are clickable to bring up a modal with crewmember information.

### Assigning Crew 
On the productions page (under Core Crew) and shootday details page, users can create new positions, and assign crewmembers from their contact list to those positions. In both cases, the user is shown a modal where they can add and edit positions. 
