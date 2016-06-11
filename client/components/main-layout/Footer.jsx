import React from 'react';
import ReactDom from 'react-dom';

export default class Footer extends React.Component { 
  render() {
    return (
      <div className="footer">
        <a href="https://github.com/crypticzoologists/sentiview/blob/master/README.md" className="footer-link">About</a>
        <a href="https://github.com/crypticzoologists/sentiview" target="_blank" className="footer-link">Github</a>
        <a href="https://github.com/crypticzoologists/sentiview/blob/master/LICENSE" target="_blank" className="footer-link">License</a>
        <a href="https://github.com/crypticzoologists/sentiview/blob/master/CONTRIBUTING.md" target="_blank" className="footer-link">Contribute</a>
      </div>
    )
  }
}