import React from 'react'

const TodoItem = ({description, completed, updateTodo, deleteTodo}) => {
    console.log('asdaf',updateTodo);
    return (
        <li class={completed && "completed"}>
            <div class="view">
                <input onClick={updateTodo} class="toggle" type="checkbox" checked={completed}/>
                <label>{description}</label>
                <button class="destroy" onClick={deleteTodo}></button>
            </div>
    </li>
    )
}


export default TodoItem;
