import React from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear'
import './App.css';
import Stack from './Stack'
import People from './people'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.people = People;
    this.stack = React.createRef();
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
          <IconButton onClick={this.nope.bind(this)} className={"btn"}>
            <ClearIcon color="error" fontSize="large"></ClearIcon>
          </IconButton>
          <div class="divider" />
          <IconButton onClick={this.like.bind(this)} className={"btn"}>
            <FavoriteIcon color="primary" fontSize="large"></FavoriteIcon>
          </IconButton>
        </div>
      </div>
    );
  }
}

