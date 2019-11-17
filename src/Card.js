import React from 'react';
import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.detail = React.createRef()
    }
    openDetail() {
        const detail = this.detail.current;
        if (detail.style.display === "block") {
            detail.style.display = "none";
        } else {
            detail.style.display = "block";
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
                    <IconButton onClick={this.openDetail.bind(this)} className={"detail-btn"}>
                        <InfoIcon></InfoIcon>
                    </IconButton>
                </div>
                <div style={{ display: "none" }} ref={this.detail} className={"detail"}>
                    <p>
                        {this.props.person.detail}
                    </p>
                </div>
            </div >
        );

    }
}

export default Card;