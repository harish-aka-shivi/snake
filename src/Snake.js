import React from 'react';
import './App.css';

class Snake extends React.Component {
    constructor(props) {
        super(props);
        this.initDefaults();
        this.state = {
          snake:[
            {x: this.initialXPos + 3*this.movementUnit, y: this.initialYPos},
            {x: this.initialXPos + 2*this.movementUnit, y: this.initialYPos},
            {x: this.initialXPos + this.movementUnit, y: this.initialYPos},
            {x: this.initialXPos, y: this.initialYPos},
          ],
          score:0
        }
        
        this.handleChangeDirection = this.handleChangeDirection.bind(this);
      }
    
      initDefaults() {
        this.movementUnit = 15;
        this.initialXPos = 90;
        this.initialYPos = 150
    

        // variables tracking speed and direction of snake
        this.dx = this.movementUnit;
        this.dy = 0;
    
        // canvas default
        this.gameWidth = 640;
        this.gameHeight = 400;
      
        //defaults
        this.foodX = 300;
        this.foodY = 300;
    
        // factor of game speed
        // increase by 20
        this.gameSpeed = 1;
    
        // score per food
        this.eatScoreUnit = 10;
      }

      componentDidMount() {
        window.addEventListener('keydown', this.handleChangeDirection, {passive:true});
        let canv = this.refs.canvas;
        this.ctx = canv.getContext("2d");  
        this.addRandomFood();
        this.drawFood();
        this.drawFullSnake();  
       
    
        this.interval = window.setInterval(() => {
          this.clearCanvas();
          // console.log('check for coll', this.checkForCollision())
          if(this.checkForCollision()) {
            this.informGameFinished();
          } else {
            this.moveSnake();
          }
    
          // this.moveSnake();
    
          // console.log('hello', this.state.snake);
        
          // this.setState();
        }, (160 - this.gameSpeed*20) );
      }
    

      informGameFinished = () => {
        this.props.gameFinished();
      }
    
      checkIfFoodEaten() {
        // console.log('snake x and y', this.state.snake[0].x,"   " ,this.state.snake[0].y, 'this.food x and y', this.foodX , "  ",this.foodY)
        if(this.state.snake[0].x === this.foodX && this.state.snake[0].y === this.foodY) {
          return true;
        }
        return false;
      }
    
      // handleEatFood() {
      //   let foodEaten = this.checkIfFoodEaten();
      //   if(foodEaten) {
    
      //   } 
      // }
    
    
      // if collided with self or with walls
      checkForCollision() {
        for(let i = 1; i < this.state.snake.length; i++) {
          let collision = this.state.snake[0].x === this.state.snake[i].x &&
          this.state.snake[0].y === this.state.snake[i].y 
        
          if(collision) {
            return true;
          }
        }
        let hitLeftWall = this.state.snake[0].x < 0;
        let hitRightWall = this.state.snake[0].x > this.gameWidth-this.movementUnit;
        let hitTopWall = this.state.snake[0].y < 0;
        let hitBottomWall = this.state.snake[0].y > this.gameHeight-this.movementUnit;
    
        return hitBottomWall || hitTopWall || hitRightWall || hitLeftWall;
      }
    
      //get random x and y
      getRandomCoordinates() {
        // let randomFoodX = Math.floor(Math.random()*(this.gameWidth-this.movementUnit));
        // let randomFoodY = Math.floor(Math.random()*(this.gameWidth-this.movementUnit));
        // console.log('xinsi => ', this.gameWidth- this.movementUnit);
    
        let x = Math.floor((Math.random() * (this.gameWidth-this.movementUnit)));
        x = x - x%this.movementUnit;
        
        let y = Math.floor((Math.random() * (this.gameHeight-this.movementUnit)));
        y = y - y%this.movementUnit;
      
        return {x:x, y:y};
      }
    
      // get random points 
      // check for validity
      // draw on canvas
      addRandomFood() {
        let randomCoordinates = this.getRandomCoordinates();
        
        while(this.liesOnSnake(randomCoordinates)) {
          randomCoordinates = this.getRandomCoordinates();
        }
    
        this.foodX = randomCoordinates.x;
        this.foodY = randomCoordinates.y; 
      }
    
