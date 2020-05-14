import React from 'react';
import './MailForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import emailjs from 'emailjs-com';


class MailForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }


    }


    sendEmail = (e) => {
        e.preventDefault()
        
        emailjs.sendForm('contact_service', 'template_oGSHAxN4', e.target, 'user_RGNti0h7sOJ2ACGMTTQwN')
        .then((result) => {
            this.props.handleSubmit()
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

    }



    render() {

        return (
                    <Form method="post" onSubmit={(e) => this.sendEmail(e)}>

                            <div  className="row">
                                <div  className="col-lg-12">
                                <Form.Group>
                                        <input className="form-control mailInput" type="text" placeholder="Name" name="user_name" />
                                </Form.Group>
                                </div>
                                <div className="col-lg-12">
                                <Form.Group>
                                        <input className="form-control mailInput" type="email" placeholder="Email Address" name="user_email" />
                                </Form.Group>
                                </div>
                                <div className="col-lg-12">
                                <Form.Group>
                                        <textarea className="form-control mailInput" rows="8" name="message" placeholder="Message"/>
                                </Form.Group>
                                </div>
                                <div className="col-lg-12">
                                    <Button id="sendFormButton" className="btn btn-block" type="submit">Send</Button>
                                </div>
                            </div>
                            

                        </Form> 
        );
    }
}

export default MailForm;