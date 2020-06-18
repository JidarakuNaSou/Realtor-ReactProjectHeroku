import React from "react";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import HomeContent from "./components/HomeContent/HomeContent";
import LoginContainer from "./components/Auth/Login/LoginContainer";
import Etc from "./components/Overview/Etc/Etc";
import House from "./components/Overview/House/House";
import Office from "./components/Overview/Office/Office";
import ProfileContainer from "./components/Profile/ProfileContainer";
import ApartmentsContainer from "./components/Overview/Apartments/ApartmentsContainer";
import PropertyContainer from "./components/Overview/Property/PropertyContainer";
import InsertPropertyContainer from "./components/InsertProperty/InsertPropertyContainer";
import Yuridinfo from"./components/Yuridinfo/Yuridinfo";

class App extends React.Component {
  render() {
    return (
      
        <BrowserRouter>
          <div className="container-fluid">
            <Route path="/" component={HeaderContainer} />

            <Route exact path="/" component={HomeContent} />
            <Route exact path="/Login" component={LoginContainer} />
            <Route exact path="/Apartments" component={ApartmentsContainer} />
            <Route exact path="/Etc" component={Etc} />
            <Route exact path="/House" component={House} />
            <Route exact path="/Office" component={Office} />
            <Route exact path="/Profile" component={ProfileContainer} />
            <Route exact path="/Property" component={PropertyContainer} />
            <Route exact path="/InsertProperty" component={InsertPropertyContainer} />
            <Route exact path="/Yuridinfo" component={Yuridinfo} />
          </div>
        </BrowserRouter>
      
    );
  }
}
export default App;
