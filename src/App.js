import React from 'react';
import ReactSwing from 'react-swing';
import { Direction } from 'swing';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import './App.css';
import { Fab } from '@material-ui/core';

const data = [
  {
    id: 0,
    name: "みらい",
    age: 26,
    img: 'pakutaso1.jpg'
  },
  {
    id: 1,
    name: "なお",
    age: 25,
    img: 'pakutaso2.jpg'
  }
]

export default class App extends React.Component {
  stackEl = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: data.length - 1
    }
  }

  throwOut(direction, coordinateX, coordinateY) {
    // ReactSwing Card Directions
    console.log("this.state.currentIndex", this.state.currentIndex);
    console.log('ReactSwing.DIRECTION', ReactSwing.DIRECTION);

    console.log('this.state.stack', this.state.stack);
    console.log('this.state.stack.getConfig', this.state.stack.getConfig());
    console.log('this.stackEl', this.stackEl);

    // ReactSwing Component Childrens
    const targetEl = this.stackEl.current.childElements[this.state.currentIndex]
    console.log('targetEl', targetEl);
    console.log('targetEl.current', targetEl.current);
    if (targetEl && targetEl.current) {
      // stack.getCard
      const card = this.state.stack.getCard(targetEl.current);

      console.log('card', card);

      // throwOut method call
      card.throwOut(coordinateX, coordinateY, direction);
      card.on("throwoutend", () => {
        this.setState({ currentIndex: this.state.currentIndex - 1 });
        console.log("this.state.currentIndex", this.state.currentIndex);
        console.log(targetEl.current)
        this.state.stack.createCard(targetEl.current)
        targetEl.current.remove()
        console.log(this.stackEl.current)
      })
    }
  }

  render() {

    const config = {
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
      transform: (element, x, y, r) => {
        y = 0;
        element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
      },
      minThrowOutDistance: 600,
      maxThrowOutDistance: 800
    }
    return (
      <div className="App" >
        <div id="viewport">
          <ReactSwing
            className="stack"
            setStack={stack => this.setState({ stack: stack })}
            ref={this.stackEl}
            config={config}
          // throwout={e => console.log('throwout', e)}
          >
            {data.map(user =>
              <div key={user.id} ref={"card" + user.id} className={'card'}
              >
                <img src={"/static/images/" + user.img} alt="profile" />
                <span>
                  {user.name + "、" + user.age}
                </span>
              </div>
            )}
          </ReactSwing>
          <div className={"btn-group"}>
            <Fab color="secondary" onClick={this.throwOut.bind(this, Direction.RIGHT, 400, 400)} aria-label="add">
              <FavoriteIcon />
            </Fab>
            <Fab color="primary" onClick={this.throwOut.bind(this, Direction.LEFT, -400, 400)} aria-label="edit">
              <ClearIcon />
            </Fab>
          </div>
        </div>
      </div >
    );
  }
}

