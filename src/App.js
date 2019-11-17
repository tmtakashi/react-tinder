import React from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear'
import './App.css';
import Stack from './Stack'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.people = [
      {
        name: 'Linda',
        age: 25,
        img: "https://i.imgur.com/QZuGC10.jpg"
      },
      {
        name: 'Lisa',
        age: 20,
        img: "https://i.imgur.com/1EWwp59.jpg"
      },
      {
        name: 'Sandra',
        age: 18,
        img: "https://i.imgur.com/Lu3laIj.jpg"
      },
      {
        name: 'Chloe',
        age: 18,
        img: "https://i.imgur.com/WgYIxhw.png"
      },
      {
        name: 'Alexa',
        age: 23,
        img: "https://i.imgur.com/D0PQegY.png"
      },
      {
        name: 'Maria',
        age: 21,
        img: "https://i.imgur.com/eqd5IhH.jpg"
      },
      {
        name: 'Emma',
        age: 24,
        img: "https://i.imgur.com/4F9NXPo.png"
      },
      {
        name: 'Sara',
        age: 18,
        img: "http://i40.tinypic.com/ofxe21.jpg"
      },
      {
        name: 'Lara',
        age: 22,
        img: "https://i.imgur.com/HMkdN6A.jpg"
      }
    ]
    this.stack = React.createRef()
  }

  like() {
    this.stack.current.like();
  }

  nope() {
    this.stack.current.nope();
  }

  render() {
    return (
      <div className="App" >
        <Stack ref={this.stack} people={this.people}></Stack>
        <div className={"btn-group"}>
          <IconButton onClick={this.nope.bind(this)} className={"btn nope"}>
            <ClearIcon color="error"></ClearIcon>
          </IconButton>
          <IconButton onClick={this.like.bind(this)} className={"btn like"}>
            <FavoriteIcon color="primary"></FavoriteIcon>
          </IconButton>
        </div>
      </div>
    );
  }
}

