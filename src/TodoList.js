import React from 'react';
import './App.css';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm';

class TodoList extends React.Component {
    
    constructor(props) {
        super(props);

        this.newTaskId = 1;

        this.state = {
            tasks: [],
            filterValue: "All",
        };
    }

    componentDidMount() {
        this.restoreState();
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    };

    restoreState = () => {
        let state = this.state;

        let stateAsString = localStorage.getItem("our-state-" + this.props.id);
        if(stateAsString != null) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if(t.id === this.newTaskId) {
                    this.newTaskId = t.id + 1;
                }
            })
        });
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue,
        }, this.saveState);
    };

    addTask = (newText) => {
        let newTask = {
            id: this.newTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.newTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        }, this.saveState);
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if(t.id !== taskId) {
                return t;
            } else {
                return {...t, ...obj}
            }
        })

        this.setState({
            tasks: newTasks,
        }, this.saveState)
    };

    render = () => {
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
                            tasks={this.state.tasks.filter(task =>
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
                </div>
        );
    }
}

export default TodoList;

