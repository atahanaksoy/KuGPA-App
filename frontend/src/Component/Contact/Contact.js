import React from 'react';
import './Contact.css';
import ListGroup from 'react-bootstrap/ListGroup';
import MailForm from '../MailForm/MailForm';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false
        }

        this.props.handleState(true,false)
    }


    handleSubmit = () => {

        this.setState({
            submit: true
        })

    }



    render() {

        let screen;

        if (!this.state.submit) {
            screen = <MailForm id="mailForm" handleSubmit={this.handleSubmit}/>
        } else {
            screen = <p>Thanks for your feedback!</p>
        }



        return (
            <section id="CONTACT" >
                <div id="contactContainer" className="container">
                    <div className="row  rowElts">
                        <h1 id="headingTitle">Get In Touch</h1>
                    </div>
                    <div className="row rowElts">
                        <h4 id="headingSubtext">We love to hear from you. Just drop us a line for any questions or feedback!</h4>
                    </div>
                </div>
                    <div id="messageContainer" className="container">
                        <div className="rowElts row my-auto">
                            <div id="messageCol" className="col-lg-6 ">
                                <h4 id="containerTitle">Send us a Message</h4>
                                {screen}
                            </div>
                            <div id="contactCol" className="col-lg-6 ">
                                <h4 id="containerTitle">Contact</h4>
                                    <div id="developerData" className="row">
                                        <div id="iconCol" className="col-lg-2">
                                            <EmailOutlinedIcon fontSize="large" style={{marginBottom: "1.5rem"}}/>
                                        </div>
                                        <div  id="iconCol" className="col-lg-10">
                                            <p id="developerTitle">Barış Özcan</p>
                                            <p id="developerTitle">bozcan17@ku.edu.tr</p>
                                        </div>
                                    </div>
                                    <div id="developerData" className="row">
                                        <div id="iconCol" className="col-lg-2">
                                        </div>
                                        <div id="iconCol2" className="col-lg-10">
                                            <p id="developerTitle" >Atahan Aksoy</p>
                                            <p id="developerTitle">aaksoy17@ku.edu.tr</p>
                                        </div>
                                    </div>

                                    <div id="illustratorRow" className="row">
                                        <div id="iconCol" className="col-lg-2">
                                            <PaletteOutlinedIcon fontSize="large" style={{marginBottom: "1.5rem"}}/>
                                        </div>
                                        <div id="iconCol" className="col-lg-10">
                                            <p id="developerTitle">Illustrations: <a target="_blank"  href="https://www.instagram.com/ddkstyle/">@ddkstyle</a></p>
                                            <p id="developerTitle">UI Design: Esin Özcan</p>
                                        </div>
                                    </div>

                            </div>
                        </div>
                    </div>
            </section>

        );
    }
}

export default Contact;