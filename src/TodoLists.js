import React from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';

import { addNewTodoList, getTodolists } from './store';

class App extends React.Component {
    componentDidMount() {
        this.props.getTodolists();
    };

    addTodoList = (title) => {
        this.props.addNewTodoList(title);
    };

    render = () => {
        const todolists = this.props.todolists.map(tl => <TodoList id={tl.id} title={tl.title} key={tl.id} tasks={tl.tasks} />);
        return (
            <>
                <div className="header">
                    <h2 className="header__title">Create New List</h2>
                    <AddNewItemForm addItem={this.addTodoList} />
                </div>
                <div className="lists-container container">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({todolists: state.todolists});

const ConnectApp = connect(mapStateToProps, {
    addNewTodoList,
    getTodolists
})(App)

export default ConnectApp;

