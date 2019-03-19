import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authentication';

import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import Home from './Home';

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

class SeverProektApp extends React.Component{
    render(){
        return(
            <Provider store={ store }>
            <Router>
                <div>
                    <Navbar />
                    <Route exact path="/" component={ Home } />
                    <div className="container">
                        <Route exact path="/register" component={ Register } />
                        <Route exact path="/login" component={ Login } />
                    </div>
                </div>
            </Router>
            </Provider>
        )
    }
}

export default SeverProektApp;