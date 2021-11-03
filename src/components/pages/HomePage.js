import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import TodoItem from '../TodoItem';
import './style.scss';
import {
     LogoutOutlined
}from '@ant-design/icons';
import axios from 'axios';
import Item from 'antd/lib/list/Item';

const HomePage = ({profile, history}) => {
    const {email, name, age} = profile.user;

    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    const logout = async () => {
        try{
            await axios.post('https://api-nodejs-todolist.herokuapp.com/user/logout');
            localStorage.removeItem('token');
            history.push('/');
        }catch(e){
            console.log(e);
        }
    }

    const getAllTask = async () => {
        try{
            const getTask =  await axios.get('https://api-nodejs-todolist.herokuapp.com/task');
            setTodos(getTask.data.data.reverse())
        }catch (e){
            
        }
    }
    useEffect(() => {
        getAllTask();
    }, [])

    const addTodo = async () => {
        try{
            const res =  await axios.post('https://api-nodejs-todolist.herokuapp.com/task', {
                description
            });
            setDescription('');
            setTodos([res.data.data, ...todos])
            console.log(res.data);
        }catch (e){
            console.log(e);
        }
    }

    const updateTodo = async (id, completed) => {
        try{
            const res =  await axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
                completed
            });
            const updated = todos.map(item => {
                if(item._id == res.data.data._id){
                    return res.data.data
                }
                return item;
            })
            setTodos(updated);
        }catch (e){
            console.log(e);
        }
    }
    const deleteTodo = async (id, clear) => {
        try{
            const res =  await axios.delete(`https://api-nodejs-todolist.herokuapp.com/task/${id}`);
            if(!clear){
                const updated = todos.filter(item => item._id != id);
                setTodos(updated);
            }
        }catch (e){
            console.log(e);
        }
    }
    const filterAllTodos = async (completed) => {
        try{
            const getTask =  await axios.get(`https://api-nodejs-todolist.herokuapp.com/task?completed=${completed}`);
            setTodos(getTask.data.data.reverse())
        }catch (e){
            console.log(e)
        }
    }

    const clearCompleted = () => {
        todos.forEach(item => {
            if(item.completed){
                deleteTodo(item._id, true)
            }
        });
        getAllTask();
    }

    return (
        <div className="container">
            <div className="sidebar">
                <div className="userInfo">
                    <div className="avatar">
                        <img src="https://i.furniturehomewares.com/images/020/img-3285.jpg" alt="" />
                    </div>
                    <div>
                        <p className="email">{email}</p>
                        <p className="bio">{name}</p>
                        <p className="age">Age:{age}</p>
                    </div>
                </div>
                <div className="logout" onClick={logout}>
                        <LogoutOutlined/><p>Logout</p>
                    </div>
            </div>
            <div className="todoContainer">
            <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <input 
            class="new-todo" 
            placeholder="What needs to be done?" 
            autofocus
            value={description}
            onChange={e => {
                setDescription(e.target.value);
            }}
            onKeyDown={e => {
                if(e.keyCode === 13 && description !== ''){
                    addTodo();
                }
            }}
            />
        </header>
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox"/>
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                {
                    todos.map(item => (
                            <TodoItem
                                description={item.description}
                                completed={item.completed}
                                updateTodo={() => updateTodo(item._id, !item.completed)}
                                deleteTodo={() => deleteTodo(item._id)}
                            />
                        )
                    )
                }
            </ul>
            <footer class="footer">
                <span class="todo-count"></span>
                <ul class="filters">
                    <li onClick={getAllTask}>
                        <a href="#/" class="selected">All</a>
                    </li>
                    <li onClick={() => filterAllTodos(false)}>
                        <a href="#/active">Active</a>
                    </li>
                    <li onClick={() => filterAllTodos(true)}>
                        <a href="#/completed">Completed</a>
                    </li>
                </ul>
                <button onClick={clearCompleted} class="clear-completed">Clear completed</button>
            </footer>
        </section>
    </section>
            </div>
        </div>
    );
};

const mapStateToProps = ({profile}) => ({
    profile,
})
export default connect(mapStateToProps, null)(HomePage)
