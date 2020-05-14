import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import './Form.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Jumbotron from '../Jumbotron/Jumbotron';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }





  render() {
    return (


      <div id="formElements" className="card card-body my-3">




        <Form >
          <div className="row align-items-center">
            <div className="col-lg-12">
              <Jumbotron />
              <p  id="wrongInputText">{this.props.text}</p>
            </div>
          </div>
          <div className="col-lg-12">
            <InputGroup className="inputs">
              <InputGroup.Prepend id="formIcons">
                <InputGroup.Text>
                  <i className="fa fa-user"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <input
                name="username"
                type="text"
                className="form-control mb-4 form-control-lg"
                placeholder="KUSIS ID"
                onChange={(e) => this.props.updateID(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="col-lg-12">
            <InputGroup className="inputs">
              <InputGroup.Prepend id="formIcons">
                <InputGroup.Text>
                  <i className="fa fa-lock"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <input
                name="pw"
                type="password"
                className="form-control mb-4 form-control-lg"
                placeholder="Password"
                onChange={(e) => this.props.updatePW(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="col-lg-12">
            <button id="formButton" onClick={this.props.updateDoneStatus} className="btn btn-primary btn-block my-4" type="submit">Log In</button>
            <p className="text-muted">
              Your ID and Password won't be saved for security purposes.
            </p>
          </div>
          <div className="col-lg-12 ">
             <p id="guestLoginButton">
                <span onClick={() => this.props.loginAsGuest()}>Continue as a Guest</span>
                <InfoOutlinedIcon onClick={() => this.props.setModal(true)} id="guestQuestionButton"/>
              </p>
            </div>
        </Form>
      </div>
    );
  }


}

export default form;

