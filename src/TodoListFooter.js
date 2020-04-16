import React from 'react';

class TodoListFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHidden: false,
        };
    }

    onAllFilterClick = () => {this.props.changeFilter("All")}
    onCompletedFilterClick = () => {this.props.changeFilter("Completed")}
    onActiveFilterClick = () => {this.props.changeFilter("Active")}
    onShowFiltersClick = () => {this.setState({isHidden: false,})}
    onHideFiltersClick = () => {this.setState({isHidden: true,})}

    render = (props) => {

        let classForAll = this.props.filterValue === "All" ? "filter__btn_active " : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter__btn_active " : "";
        let classForActive = this.props.filterValue === "Active" ? "filter__btn_active " : "";

        return (
            <div className="todoList__footer filter">
                {this.state.isHidden
                ? 
                <>
                    <button onClick={this.onAllFilterClick} className={classForAll + "filter__btn filter__btn_sort"}>All</button>
                    <button onClick={this.onCompletedFilterClick} className={classForCompleted + "filter__btn filter__btn_sort"}>Completed</button>
                    <button onClick={this.onActiveFilterClick} className={classForActive + "filter__btn filter__btn_sort"}>Active</button>
                    <button className="filter__btn filter__btn_control" onClick={this.onShowFiltersClick}>Hide</button>
                </>
                :
                <button className="filter__btn filter__btn_control" onClick={this.onHideFiltersClick}>Show</button>
                }
               
            </div>
        );
    }
}

export default TodoListFooter;
