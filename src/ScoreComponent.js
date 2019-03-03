import React from 'react';
import './App.css';
class ScoreComponent extends React.Component {
    

    render() {
        // console.log(this.props.currentScore);
        return(
            <div
                className="Score-root"
            >
            
                <div
                    className="High-score"
                >
                    High:
                </div>

                <div
                    className="Score-quantity-high"
                >
                    {this.props.highScore}
                </div>

                <div
                    style = {{height:'160px'}}
                >
                </div>

                <div
                className="High-score"

                >
                    Score:
                </div>

                <div
                className="Score-quantity-current"
                >
                    {this.props.currentScore}
                </div>

            </div>
        )
    }

}

export default ScoreComponent;