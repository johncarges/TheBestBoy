import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from '../components/nav/NavBar'
import CalendarPage from "./Calendars/CalendarPage";
import CrewmembersPage from "./Crewmembers/CrewMembers";
import ProductionsPage from "./Productions/ProductionsPage";
import AddCrewmember from "./Crewmembers/AddCrewmember";
import ProductionDetailPage from "./Productions/ProductionDetailPage";
import ShootdayInfo from "./Shootdays/ShootdayInfo";

export default function Main() {
    return (
        <div>
            <NavBar/>
            <div className='main-body'>
                <Switch>
                    <Route exact path='/'>
                        <CalendarPage/>
                    </Route>
                    <Route exact path='/productions'>
                        <ProductionsPage/>
                    </Route>
                    <Route exact path='/productions/:id'>
                        <ProductionDetailPage/>
                    </Route>
                    <Route exact path='/crewmembers'>
                        <CrewmembersPage/>
                    </Route>
                    <Route exact path='/crewmembers/new'>
                        <AddCrewmember/>
                    </Route>
                    <Route exact path='/shootdays/:id'>
                        <ShootdayInfo/>
                    </Route>
                </Switch>

            </div>
            
        </div>
    )
}