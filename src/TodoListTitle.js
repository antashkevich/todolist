import React from 'react';

class TodoListTitle extends React.Component {
    render = () => {
        return (
            <h3 className="todoList__title">{this.props.title}</h3>
        );
    }
}

export default TodoListTitle;
