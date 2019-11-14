import React from 'react';
import ReactSwing from 'react-swing';
import { Direction } from 'swing';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import './App.css';

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
    this.classes = makeStyles({
      card: {
        maxWidth: 345,
      },
      media: {
        height: 200,
      }
    });
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
      })
    }
  }

  render() {
    const imageStyle = {
      maxWidth: "100%",
      maxHeight: "100%",
    }

    const config = {
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
      transform: (element, x, y, r) => {
        y = 0;
        element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
      },
    }
    return (
      <div className="App" >
        <ReactSwing
          className="stack"
          setStack={stack => this.setState({ stack: stack })}
          ref={this.stackEl}
          config={config}
        // throwout={e => console.log('throwout', e)}
        >
          {data.map(user =>
            <Card key={user.id} ref={"card" + user.id} className={this.classes.card}
            // throwout={e => console.log('card throwout', e, this.state.stack)}
            >
              <CardMedia
                className={this.classes.media}
              >
                <img style={imageStyle} src={"/static/images/" + user.img} alt="profile" />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {user.name + "、" + user.age}
                </Typography>
              </CardContent>
            </Card>
          )}
        </ReactSwing>
        <Container>
          <Fab color="primary" onClick={this.throwOut.bind(this, Direction.RIGHT, 100, 200)} aria-label="add">
            <FavoriteIcon />
          </Fab>
          <Fab color="secondary" onClick={this.throwOut.bind(this, Direction.LEFT, -100, 200)} aria-label="edit">
            <ClearIcon />
          </Fab>
        </Container>
      </div >
    );
  }
}

