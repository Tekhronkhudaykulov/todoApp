import React from "react";
import '../src/App.scss'
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import { LoginPage, RegisterPage } from "./components/pages";

export default function App() {
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