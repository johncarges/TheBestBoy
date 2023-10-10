import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from '../components/nav/NavBar'
import CalendarPage from "./Calendars/CalendarPage";
import CrewmembersPage from "./Crewmembers/CrewMembers";
import ProductionsPage from "./Productions/ProductionsPage";
import AddCrewmember from "./Crewmembers/AddCrewmember";

export default function Main() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path='/'>
                    <CalendarPage/>
                </Route>
                <Route exact path='/productions'>
                    <ProductionsPage/>
                </Route>
                <Route exact path='/crewmembers'>
                    <CrewmembersPage/>
                </Route>
                <Route exact path='/crewmembers/new'>
                    <AddCrewmember/>
                </Route>
            </Switch>
            
        </div>
    )
}