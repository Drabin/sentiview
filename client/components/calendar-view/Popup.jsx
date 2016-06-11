import React from 'react';
import TextArea from './TextArea.jsx';

export default props => {
  return (
    <div>
      <div onClick={props.closeModal} style={{ position: 'absolute', right: '5px', top: '5px', fontSize: '20px', cursor: 'pointer'}}>
        X
      </div>
      <div>{props.currentSlot ? `Start: ${props.currentSlot.start}` : ''}</div>
      <div>{props.currentSlot ? `End: ${props.currentSlot.end}` : ''}</div>
      <TextArea titleChange={props.titleChange}
                title={props.title}
                editing={props.editing} />

      {(function() {
        if (props.editing) {
          return (
            <div>
              <button style={{ width: '20%', margin: '10px'}} onClick={props.editSubmit}>Save</button>
              <button style={{ width: '20%', margin: '10px'}} onClick={props.deleteEvent}>Delete</button>
            </div>
          );
        } else {
          return <button onClick={props.modalSubmit}>Submit</button>;
        }
      })()}

    </div>
  );
};