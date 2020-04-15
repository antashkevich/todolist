import React from 'react';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements = this.props.tasks.map( (task, num) => 
            <TodoListTask 
                task={task}
                item={num}
                changeStatus={this.props.changeStatus}
                changeTitle={this.props.changeTitle}
                key={num}
            />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;
