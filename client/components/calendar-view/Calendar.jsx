import React, { Component, PropType } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import $ from 'jquery';
import Modal from 'react-modal';
import Popup from './Popup.jsx';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

export default class Calendar extends Component {


  constructor(props) {
    super(props, {
    userId: 1,
    events: []} );
    this.state = {
      events: [{
        start: new Date(2016, 5, 9, 0, 0, 0),
        end: new Date(2016, 5, 9, 1, 0, 0),
        title: 'test event'

      }],
      currentSlot: null,
      title: '',
      modalIsOpen: false,
      editing: false
    };
    this.titleChange = this.titleChange.bind(this);
    this.modalSubmit = this.modalSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editSlot = this.editSlot.bind(this);
    this.findEvent = this.findEvent.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }
  getEvents() {
    $.get('/events', events => {
      events.forEach(event => this.datify(event));
      this.setState({ events });
    });
  }

  deleteEvent(event) {
    event = Object.assign({}, this.state.currentSlot);
    if (!event) return;
    event.delete = true;
    $.post('/events',
            { event },
            event => console.log('deleted'));

    var i = this.findEvent(event);
    this.setState({
      events: this.state.events.slice(0, i).concat(this.state.events.slice(i+1))
    });
    this.closeModal();

  }

  findEvent(event) {
    for (var i = 0; i < this.state.events.length; i++) {
      if (this.state.events[i].start.toString() === event.start.toString() &&
          this.state.events[i].end.toString() === event.end.toString() &&
          this.state.events[i].title === event.title) break;
    }
    return i;
  }
  addEvent(event) {
    $.post('/events',
            { event },
            event => {
              this.datify(event);
              this.setState({
                events: this.state.events.concat(event),
                title: '',
                currentSlot: null,
                modalIsOpen: false
              });
            }
          );
  }

  titleChange(e) {
    this.setState({ title: e.target.value });
  }

  datify(event) {
    event.start = new Date(event.start);
    event.end = new Date(event.end);
  }
  modalSubmit() {
    if (this.state.currentSlot) {
      var currentSlot = Object.assign({}, this.state.currentSlot);
      currentSlot.title = this.state.title;
      this.addEvent(currentSlot);
    }
  }

  editSlot(event) {
    this.setState({
      editing: true,
      modalIsOpen: true,
      currentSlot: event,
      title: event.title
    }); 
  }

  editSubmit() {
    if (this.state.currentSlot) {
      var event = Object.assign({}, this.state.currentSlot); 
      event.title = this.state.title;
      $.post('/events',
              { event },
              event => {
                var i = this.findEvent(this.state.currentSlot);
                this.datify(event);
                this.setState({
                  events: this.state.events.slice(0, i).concat(this.state.events.slice(i+1)).concat(event),
                });
                this.closeModal();
              }
            );
    }
  }

  openModal(slotInfo) {
    console.log(this.state.currentSlot);
    this.setState({ 
      modalIsOpen: true,
      currentSlot: slotInfo,
    });
  }

  closeModal() {
    if (this.state.modalIsOpen) {
      this.setState({ 
        modalIsOpen: false,
        currentSlot: null,
        title: '',
        editing: false
      });
    }
  }
  render() {

    return (
      <div className='big-calendar'>
        <BigCalendar
          selectable
          events={this.state.events}
          defaultView='week'
          defaultDate={new Date()}
          onSelectEvent={event => this.editSlot(event)}
          onSelectSlot={ slotInfo => this.openModal(slotInfo) }
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}>
          <Popup 
            editing={this.state.editing}
            currentSlot={this.state.currentSlot}
            titleChange={this.titleChange}
            title={this.state.title}
            modalSubmit={this.modalSubmit} 
            closeModal={this.closeModal}
            editSubmit={this.editSubmit}
            deleteEvent={this.deleteEvent}
          />
        </Modal>
      </div>
    );
  }



} 

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '40%',
    height                : '30%'
  },
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  }
};

            // editSubmit={this.editSubmit}
            // deleteEvent={this.deleteEvent}