      drawFood() {
        this.drawSnakeBlock({x:this.foodX,y:this.foodY});
      }
    
      //check if it lies on the snake
      liesOnSnake(coordinates) {
        for(let i = 0; i < this.state.snake.length; i++) {
          if(coordinates.x === this.state.snake[i].x && coordinates.y === this.state.snake[i].y) {
            return true
          }
        }
        return false;
      }
    
      componentWillUnmount() {
        // listen for key down events
        window.removeEventListener('keydown', this.handleChangeDirection, {passive:true});
        clearInterval(this.interval)
      }
    
      //draw the individual snake block
      drawSnakeBlock(snakePart) {
        this.ctx.fillStyle = "white";
        this.ctx.strokestyle="green"
        this.ctx.fillRect(snakePart.x, snakePart.y, this.movementUnit, this.movementUnit);
        this.ctx.strokeRect(snakePart.x, snakePart.y, this.movementUnit, this.movementUnit);
      }
    
      // set the canvas to original black color
      clearCanvas() {
        this.ctx.fillStyle = "#090a14";
        //  Select the colour for the border of the canvas
        this.ctx.strokestyle = "white";
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        // Draw a "border" around the entire canvas
        this.ctx.strokeRect(0, 0, this.gameWidth, this.gameHeight);
      }
    
      // go through the snake array and draw each block
      drawFullSnake() {
        this.state.snake.forEach((item) => this.drawSnakeBlock(item))
      }
    
      componentDidUpdate() {
        // console.log('update is called')
        this.drawFullSnake();
        this.drawFood();
      }
    
      moveSnake() {
        let removeTail = true;
        let currentScore = this.state.score;
    
        if(this.checkIfFoodEaten()) {
          removeTail = false;
          this.addRandomFood();
          currentScore = currentScore + this.eatScoreUnit;
        }
    
        let tempSnake = this.state.snake.slice(0);
        // console.log('x ==>', this.dx, 'y ===> ', this.dy);
        let newHeadX = tempSnake[0].x + this.dx;
        let newHeadY = tempSnake[0].y + this.dy;
        let newHead = {x:newHeadX,y:newHeadY};
        tempSnake.unshift(newHead);
    
        if(removeTail) {
          tempSnake.pop();
        }
        this.setState({snake:tempSnake, score:currentScore}, () => this.updateScore(currentScore));
      }
    
      updateScore = (currentScore) => {
        this.props.updateScore(currentScore)  
      }
    
      // decide the dx and dy based on key pressed
      handleChangeDirection(event) {
        // console.log('handle change direction called', event);
        
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
      
        
        const keyPressed = event.keyCode;
        
        let movingRight = this.dx === this.movementUnit;
        let movingUp = this.dy === -1 * this.movementUnit;
        let movingDown = this.dy === this.movementUnit;
        let movingLeft = this.dx === this.movementUnit * -1;
    
        if(keyPressed === LEFT_KEY && !movingRight) {
          this.dy = 0;
          this.dx = -1 * this.movementUnit;
        }
    
        if(keyPressed === RIGHT_KEY && !movingLeft) {
          this.dy = 0;
          this.dx = this.movementUnit;
        }
    
        if(keyPressed === UP_KEY && !movingDown) {
          this.dy = -1 * this.movementUnit;
          this.dx = 0;
          // console.log('x ==>', this.dx, 'y ===> ', this.dy);
        }
    
        if(keyPressed === DOWN_KEY && !movingUp) {
          this.dy =this.movementUnit;
          this.dx = 0;
        }
    
      }
    
      render() {
        // console.log('render function called');
        
        return (
       
           <div
          style={{flex:1, display:'flex',
          width:'100%',
          justifyContent:'center', alignItems:'center'}}
         >
    
           <canvas
            ref='canvas'
            width={this.gameWidth}
            // width="100%"
            height={this.gameHeight}
           >
    
           </canvas>
       
    
         </div>
        );
      }
    }




export default Snake;
