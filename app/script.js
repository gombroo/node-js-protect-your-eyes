import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 1200, // 20 min counter
    timer: null, // 1 sec interval
  }

  formatTime = (time) => {
    let minutes, seconds;

    if (typeof time != 'number' || time <0) {
      return null;
    }

    const m = parseInt(time / 60); // 1 min
  
    if (m <= 0) {
      minutes = '00';
    } else if (m < 10) {
      minues = `0${h}`;
    } else {
      minutes = m;
    }
  
    time -= minutes * 60;
  
    if (time <= 0) {
      seconds = '00';
    } else if (time < 10) {
      seconds = `0${m}`;
    } else {
      seconds = time;
    }
  
    return `${minutes} : ${seconds}`;
  };

  changeStatusHandler(newStatus) {
    this.setState({ 
      status: newStatus, 
    });

    if (newStatus == 'rest') {
      this.setState({
        status: 'rest',
        time: 20,
      });
    }
  };

  step = () => {
    // remove one second, set state so a re-render happens
    this.setState({
      time: this.state.time -1,
    });

    // check if we're at zero
    if (this.state.time == 0) {
      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        });
      } else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        });
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      time: 1200,
      status: 'off',
    });
  }

  render() {
    const {status} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <div className="description"><p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p></div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}  
        {(status === 'off') && <button className="btn" onClick={ event => {this.changeStatusHandler('work'); this.startTimer() }}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={ event => this.changeStatusHandler('rest')}>Stop</button>}
        <button className="btn btn-close" onClick={ event => {this.stopTimer()} }>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
