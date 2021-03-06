import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TelaFeed from './Components/Feed/Feed';
import SignUp from './Components/SignUP/SignUp';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Search from './Components/Search/Search';
import EditProfile from './Components/EditProfile/EditProfile';
import RegisterMonitoring from './Components/RegisterMonitoring/RegisterMonitoring'
import Profile from './Components/Profile/Profile'
import * as serviceWorker from './serviceWorker';
import './index.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Tab from './Components/Tab/Tab.js';
import ExpandedCard from './Components/Feed/ExpandedCard';

ReactDOM.render((
        <Router>    
                    <Switch> 
                        <Route exact path="/" component={App}/>
                        <Route path="/SignUp" component={SignUp}/>
                        <Route path="/ForgotPassword" component={ForgotPassword}/>   
                        <Route path="/RegisterMonitoring" component={RegisterMonitoring}/>
                        <Route path="/expandedcard/:id_tutoring" component={ExpandedCard}/>
                        <div>
                            <Route path="/Feed" component={TelaFeed}/>
                            <Route path="/Search" component={Search}/>  
                            <Route path="/EditProfile" component={EditProfile}/>
                            <Route path="/Profile" component={Profile}/>
                            <div>
                                <Tab/>            
                            </div>
                        </div>               
                    </Switch>
                    
        </Router>

), document.getElementById('root'));
serviceWorker.register()