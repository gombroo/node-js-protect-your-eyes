import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 1200, 
    timer: null,
  }

  formatTime = (time) => {
    if (typeof time != 'number' || time <0) {
      return null;
    }
      
    let hours, minutes;
    const h = parseInt(time / 3600); // 1h
  
    if (h <= 0) {
      hours = '00';
    } else if (h < 10) {
      hours = `0${h}`;
    } else {
      hours = h;
    }
  
    time -= h * 3600;
    const m = parseInt(time / 60);
  
    if (m <= 0) {
      minutes = '00';
    } else if (m < 10) {
      minutes = `0${m}`;
    } else {
      minutes = m;
    }
  
    return `${hours} : ${minutes}`;
  };

  handleChangeStatus(newState) {
    this.setState({ status: newState });
  }

  step = () => {};

  startTimer = () => {
    this.setState({ 
      timer: setInterval(this.step, 1000),
    });
  };

  render() {
    const { status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <div className="description"><p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p></div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{ this.state.time }</div>}
        {(status === 'off') && <button className="btn" onClick={ event => this.handleChangeStatus('work') }>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={ event => this.handleChangeStatus('rest') }>Stop</button>}
        <button className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
