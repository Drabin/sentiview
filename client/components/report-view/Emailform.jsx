import React from 'react';


export default class Emailform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sub: '',
      receiver: '',
    }
  }
  onSubjectChange(e){
    this.setState({
      sub: e.target.value
    })
  } 
  onReceiverChange(e){
    this.setState({
      receiver: e.target.value
    })
  }  


  emailNotes() {
    
    var emailInfo = {
      notes: this.props.notes,
      sub: this.state.sub,
      sender: this.state.sender,
      receiver: this.state.receiver,
    }
    $.ajax({
          method:'POST',
          url: '/emailnotes',
          data: {       
            notes: emailInfo.notes,
            sub: emailnotes.sub,
            sender: emailnotes.sub,
            receiver: emailnotes.receiver
          },
          success: function() {
            console.log('Email sent');
          },
          error: function(error) {
            console.error('Email failed', error);
          },
          dataType: 'json'
      });   
  }

  render(){
    return (
      <div className="record-instructions pure-u-1-1">
        <h2>Email notes</h2>
          <form action='' className="pure-form">
            <fieldset id="pure-form-group" className="pure-group">
              <input type="text"  name='Subject'
              onChange={this.onSubjectChange.bind(this)}
              value={this.state.sub} placeholder="Subject"></input>
              <input type="email"  name='To'
              onChange={this.onReceiverChange.bind(this)}
              value={this.state.receiver} placeholder="Email"></input>
            </fieldset>

            <button type='button' onClick={this.emailNotes.bind(this)} className="record-form-button pure-button pure-input-1-2 pure-button-primary">Send</button>
          </form>
      </div>
    )
  }



}

