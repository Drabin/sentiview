import React from 'react';
import $ from 'jquery';
import Emailform from './Emailform.jsx'

export default class SessionTranscript extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transcriptArray: [],
		};
	
	}
	componentDidMount() {
		console.log('hello');
		this.getTranscript()

	}


	getTranscript() {
		var sessionId = $(location).attr('href').split('/');
	  	$.ajax({
			methond:'GET',
			url: '/api/transcript/' + sessionId[sessionId.length - 1],
			success: function(data){
				var temp = data.split('+')
				this.setState({					
				  transcriptArray: temp
				})
			}.bind(this),
			error: function(error) {
				console.error(' loading transcript Error', error);
			},
			datatype: 'json'
		})	
	}
	
	render() {
		return (
		<div>
		  <div>
		    {this.state.transcriptArray.map( function(mes){
		  	  return <div> {mes} </div>
			})
		   }
		  </div>
		</div>	
		)
	}




}

