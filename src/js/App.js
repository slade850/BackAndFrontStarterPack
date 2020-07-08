import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Header from './component/header';
import RouteGuard from './component/routeGuard';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Protected from './pages/protected';

import api from './utils/api';
import { getStorageLogged, clearLogged } from './utils/local-storage'

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getStorageLogged() && api.get('user/info')
            .then(res => dispatch({type: 'SET_USER', payload: res.data.user}))
            .catch(err => {
                dispatch({type: 'SET_USER_LOGGED', payload: false});
                clearLogged();
            })
    }, [])

    return (
        <Router>
            <Header />
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/register">
					    <Register />
				    </Route>
                    <Route path="/login">
					    <Login />
				    </Route>
                    <RouteGuard path="/protected" component={Protected}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;