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
        img: "https://i.imgur.com/QZuGC10.jpg",
        detail: "The esteemed development trips into the glossy gold. It was then the eatable age met the tart action."
      },
      {
        name: 'Lisa',
        age: 20,
        img: "https://i.imgur.com/1EWwp59.jpg",
        detail: "The black-and-white dress confuses into the ecstatic product. Is the tour police better than the senior?"
      },
      {
        name: 'Sandra',
        age: 18,
        img: "https://i.imgur.com/Lu3laIj.jpg",
        detail: "The pure marriage can't bounce the honey. It was then the vast information met the elderly edge."
      },
      {
        name: 'Chloe',
        age: 18,
        img: "https://i.imgur.com/WgYIxhw.png",
        detail: "The grimy charge can't twist the conflict. Did the dirty tongue really amuse the reason?"
      },
      {
        name: 'Alexa',
        age: 23,
        img: "https://i.imgur.com/D0PQegY.png",
        detail: "Is the command policy better than the joint? Did the wordy bath really buzz the serve?"
      },
      {
        name: 'Maria',
        age: 21,
        img: "https://i.imgur.com/eqd5IhH.jpg",
        detail: "Did the runny cheek really juggle the handle? The bare profit jokes into the hateful minute."
      },
      {
        name: 'Emma',
        age: 24,
        img: "https://i.imgur.com/4F9NXPo.png",
        detail: "What if the disguised dear ate the male? It was then the whole poetry met the warmhearted cook."
      },
      {
        name: 'Sara',
        age: 18,
        img: "http://i40.tinypic.com/ofxe21.jpg",
        detail: "The plush background can't puncture the shirt. It was then the abject medium met the vibrant extension."
      },
      {
        name: 'Lara',
        age: 22,
        img: "https://i.imgur.com/HMkdN6A.jpg",
        detail: "Did the substantial towel really strengthen the celebration? Is the pat hello better than the airline?"
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

