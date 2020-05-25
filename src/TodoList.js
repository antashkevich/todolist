import React from 'react';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm';
import { connect } from 'react-redux';
import { addNewTask, changeTask, removeTask, removeTodolist, getTodolistTasks } from './store';
import PopupRemove from './PopupRemove';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterValue: "All",
            showPopup: false
        };
    }

    componentDidMount() {
        this.props.getTodolistTasks(this.props.id);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue,
        });
    };

    addTask = (newText) => {
        let newTask = {
            id: this.props.tasks.length + 1,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.newTaskId++;
        this.props.addNewTask(newTask, this.props.id);
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };

    changeTask = (taskId, obj) => {
        this.props.changeTask(taskId, obj, this.props.id);
    };

    showPopup = () => {
        this.setState({
            showPopup: true
        });
    }

    hidePopup = () => {
        this.setState({
            showPopup: false
        });
    }

    removeTodolist = () => {
        this.props.removeTodolist(this.props.id);
    }

    removeTask =(taskId) => {
        this.props.removeTask(taskId, this.props.id)
    }

    render = () => {
        let {tasks = []} = this.props;

        return (
        <div className="todoList">
            <div>
                <div className="todoList__header">
                    <TodoListTitle title={this.props.title} />
                    <AddNewItemForm addItem={this.addTask} />
                </div>
                <TodoListTasks
                    changeStatus={this.changeStatus}
                    changeTitle={this.changeTitle}
                    removeTask={this.removeTask}
                    tasks={tasks.filter(task =>
                        this.state.filterValue === "All" 
                        ?
                        true
                        :
                        this.state.filterValue === "Completed"
                        ?
                        task.isDone === true
                        :
                        task.isDone === false
                )} />
                </div>
            <TodoListFooter 
                changeFilter={this.changeFilter} 
                filterValue={this.state.filterValue} 
            />
            <button className="btn-close" onClick={this.showPopup} />
            {this.state.showPopup
            ?
                <PopupRemove 
                    removeTask={this.removeTodolist}
                    hidePopup={this.hidePopup} />
            :
                null
            }            
        </div>
        );
    }
}

const ConnectTodolist = connect(null, {
    addNewTask, 
    changeTask,
    removeTask,
    removeTodolist,
    getTodolistTasks
})(TodoList)
export default ConnectTodolist;

