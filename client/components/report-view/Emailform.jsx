import React from 'react';
import $ from 'jquery';

export default class Emailform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sub: '',
      receiver: '',
      showConfirmMes: false

    }
  }
  onSubjectChange(e){
    this.setState({
      sub: e.target.value
    })
  } 
  onReceiverChange(e){
    console.log(this.state.receiver)
    this.setState({
      receiver: e.target.value
    })
  }  

  displayConfirm(){
    console.log('in here')
    this.setState({
      showConfirmMes: true
    }, function(){
      console.log('in the next one')
      setTimeout(function(){
      console.log('in the last one')
        this.setState({
          showConfirmMes: false 
        })
      }.bind(this),2000)
    }.bind(this))
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
            this.displayConfirm();
          }.bind(this),
          error: function(error) {
            console.error('Email failed', error);
          },
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
                  onChange={this.onSubjectChange.bind(this)}
                  value={ this.state.sub }></input>
              </div>
              <div className="pure-control-group">
                  <input id="email" type="email" className="emailfeild"
                  placeholder="email to"
                  onChange={this.onReceiverChange.bind(this)}
                  value={ this.state.receiver }></input>
              </div>
            </fieldset>
            <button className="emailbutn" type='button' onClick={this.emailNotes.bind(this)} className="sendmailbtn">Send</button>
          </form>
          { this.state.showConfirmMes ? <div className="conformationmsg">Sent</div> : null }
      </div>
    )
  }


}

