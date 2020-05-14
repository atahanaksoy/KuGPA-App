import React from 'react';
import './Jumbotron.css';
import Jumbotron from 'react-bootstrap/Jumbotron'


const jumbotron = (props) => {




    return (
        <div>
            <Jumbotron>
                <h1>Welcome to KuGPA!</h1>
                <p>
                    Calculate your GPA and SPA by entering your KUSIS credentials.
                </p>
            </Jumbotron>
        </div>

    );
}


export default jumbotron;

