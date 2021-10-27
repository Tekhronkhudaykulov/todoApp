import React from 'react'
import { connect } from 'react-redux';
import './style.scss';

const HomePage = () => {
    return (
        <div className="container">
            <div className="sidebar">
                <div className="userInfo">
                    <div className="avatar">
                        <img src="https://i.furniturehomewares.com/images/020/img-3285.jpg" alt="" />
                    </div>
                    <div>
                        <p className="email">tekhronkhudaykulov@gmail.com</p>
                        <p className="bio">Texron Xudaykulov</p>
                        <p className="age">22</p>
                    </div>
                </div>
            </div>
            <div className="todoContainer">
            <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus/>
        </header>
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox"/>
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <li class="completed">
                    <div class="view">
                        <input class="toggle" type="checkbox" checked/>
                        <label>finish todo app in react manner</label>
                        <button class="destroy"></button>
                    </div>
                </li>
            </ul>
            <footer class="footer">
                <span class="todo-count"></span>
                <ul class="filters">
                    <li>
                        <a href="#/" class="selected">All</a>
                    </li>
                    <li>
                        <a href="#/active">Active</a>
                    </li>
                    <li>
                        <a href="#/completed">Completed</a>
                    </li>
                </ul>
                <button class="clear-completed">Clear completed</button>
            </footer>
        </section>
    </section>
            </div>
        </div>
    );
};

const mapDispatchToProps = ({profile}) => {
    
}
export default connect(mapDispatchToProps, null)(HomePage)
