import React, { Component } from 'react';
import './App.css';
import Snake from './Snake.js';
import ScoreComponent from './ScoreComponent';
import LeftComponent from './LeftComponent';
import {bake_cookie,read_cookie,GAME_STARTED,GAME_FINISHED} from './Util.js';
import EmptyGame from './EmptyGame.js';

class App extends Component {
  constructor(props) {
    super(props);
    let highScore = read_cookie("_hS")
    this.state ={
      currentScore : 0,
      gameState:GAME_FINISHED,
      highScore:highScore,
    }
  }


  playClicked = () => {
    this.setState({
      gameState:GAME_STARTED
    })
  } 

  gameFinished = () => {
    if(this.state.currentScore > this.state.highScore) {
      bake_cookie("_hS", this.state.currentScore);
    }

    this.setState({
      gameState:GAME_FINISHED,
      currentScore:0,
      highScore: read_cookie("_hS")
    })
  }

  updateScore = (currentScore) => {
    // console.log(currentScore)
    if(currentScore !== this.state.currentScore) {
      this.setState({currentScore:currentScore});
    }
  }



  render() {
    // console.log('render function called');
    
    return (
   
      <div
        className="App">

        <div
          style={{flex:0.23,  padding:'24px'}}
        >
          <LeftComponent>
          </LeftComponent>

        </div>
       
        <div
          style={{flex:0.54}}
        >

          {this.state.gameState === GAME_STARTED && <Snake
            updateScore={this.updateScore}
            gameFinished={this.gameFinished}
          >
          </Snake>}

          {this.state.gameState === GAME_FINISHED &&
            <EmptyGame
              playClicked={this.playClicked}
            >
            
            </EmptyGame>
          }
        
        </div>

        <div
          style={{flex:0.23, padding:'24px'}}
        >
          <ScoreComponent
            currentScore={this.state.currentScore}
            highScore={this.state.highScore}
          >
          </ScoreComponent>
        </div>

     </div>
    );
  }
}

export default App;
