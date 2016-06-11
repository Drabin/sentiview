import React from 'react';
import $ from 'jquery';

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
    var sessionId = this.props.session;
    var notes = this.props.notes;
    var sub = this.state.sub;
    var receiver = this.state.receiver;
    $.ajax({
          method:'POST',
          url: '/emailnotes',
          data: {       
            sessionId: sessionId,
            notes: notes,
            sub: sub,
            receiver: receiver
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
      <div>
        <h2 className="emailheader">Email notes</h2>
          <form action='' className="pure-form pure-form-aligned">
            <fieldset id="pure-form-group" className="pure-group">
              <div className="pure-control-group">
                  <label for="subject"></label>
                  <input id="subject" type="text" className="emailfeild"
                  placeholder="subject"
                  onChange={this.onReceiverChange.bind(this)}
                  value={ this.state.receiver }></input>
              </div>
              <div className="pure-control-group">
                  <input id="email" type="email" className="emailfeild"
                  placeholder="email to"
                  onChange={this.onSubjectChange.bind(this)}
                  value={this.state.sub}></input>
              </div>
            </fieldset>
            <button className="emailbutn" type='button' onClick={this.emailNotes.bind(this)} className="sendmailbtn">Send</button>
          </form>
      </div>
    )
  }


}







            //   <input type="text"  name='Subject'          
            //   onChange={this.onSubjectChange.bind(this)}
            //   value={this.state.sub} placeholder="Subject"></input>
            //   <input type="email"  name='To'
            //   onChange={this.onReceiverChange.bind(this)}
            //   value={this.state.receiver} placeholder="Email"></input>
            // </fieldset>
