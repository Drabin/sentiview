import React from 'react';
import $ from 'jquery';

export default class SessionTranscript extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUserId: null,
			showSavedNotes: false,
			notes: null,
		};
		this.keyPress = this.keyPress.bind(this);
	}

	componentDidMount() {
      this._getUserId();
      this.getSavedNotes();
    }

	onNotesChange(e){
		this.setState({
			notes: e.target.value
		});
		
	}

	keyPress(e){
		if(e.key === 'Enter'){			
		  this.setState({
		  })
		}	
	}
    _getUserId() {
	    $.ajax({
	      type: 'GET',
	      url: '/api/users',
	      success: function(currentUser) {
	        this.setState({
	          currentUserId: currentUser.id
	          });
	        console.log(this.state.currentUserId);
	        }.bind(this),
	        error: function(error) {
	          console.error('Error getting user', error);
	        }
	    })
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
		var userId = this.state.currentUserID;
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

	render(){
		return (
			<div>
			  <span className="savednote">Notes saved!</span>
			  <textarea rows="30" cols="100"// value={this.state.notes}
              value={this.state.notes}
			  onChange={this.onNotesChange.bind(this)}
			  onKeyPress={(e) => this.keyPress(e)}>
			  </textarea>
			<span>  
			  <button onClick={this.saveNotes.bind(this)}>Save Notes</button>
			</span>  
			</div>
		)
	}
}