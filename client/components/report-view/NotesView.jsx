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
		      success: function() {
		        console.log('posted notes');
		      },
		      error: function(error) {
		        console.error('posting notes error', error);
		      },
		      dataType: 'json'
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
			  <span> <button onClick={this.toggleEmailForm.bind(this)}>Email notes</button>
			  	{ this.state.showEmailForm ? < Emailform session={this.props.sessionId} notes={this.state.notes}/> : null}
			  </span>
			  <span className="savednote">Notes saved!</span>
			  <textarea rows="30" cols="100"
              value={this.state.notes}
			  onChange={this.onNotesChange.bind(this)}>
			  </textarea>
			<span>  
			  <button onClick={this.saveNotes.bind(this)}>Save Notes</button>
			</span>  
			</div>
		)
	}
}