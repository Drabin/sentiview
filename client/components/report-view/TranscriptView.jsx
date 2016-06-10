import React from 'react';
import $ from 'jquery';

export default class SessionTranscript extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transcriptArray: null,
		};
	
	}
	componentDidMount() {
		console.log('hello');
		this.getTranscript(function(data) {
			this.setState({
				transcriptArray: data.transcript
			})
		})
		console.log(this.state.currentUser);
	}


	getTranscript(callback) {
		var sessionId = $(location).attr('href').split('/');
	  	$.ajax({
			methond:'GET',
			url: '/transcript/' + sessionId[sessionId.length - 1],
			success: function(data){
				console.log(data.transcript);

			},
			error: function(error) {
				console.error(' loading transcript Error', error);
			},
			datatype: 'json'
		})
	
	}
	

	render() {
		return (
		<div>
		  hello
		</div>	
		)
	}




}

