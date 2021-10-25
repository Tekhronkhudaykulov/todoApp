import React, {useEffect, useState} from "react";
import '../src/App.scss'
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import { LoginPage, RegisterPage } from "./components/pages";
import {Link,useHistory} from 'react-router-dom';
import { setProfile } from "./store/actions/profile";
import { connect } from "react-redux";
import axios from 'axios';
import ReactLoading from 'react-loading';



function App({setProfile}) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const getUser = async () => {
        try{
            setIsLoading(true)
            const token =  localStorage.getItem('token');
            if(token){
                axios.defaults.headers['Authorization'] = `Bearer ${token}`;
                const res = await axios.get('https://api-nodejs-todolist.herokuapp.com/user/me');
                setProfile({
                    user:res.data,
                    token: token,
                });
                history.push('/home');
            }
          }catch (e) {

          }finally{
            setIsLoading(false);
          }
    }
    useEffect(() => {
        getUser();
    }, [])

    if (isLoading) {
        return (
            <div className="center">
                <ReactLoading type='spinningBubbles' color="blue" height="10"/>

            </div>
        )
    }
    return (
        <>
        <BrowserRouter>
                <Switch>
                    <Route path="/" component={LoginPage} exact/>
                    <Route path="/register" component={RegisterPage} exact/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

const mapDispatchToProps = {
    setProfile
}

export default connect(null, mapDispatchToProps)(App);