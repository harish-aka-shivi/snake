import React from 'react';

class EmptyGame extends React.Component {

    playButtonClicked = () => {
        this.props.playClicked();
    }

    render() {
        return(
            <div
                className="Play-button-cont"
            >

            <div
              className="Play-button-container"  
            >
            
                <div
                    className="Play-button"
                    onClick={this.playButtonClicked}
                >   

                    PLAY

                </div>
        
            </div>
            
          
      
           </div>
        )
    }
}

export default EmptyGame;