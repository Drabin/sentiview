import React from 'react';
import $ from 'jquery';
import Emailform from './Emailform.jsx'

export default class SessionTranscript extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUserId: null,
			showEmailForm: false,
			showSavedNotes: false,
			showConfirmMes: false,
			notes: '',
		};
		this.getSavedNotes = this.getSavedNotes.bind(this);
	}

	componentDidMount() {     	
        this.getSavedNotes();

    }

	onNotesChange(e){
		this.setState({
			notes: e.target.value
		});		
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

    getSavedNotes() {
    	var sessionId = $(location).attr('href').split('/');
    	$.ajax({
    		type: 'GET',
    		url: '/notes/' + sessionId[sessionId.length - 1],
    		success: function(notesData) {
	    	  this.setState({
	    		notes: notesData
		        });	
    		}.bind(this),
    		error: function(error) {
	          console.error('Error getting notes', error);
	        }
    	})
    }

	saveNotes(){
		var sessionId = $(location).attr('href').split('/');
		var notes = this.state.notes;
		$.ajax({
		      method:'POST',
		      url: '/notes',
		      data: {       
		        session: sessionId[sessionId.length - 1],
		        notes: notes,
		      },
		      success: function(data) {
		        console.log('posted notes');
		        this.displayConfirm()
		      }.bind(this),
		      error: function(error) {
		        console.error('posting notes error', error);
		      },
	    });
	}

	toggleEmailForm(){
      if(this.state.showEmailForm){
        this.setState({
          showEmailForm: false
        })
      } else {
        this.setState({
          showEmailForm: true
        })
      }
    }

	render(){
		return (
			<div>
			  <span className="notes-area">
				  <textarea ref="note"  rows="30" cols="100"
	              value={this.state.notes}
				  onChange={this.onNotesChange.bind(this)}>
				  </textarea>
			  </span>
				{ this.state.showConfirmMes ? <div className="conformationmsg">Notes saved</div> : null }
				<div>
			  <span>  
			    <button className="savenotebtn" 
			    onClick={this.saveNotes.bind(this)}>Save Notes</button>
			  </span>  
			  <span> <button className="sendemailbtn"
			  onClick={this.toggleEmailForm.bind(this)}>Email notes</button>
			  	{ this.state.showEmailForm ? < Emailform session={this.props.sessionId} notes={this.state.notes}/> : null}
			  </span>
			  </div>
			</div>
		)
	}
}