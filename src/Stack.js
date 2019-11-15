import React from 'react';
import Card from './Card.js'
import Hammer from "hammerjs"
// import Hammer from "react-hammerjs"


class Stack extends React.Component {

    constructor(props) {
        super(props);
        this.stack = React.createRef()
        this.stackLength = 2;
        this.state = {
            topCard: Object,
            nextCard: Object,
            hammer: null,
            isPanning: false,
            startPosX: 0,
            startPosY: 0,
            topCardTransition: null,
            topCardTransform: null,
            nextCardTransition: null,
            nextCardTransform: null,
            isDraggingFrom: 0,
            currentPeople: props.people.slice(-this.stackLength),
            currentIndex: props.people.length
        }
    }

    componentDidMount() {
        this.handle()
    }

    handle() {
        let cards = this.stack.current.childNodes
        let topCard = cards[cards.length - 1]
        // get next card
        let nextCard = cards[cards.length - 2]
        this.setState({ topCard: topCard, nextCard: nextCard });
        if (cards.length > 0) {
            // listen for pan gesture on top card
            this.setState({ topCardTransform: 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)' })
            if (this.state.hammer) this.state.hammer.destroy()
            let hammer = new Hammer(topCard)
            hammer.add(new Hammer.Pan({ position: Hammer.position_ALL, threshold: 0 }))
            // pass event data to custom callback
            hammer.on('pan', this.onPan.bind(this))

            this.setState({ hammer: hammer });
        }
    }

    onPan(e) {
        if (!this.state.isPanning) {
            this.setState({ isPanning: true });
            // remove transition property
            this.setState({ topCardTransition: null });
            if (this.state.nextCard) this.setState({ nextCardTransition: null });
            // get starting coordinates
            let style = window.getComputedStyle(this.state.topCard);
            let mx = style.transform.match(/^matrix\((.+)\)$/);
            this.setState({ startPosX: mx ? parseFloat(mx[1].split(', ')[4]) : 0 });
            this.setState({ startPosY: mx ? parseFloat(mx[1].split(', ')[5]) : 0 });

            let bounds = this.state.topCard.getBoundingClientRect();
            this.setState({ isDraggingFrom: (e.center.y - bounds.top) > this.state.topCard.clientHeight / 2 ? -1 : 1 });
        }

        // calculate new coordinates
        let posX = e.deltaX + this.state.startPosX
        let posY = e.deltaY + this.state.startPosY

        let propX = e.deltaX / this.stack.current.clientWidth;

        // get swipe direction, left (-1) or right (1)
        let dirX = e.deltaX < 0 ? -1 : 1

        // get degrees of rotation between 0 and +/- 45
        let deg = this.state.isDraggingFrom * dirX * Math.abs(propX) * 45
        // calculate scale ratio, between 95 and 100 %
        let scale = (95 + (5 * Math.abs(propX))) / 100

        // move top card
        this.setState({ topCardTransform: 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)' })
        // scale next card
        if (this.state.nextCard) {
            this.setState({
                nextCardTransform: 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')'
            });
        }
        if (e.isFinal) {
            let successful = false
            this.setState({ isPanning: false })
            // set back transition property
            this.setState({ topCardTransition: 'transform 200ms ease-out' });
            if (this.state.nextCard) this.setState({ nextCardTransition: 'transform 100ms linear' });
            // check threshold
            if (propX > 0.25 && e.direction === Hammer.DIRECTION_RIGHT) {
                successful = true
                // get right border position
                posX = this.stack.current.clientWidth;

            } else if (propX < -0.25 && e.direction === Hammer.DIRECTION_LEFT) {
                successful = true
                // get left border position
                posX = - (this.stack.current.clientWidth + this.state.topCard.clientWidth)
            }
            if (successful) {
                this.setState({ topCardTransform: 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)' });
                // wait transition end
                setTimeout(() => {
                    this.postProcess()
                }, 200)
            }
            else {
                // reset card position
                this.setState({ topCardTransform: 'translateX(-50%) translateY(-50%) rotate(0deg)' });
                if (this.state.nextCard) this.setState({ nextCardTransform: 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)' });
            }
        }
    }

    postProcess() {
        // remove swiped card
        this.setState({
            currentPeople: this.state.currentPeople.slice(0, -1),
            currentIndex: (this.state.currentIndex - 1) % this.props.people.length,
            topCardTransform: 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)',
            topCardTransition: null
        })
        // add new card
        this.push()
        // handle gestures on new top card
        this.handle()
    }

    push() {
        if (this.state.currentIndex > 1) {
            this.setState({ currentPeople: this.props.people.slice(this.state.currentIndex - this.stackLength, this.state.currentIndex) })
        } else if (this.state.currentIndex === 1) {
            this.setState({ currentPeople: [this.props.people[this.props.people.length - 1], this.props.people[0]] })
        } else if (this.state.currentIndex === 0) {
            this.setState({ currentPeople: this.props.people.slice(-2), currentIndex: this.props.people.length })
        }
    }

    like() {
        this.setState({ topCardTransition: 'transform 200ms ease-out' });
        let posX = this.stack.current.clientWidth;
        let posY = -250
        let deg = 35
        this.setState({ topCardTransform: 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)' });
        setTimeout(() => {
            this.postProcess()
        }, 200)
    }
    nope() {
        this.setState({ topCardTransition: 'transform 200ms ease-out' });
        let posX = - (this.stack.current.clientWidth + this.state.topCard.clientWidth)
        let posY = -250
        let deg = 35
        this.setState({ topCardTransform: 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)' });
        setTimeout(() => {
            this.postProcess()
        }, 200)
    }

    render() {
        return (
            <div className={"stack"} ref={this.stack}>
                {
                    this.state.currentPeople.length > 2 && this.state.currentPeople.slice(0, -2).reverse().map((person) => {
                        return <Card className={"card"}
                            // key={person.id}
                            person={person}></Card>;
                    })
                }
                {
                    this.state.currentPeople.length > 1 &&
                    <Card
                        className={"card"}
                        style={{ transition: this.state.nextCardTransition, transform: this.state.nextCardTransform }}
                        // key={this.state.currentPeople[this.state.currentPeople.length - 2].id}
                        person={this.state.currentPeople[this.state.currentPeople.length - 2]}
                    >
                    </Card>
                }
                {
                    this.state.currentPeople.length > 0 &&
                    <Card
                        className={"card"}
                        style={{ transition: this.state.topCardTransition, transform: this.state.topCardTransform }}
                        // key={this.state.currentPeople[this.state.currentPeople.length - 1].id}
                        person={this.state.currentPeople[this.state.currentPeople.length - 1]}
                    >
                    </Card>
                }
            </div>
        );
    }
}

export default Stack;