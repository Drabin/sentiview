import React from 'react';
import $ from 'jquery';

export default class SessionTranscript extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: '',
			showSavedNotes: false
		};
		this.keyPress = this.keyPress.bind(this);
	}

	onNotesChange(e){
		this.setState({
			notes: e.target.value
		});
		
	}

	keyPress(e){
		if(e.key === 'Enter'){			
		this.setState({
			notes: this.state.notes + 'f'
		})
		}	console.log(this.state.notes)
	}

	saveNotes(){
		var sessionId = $(location).attr('href').split('/');
		var notes = this.state.notes;
	    console.log('-------',notes);

		$.ajax({
	      method:'POST',
	      url: '/notes',
	      data: {       
	        session: sessionId[sessionId - 1],
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
			  <span>hello</span>
			  <textarea rows="30" cols="100"// value={this.state.notes}
			  onChange={this.onNotesChange.bind(this)}
			  onKeyPress={e => this.keyPress(e)}>
			  </textarea>
			<span>  
			  <button onClick={this.saveNotes.bind(this)}>Save Notes</button>
			</span>  
			</div>
		)
	}
}