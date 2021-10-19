import React from "react";
import '../src/App.scss'
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import { LoginPage, RegisterPage } from "./components/pages";
import store from "./store/store";


export default function App() {
    return (
        <>
        <Provider store={store}>
        <BrowserRouter>
                <Switch>
                    <Route path="/" component={LoginPage} exact/>
                    <Route path="/register" component={RegisterPage} exact/>
                </Switch>
            </BrowserRouter>
        </Provider>
        </>
    );
}