import React from 'react';
import {getMergeSortAnimations, getBubbleSortAnimator, getInsertionSortAnimator} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
var NUMBER_OF_BARS = 280;


const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.

// This is the main color of the array bars.
const PRIMARY_COLOR = '#68b0ab';

var WIDTH = 730/NUMBER_OF_BARS;

var clicked_height = null;

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [],
            NUMBER_OF_BARS : 280
        };
    }

    changeHandler = (event) => {
        this.setState({NUMBER_OF_BARS : event.target.value});
    }

    submitHandler = (event) => {
        event.preventDefault();
        NUMBER_OF_BARS = this.state.NUMBER_OF_BARS
        WIDTH = 730/NUMBER_OF_BARS;
        this.resetArray();
    }

    componentDidMount() {
        this.resetArray();
    }
    resetArray() {
        const array = [];
        for(var i=0;i<NUMBER_OF_BARS;i++){
            array.push(randomIntInInterval(5,600));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

      bubbleSort() {
          const animations = getBubbleSortAnimator(this.state.array);
          for(let i=0;i<animations.length;i++) {
              console.log(animations[i]);
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, flag, item] = animations[i];
            if(flag === false) {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                var color = 'red';
                if(item === 0) {
                    color = '#ff9a76';
                } else if(item === 1) {
                    color = PRIMARY_COLOR;
                }
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barTwoIdx}px`;
                }, i * ANIMATION_SPEED_MS);
            }
         }
      }

      insertionSort() {
          const animations = getInsertionSortAnimator(this.state.array);
          console.log(animations.length);
          for(let i=0;i<animations.length;i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, flag] = animations[i];
            if(flag == 0) {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = SECONDARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else if(flag == 1) {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } 
            else {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barTwoIdx}px`;
                }, i * ANIMATION_SPEED_MS);
            }
         }
      }
    
    render() {
        const {array} = this.state;
    
        return (
          <div>
            <button className="top-btn btn btn-outline-primary" onClick={() => this.resetArray()}>Generate New Array</button>
            <button className="top-btn btn btn-outline-secondary" onClick={() => this.mergeSort()}>Merge Sort</button>
            <button className="top-btn btn btn-outline-success" onClick={() => this.insertionSort()}>insertion Sort</button>
            <button className="top-btn btn btn-outline-warning" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <div className="array-container">
            <br></br>
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                onClick = {() =>
                      clicked_height = ({value})
                }
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                  width: `${WIDTH}px`
                }}></div>
            ))}
            <form className="bottom-form" onSubmit={this.submitHandler}>
                <p>Enter the number of elements in the array: (default 280)</p>
                <input onChange={this.changeHandler} type="text" />
                <input style={{marginLeft : "20px"}} type='submit'/>
            </form>
          </div>
        </div>
        );
      }
}

function randomIntInInterval(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}