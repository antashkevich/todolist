import React from 'react';

class PopupRemove extends React.Component {
    render = () => {
        return (
            <div className="popup-container">
                <div className="popup">
                    <h3 className="popup__title">Are you sure?</h3>
                    <div className="popup__btns-container">
                        <button onClick={this.props.removeTask} className="popup__btn popup__btn_reject">Yes</button>
                        <button onClick={this.props.hidePopup} className="popup__btn popup__btn_done">No</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopupRemove;
