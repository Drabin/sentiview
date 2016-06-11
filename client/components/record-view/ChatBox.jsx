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
      sender: null,
      receiver: null, 
    };
  socket.on('message', function(data){
    this.getMessage(data.message);
  }.bind(this))
    this.saveTranscript = this.saveTranscript.bind(this)
    this.sendMessage = sendMessage.bind(this)
  }

  componentDidMount() {
      join(this.props.userId);
      this.getInterviewee()
      this.getUserNames();

  };
  getMessage(message){
      this.setState({
      transcript: this.state.transcript.concat([message])
    })
  }

  getInterviewee() {
    var sessionId = $(location).attr('href').split('/');
    $.ajax({
      method:'GET',
      url: '/interviewer/' + sessionId[sessionId.length - 1],
      success: function(data) {
        console.log('fetched interviewer----', data);
        this.setState({
          receiver: data
        })
      }.bind(this),
      error: function(error) {
        console.error('failed to get interviewer', error);
      },
      dataType: 'json'
    }); 
  }

  getUserNames() {
    $.ajax({
      method:'GET',
      url: '/usernames',
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
      dataType: 'json'
    });
  }
 
  onTranscriptChange(e){
    this.setState({
      transcriptPart: e.target.value
    });
  }

  

  sendTranscript(){
    console.log('SENDING TO_____', this.props.calledUser)
    console.log('SENDING FROM_____', this.props.userId)
    console.log('THIS---', this.state.sender);
   if(this.props.calledUser === null){
      var interviewee = this.state.receiver
      this.setState({
      transcriptPart: this.state.sender + ': ' + this.state.transcript
    })
      this.setState({ 
      transcript: this.state.transcript.concat([this.state.transcriptPart])
    })
    sendMessage(this.props.userId, interviewee, this.state.transcriptPart);
      this.setState({
        transcriptPart: ''
      })
   } else {
    this.setState({
      transcriptPart: this.state.sender + ': ' + this.state.transcript
    })
    this.setState({ 
        transcript: this.state.transcript.concat([this.state.transcriptPart])
    })
    sendMessage(this.props.userId, this.props.calledUser, this.state.transcriptPart);
    this.setState({
      transcriptPart: ''
    })
   }
    console.log('___________  ', this.state.transcript);
  }


  saveTranscript(){
    console.log('hey');
    console.log('---------------', this.props.currentSession)
    var formattedTran = this.state.transcript.join('+');
    console.log('------------',formattedTran);
    $.ajax({
      method:'POST',
      url: '/transcript',
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
        <div className="chatbox">
            {this.state.transcript.map(function(mes){
              return <div className="chatboxlist"> {mes} </div>; 
            })}
        </div>
        <div className="button-bar">        
            <input onChange={this.onTranscriptChange.bind(this)}
             type="text" value={this.state.transcriptPart}> 
            </input>
            <button onClick={this.sendTranscript.bind(this)} >send</button>
        </div>
        <div className="button-bar">
          <button className="stop-button pure-button pure-button-error" 
          onClick={(e) => {
            console.log(this);
            this.saveTranscript.bind(this); 
            this.props.clicked(e)}}>Stop</button>
        </div>
      </div>
    );
  };

}