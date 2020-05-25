import React from 'react';
import PopupRemove from './PopupRemove';

class TodoListTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            showPopup: false
        };
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

    removeTask = (taskId) => {
        this.props.removeTask(taskId);
        this.setState({
            showPopup: false
        });
    }
    
    render = () => {
        let classForTask = this.props.task.isDone ? "todoList__item_done " : "";
        let taskId = this.props.task.id;
        return (
            <div className="todoList__item">
                <label className="todoList__label">
                    <div className="checkbox">
                        <input 
                            id={this.props.item}
                            className="checkbox__input"
                            type="checkbox" 
                            checked={this.props.task.isDone}
                            onChange={this.onIsDoneChaged} />
                        <span className="checkbox__custom"></span>
                    </div>
                    <div className={classForTask + "todoList__content"}>
                        <div className="todoList__value-container">
                            <span>{this.props.task.id}.</span> 
                            {this.state.editMode
                                ?
                                <input 
                                    className="todoList__input"
                                    onChange={this.onTitleChanged}
                                    onKeyPress={this.onAddTaskEnterPress}
                                    onBlur={this.deactivateEditMode} 
                                    value={this.props.task.title} 
                                    autoFocus={true}
                                />
                                :
                                <span className="todoList__value">{this.props.task.title}</span>
                            }
                        </div>
                        <span className="todoList__priority">{this.props.task.priority}</span>
                    </div>
                </label>
                <button className="todoList__edit-btn" onClick={this.activateEditMode}>edit</button>
                <button className="btn-close btn-close__task" onClick={this.showPopup} />
                {this.state.showPopup
                ?
                    <PopupRemove
                        removeTask={() => this.removeTask(taskId)}
                        hidePopup={this.hidePopup} />
                :
                    null
                }
            </div>
        );
    }
}

export default TodoListTask;
