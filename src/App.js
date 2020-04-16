import React from 'react';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            todolists: [
                {
                    id: 1,
                    title: "What to learn",
                },
                {
                    id: 2,
                    title: "Week tasks",
                },
                {
                    id: 3,
                    title: "Year tasks",
                }
            ],
        };
    }

    addTodoList = (title) => {
        alert(title);
    };

    render = () => {
        const todolists = this.state.todolists.map(tl => <TodoList id={tl.id} title={tl.title} key={tl.id} />);

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

export default App;

