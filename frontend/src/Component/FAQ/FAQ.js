import React from 'react';
import './FAQ.css';
import AnimateHeight from 'react-animate-height';
import KocGirl from '../../Assets/faq.png'

class faq extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ["#32292F", "#32292F", "#32292F", "#32292F"],
            height: [0, 0, 0, 0],
            icon: ["fa fa-chevron-down", "fa fa-chevron-down", "fa fa-chevron-down", "fa fa-chevron-down"],
            key: -1,
            Q2: "Why do you need my KUSIS credentials?",
            Q3: "Do you store any of my information?",
            Q4: "How do you calculate the SPA&GPA?",
            answerToQ2: "It's just for your convenience! From KUSIS we get all of the courses you've taken/currently taking so that you don't have to add each course one by one.",
            answerToQ3: "None of your data including your ID and password is stored in our system.",
            answerToQ4: "Semester point average (SPA) is calculated by multiplying each course's credits by its grade and by dividing the sum of these numbers by total numbers of credits taken. For SPA, we only consider the courses you add for that semester. Grade point average (GPA) is calculated in the same way for all semesters. For GPA, we are also taking account of the courses you took in the previous semesters by getting related data from your KUSIS."
        }
        this.props.handleState(true,false)

    }

    setText = (key) => {

        if (this.state.height[key] === 0) {
            this.state.height[key] = "auto";
        } else {
            this.state.height[key] = 0;
        }

        this.setState({
            key: key
        })
    }

    setIcon = (key) => {

        if (this.state.icon[key] == "fa fa-chevron-down") {
            this.state.icon[key] = "fa fa-chevron-up";
        } else {
            this.state.icon[key] = "fa fa-chevron-down";
        }

    }

    setColor = (key) => {

        if (this.state.color[key] == "#32292F") {
            this.state.color[key] = "#4E44FE";
        } else {
            this.state.color[key] = "#32292F";
        }

    }

    change = (index) => {
        this.setText(index);
        this.setIcon(index);
        this.setColor(index);
    }


    render() {

        return (
            <section  id="ABOUT">
                <div id="aboutItems" className="row ">
                    <div id="aboutItemsCol" className="col-lg-6 col-md-12">
                        <div  className="container">
                            <div className="container">
                            <h1 id="FAQ">Frequently Asked Questions</h1>



                                <div className="questionBox row align-items-center" style={{ backgroundColor: this.state.color[1], transition: "0.3s ease" }} onClick={() => this.change("1")}>
                                    <div className="col-lg-12">
                                        <h3 className="question">{this.state.Q2}<i className={this.state.icon[1]}></i></h3>
                                        <AnimateHeight height={this.state.height[1]} className="AnimateHeight">
                                            <p id="answer">{this.state.answerToQ2}</p>
                                        </AnimateHeight>

                                    </div>
                                </div>

                                <div className="questionBox row align-items-center" style={{ backgroundColor: this.state.color[2], transition: "0.3s ease" }} onClick={() => this.change("2")}>
                                    <div className="col-lg-12">
                                        <h3 className="question">{this.state.Q3}<i className={this.state.icon[2]}></i></h3>
                                        <AnimateHeight height={this.state.height[2]} className="AnimateHeight">
                                            <p id="answer">{this.state.answerToQ3}</p>
                                        </AnimateHeight>
                                    </div>
                                </div>

                                <div className="questionBox row align-items-center" style={{ backgroundColor: this.state.color[3], transition: "0.3s ease" }} onClick={() => this.change("3")}>
                                    <div className="col-lg-12">
                                        <h3 className="question">{this.state.Q4}<i className={this.state.icon[3]}></i></h3>
                                        <AnimateHeight height={this.state.height[3]} className="AnimateHeight">
                                            <p id="answer">{this.state.answerToQ4}</p>
                                        </AnimateHeight>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="col-lg-6 col-md-4 col-sm-6">
                        <img id="KocGirl" className="img-fluid" src={KocGirl}></img>
                    </div>
                </div>
            </section>




        );
    }
}

export default faq;