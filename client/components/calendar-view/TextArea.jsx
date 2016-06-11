import React, { Component } from 'react';

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    console.log(props.title);
    this.state = {
      renderBox: (!props.editing)
    }
    this.renderTextArea = this.renderTextArea.bind(this);
    this.toggleRender = this.toggleRender.bind(this);
  }

  toggleRender() {
    if (!this.state.renderBox && this.props.editing) {
      this.setState({
        renderBox: !this.state.renderBox
      });
    }
  }

  renderTextArea() {
    if (this.state.renderBox) {
      return (
        <div style={{ width: "100%"}}>
          <div>Title:</div>
          <textarea style={{ width: "100%" }} 
                    className="calendar-title" 
                    onChange={this.props.titleChange} 
                    value={this.props.title}
          />
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%" }}>
          {`Title: ${this.props.title}`}
        </div>
      );
    }
  }

  render() {
    return (
      <div onClick={this.toggleRender} style={{ width: '70%', marginLeft: '15%', marginTop: '50px'}}>
        {this.renderTextArea()}
      </div>
    ); 
  } 

}