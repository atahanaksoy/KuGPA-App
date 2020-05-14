import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class modal extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Modal
        {...this.props}
        size={this.props.size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.username}</p>
          <p>{this.props.text1}</p>
          <p>{this.props.thanks}</p>
        </Modal.Body>
      </Modal>
    );
  }

}


export default modal;