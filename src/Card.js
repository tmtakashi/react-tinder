import React from 'react';
import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPanning: false,
        }
    }
    render() {
        return (
            <div
                className={'card'}
                style={this.props.style}
            >
                <img src={this.props.person.img} alt="profile" />
                <div className={"info"}>
                    <span>
                        {this.props.person.name + "、" + this.props.person.age}
                    </span>
                </div>
                <div className={"show-detail"}>
                    <IconButton className={"detail-btn"}>
                        <InfoIcon></InfoIcon>
                    </IconButton>
                </div>
            </div >
        );

    }
}

export default Card;