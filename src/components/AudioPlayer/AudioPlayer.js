import React from "react";
import convertMinInTime from "../../utils/convertMinInTime";
import "./AudioPlayer.css";

export class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.playPause = React.createRef();
    this.progress = React.createRef();
  }

  state = {
    totalTime: convertMinInTime(this.props.dur),
    currentTime: "0:00",
    isPlay: true,
    isLoading: false,
  };
  voiceURL = `audio/${Math.round(1 - 0.5 + Math.random() * (30 - 1 + 1))}.ogg`
  draggableClasses = ["pin"];
  currentlyDragged = null;

  isDraggable(el) {
    let canDrag = false;
    let classes = Array.from(el.classList);
    ["pin"].forEach((draggable) => {
      if (classes.indexOf(draggable) !== -1) canDrag = true;
    });
    return canDrag;
  }

  inRange(event) {
    let rangeBox = this.getRangeBox(event);
    let rect = rangeBox.getBoundingClientRect();
    let direction = rangeBox.dataset.direction;
    if (direction === "horizontal") {
      let min = rangeBox.offsetLeft;
      let max = min + rangeBox.offsetWidth;
      if (event.clientX < min || event.clientX > max) return false;
    } else {
      let min = rect.top;
      let max = min + rangeBox.offsetHeight;
      if (event.clientY < min || event.clientY > max) return false;
    }
    return true;
  }

  updateProgress() {
    let current = this.player.current.currentTime;
    let percent = (current / this.player.current.duration) * 100;
    this.progress.current.style.width = percent + "%";
    this.setState({ currentTime: this.formatTime(current) });
  }

  formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return min + ":" + (sec < 10 ? "0" + sec : sec);
  }

  togglePlay() {
    if (this.player.current.paused) {
      this.setState({ isPlay: false });
      this.player.current.play();
    } else {
      this.setState({ isPlay: true });
      this.player.current.pause();
    }
  }

  makePlay() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div className="holder">
        <div
          className="audio green-audio-player"
          onTimeUpdate={() => this.updateProgress()}
          onLoadedMetadata={() => {
            this.setState({
              totalTime: this.formatTime(this.player.current.duration),
            });
          }}
          onEnded={() => {
            this.player.current.currentTime = 0
            this.setState({
              currentTime: "0:00",
              isPlay: true,
            });
          }}
        >
          <div
            className="loading"
            style={this.state.isLoading ? null : { display: "none" }}
          >
            <div className="spinner"></div>
          </div>
          <div
            className="play-pause-btn"
            onClick={() => this.togglePlay()}
            style={this.state.isLoading ? null : { display: "block" }}
          >
            <svg
              className="tringle"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 18 24"
              style={this.state.isPlay ? { marginLeft: "7px" } : null}
            >
              <path
                fill="rgb(240, 237, 237)"
                fillRule="evenodd"
                d={
                  this.state.isPlay
                    ? "M18 12L0 24V0"
                    : "M0 0h6v24H0zM12 0h6v24h-6z"
                }
                className="play-pause-icon"
                id="playPause"
                ref={this.playPause}
              />
            </svg>
          </div>
          <div className="controls">
            <span className="current-time">{this.state.currentTime}</span>
            <div className="slider" data-direction="horizontal">
              <div className="progress" ref={this.progress}>
                <div
                  className="pin"
                  id="progress-pin"
                  data-method="rewind"
                ></div>
              </div>
            </div>
            <span className="total-time">{this.state.totalTime}</span>
          </div>
          <div className='audio-download-button'>
            
            <a href={this.voiceURL} download="voice" target="_blank" rel="noreferrer">
            <svg width="20px" height="20px" viewBox="0 0 16 16" version="1.1">
              <path fill="#68a0f5bd" d="M0 14h16v2h-16v-2z"></path>
              <path fill="#68a0f5bd" d="M8 13l5-5h-3v-8h-4v8h-3z"></path>
            </svg>
            </a>
          </div>
          <audio crossOrigin="true" preload="none" ref={this.player}>
            <source src={this.voiceURL} type="audio/ogg" />
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      </div>
    );
  }
}
