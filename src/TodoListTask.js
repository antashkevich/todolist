import React from 'react';

class TodoListTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
        }
    }
    
    onIsDoneChaged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
    };

    onAddTaskEnterPress = (e) => (e.key === "Enter") ? this.deactivateEditMode() : null;
    
    render = () => {
        let classForTask = this.props.task.isDone ? "done" : "";

        return (
            <div className={classForTask + " todoList-task"}>
                <input 
                    id={this.props.item}
                    type="checkbox" 
                    checked={this.props.task.isDone}
                    onChange={this.onIsDoneChaged}
                />
                <label>
                    <span>{this.props.task.id}</span> - 
                    {this.state.editMode
                        ?
                        <input 
                            onChange={this.onTitleChanged}
                            onKeyPress={this.onAddTaskEnterPress}
                            onBlur={this.deactivateEditMode} 
                            value={this.props.task.title} 
                            autoFocus={true}
                        />
                        :
                        <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                    },
                    <span> {this.props.task.priority}</span>
                </label>
            </div>
        );
    }
}

export default TodoListTask;
