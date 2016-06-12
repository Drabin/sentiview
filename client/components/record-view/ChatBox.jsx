import React from 'react';
import ReactDom from 'react-dom';
import { socket, join, sendMessage } from '../../Sockets.js';
import $ from 'jquery';


export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: [],
      transcriptPart: '',
      sessionInfo: null 
    };
  socket.on('message', function(data){
    this.getMessage(data.message);
  }.bind(this))
    this.saveTranscript = this.saveTranscript.bind(this)
    this.sessionInfo = this.sessionInfo.bind(this)
    this.sendMessage = sendMessage.bind(this)
  }

  componentDidMount() {
      join(this.props.userId);
      this.sessionInfo()
      this.getUserNames();   

  };
  getMessage(message){
      this.setState({
      transcript: this.state.transcript.concat([message])
    })
  }

  sessionInfo() {  
    $.ajax({
      method:'GET',
      url: '/api/sessionInfo',
      data: {
        sessionId : this.props.currentSession
      },
      success: function(data) {
        console.log('fetched sessionInfo----', data);
        this.setState({
          sessionInfo: data
        })
      }.bind(this),
      error: function(error) {
        console.error('failed to get sessionInfo', error);
      },
      dataType: 'json',
    }); 
  }

  getUserNames() {
    $.ajax({
      method:'GET',
      url: '/api/usernames',
      data: {
        sender: this.props.userId,
      },
      success: function(data) {
        console.log('fetched name----', data);
        this.setState({
          sender: data
        })
      }.bind(this),
      error: function(error) {
        console.error('failed to get name', error);
      },
    });
  }
 
  onTranscriptChange(e){
    this.setState({
      transcriptPart: e.target.value
    });
  }
  onEnterPress(e){
    console.log(e.keyCode)
    if (e.keyCode == 13) {
        console.log('TRUE')
        this.sendTranscript().bind(this);
      }
  }
  

  sendTranscript(){
    console.log(this.state.sessionInfo)
    var personCalling = this.props.userId;
    var personCalled;
    if(personCalling === this.state.sessionInfo.interviewee){
      personCalled = this.state.sessionInfo.interviewer
    } else {
      personCalled = this.state.sessionInfo.interviewee
    }
    this.setState({ 
      transcript: this.state.transcript.concat(this.state.sender + ': ' + this.state.transcriptPart)
    }, function(){      
    sendMessage(this.props.userId, personCalled, this.state.sender + ': ' + this.state.transcriptPart);
      this.setState({
        transcriptPart: ''
      })
    }.bind(this))
   } 


  saveTranscript(){
    console.log('---------------', this.props.currentSession)
    var formattedTran = this.state.transcript.join('+');
    console.log('------------',formattedTran);
    $.ajax({
      method:'POST',
      url: '/api/transcript',
      data: {       
        session: this.props.currentSession,
        transcript: formattedTran,
      },
      success: function() {
        console.log('posted transcript');
      },
      error: function(error) {
        console.error('posting transcript error', error);
      },
      dataType: 'json'
    });
  }


  render(){
    return (
      <div className="record-questions pure-u-1-1">
        <div ref="chat" className="chatbox">
            {this.state.transcript.map(function(mes){
              return <div className="chatboxlist"> {mes} </div>; 
            })}
        </div>
        <div className="button-bar">        
          <div>
            <input className="mesinput"
            onKeyDown={this.onEnterPress.bind(this)}
            onChange={this.onTranscriptChange.bind(this)}
             type="text" value={this.state.transcriptPart}> 
            </input>
          </div>  
            <button className="sendbtn" onClick={this.sendTranscript.bind(this)} >send</button>
        </div>
        <div className="button-bar">
          <button className="stop-button pure-button pure-button-error" 
          onClick={(e) => {
            this.saveTranscript(); 
            this.props.clicked(e)}}>Stop</button>
        </div>
      </div>
    );
  };

}