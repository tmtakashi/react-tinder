import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPanning: false,
        }
    }

    onPan(e) {
        if (!this.state.isPanning) {

            this.setState({ isPanning: true })
            // remove transition property
            this.topCard.style.transition = null

            // get starting coordinates
            let style = window.getComputedStyle(this.topCard)
            let mx = style.transform.match(/^matrix\((.+)\)$/)
            this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0
            this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0

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
            </div >
        );

    }
}

export default Card;