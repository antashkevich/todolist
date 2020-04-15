import React from 'react';

class AddNewItemForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEmpty: false,
            title: "",
        }
    }

    onAddItemClick = (e) => {
        let newTitle = this.state.title;
        if(newTitle) {
            this.setState({isEmpty: false,})
            this.props.addItem(newTitle);
        } else {
            this.setState({isEmpty: true,});
        }
        this.setState({
            title: "",
        });
    };

    onTitleChanged = (e) => {
        this.setState({
            isEmpty: false,
            title: e.currentTarget.value,
        })
    };

    onAddItemEnterPress = (e) => (e.key === "Enter") ? this.onAddItemClick() : null;

    render = () => {
        return (
            <div className="item-create">
                <input 
                    className={"item-create__input"+ (this.state.isEmpty ? " item-create__input_error" : "")}
                    onChange={this.onTitleChanged}
                    onKeyPress={this.onAddItemEnterPress}
                    value={this.state.title}
                    type="text" 
                    placeholder="New item name"
                />
                <button className="item-create__btn" onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
}

export default AddNewItemForm ;
