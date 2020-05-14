import React from 'react'
import Form from '../Form/Form';
import axios from 'axios';
import Logo from '../../Assets/logo.png';
import LoadingScreen from 'react-loading-screen';
import CourseList from '../CourseList/CourseList';
import pablo from '../../Assets/pablo-education.png';
import Modal from '../Modal/Modal';


class login extends React.Component {
    constructor() {
        super();
        this.state = {
            done: false,
            valid: true,
            loading: true,
            id: "",
            pw: "",
            name: "",
            previousCredits: 0,
            previousCourses: {},
            currentGradedCourses: {},
            lastTerm: "",
            currentCourses: {},
            courses: [],
            courseID: 0,
            courseName: '',
            courseCredits: 0,
            courseGrade: 0,
            courseTakenGrade: 0,
            editCourse: false,
            guestMode: false,
            showModal: false
        };

        this.updateDoneStatus = this.updateDoneStatus.bind(this)
        this.updateID = this.updateID.bind(this)
        this.updatePW = this.updatePW.bind(this)
        this.setModal = this.setModal.bind(this)
    }

    setModal = (boolean) => {

        this.setState({
          showModal: boolean
        })
    
      }

    updateDoneStatus = () => {
        this.setState({
            done: true
        })

        this.setState({ loading: true })

        axios.post("https://kugpa-final-backend.herokuapp.com/login", { withCredentials: true }, {
            data: {
                id: this.state.id,
                pw: this.state.pw
            }
        }).then(res => {
            const name = res.data['name'];
            const previousCredits = res.data['credits'];
            const currentCourses = res.data['currentCourses'];
            const currentGradedCourses = res.data['currentGradedCourses'];
            const lastTerm = res.data['lastTerm'];
            const previousCourses = res.data['previousCourses'];

            this.setState({
                lastTerm: lastTerm,
                currentGradedCourses: currentGradedCourses,
                currentCourses: currentCourses,
                previousCredits: previousCredits,
                name: name,
                loading: false,
                previousCourses: previousCourses
            })

            this.props.handleState(this.state.loading, this.state.done)

        }).catch(e => {
            console.log(e);
        })
        

    };

    updateID = (newID) => {
        this.setState({
            id: newID
        })

    };


    updatePW = (newPW) => {
        this.setState({
            pw: newPW
        })
    };


    loginAsGuest = () => {
        this.setState({
            lastTerm: "",
            currentGradedCourses: {},
            currentCourses: {},
            previousCredits: 0,
            name: "Guest",
            loading: false,
            done: true,
            previousCourses: {},
            guestMode: true
        })
        this.props.handleState(false, true)
    }



    render() {


        let screen;
        let style = {
            height: "inherit",
        }

        if (!this.state.loading) {
            style = {
                height: "inherit"
            }
        }

        if (this.state.done && this.state.name != "error") {

            this.state.id = "";
            this.state.pw = "";

            screen =
                <div className="col-lg-12 mx-auto my-auto" >
                    <LoadingScreen
                        loading={this.state.loading}
                        spinnerColor='#ff1e56'
                        bgColor='transparent!important'
                        textColor='#2b2319'
                        logoSrc={Logo}>
                        {!this.state.loading ? <CourseList previousCourses={this.state.previousCourses}
                            previousCredits={this.state.previousCredits}
                            name={this.state.name}
                            currentCourses={this.state.currentCourses}
                            currentGradedCourses={this.state.currentGradedCourses}
                            lastTerm={this.state.lastTerm}
                            loading={this.state.loading}
                            guestMode={this.state.guestMode} /> : <div></div>}
                    </LoadingScreen>
                </div>

        } else if (this.state.done && this.state.name == "error") {       //YANLIS GIRIS 1-

            this.setState({ done: false })
            this.setState({ name: "" })
            this.setState({ valid: false })

        } else if (!this.state.done && this.state.name == "") {              //YANLIS GIRIS 2-
            if (this.state.valid == false) {

                screen =
                    <div id="loginScreen" className="row align-items-center">
                        <div className="col-lg-6 col-md-4">
                            <img id="pablo" className="img-fluid" src={pablo} />
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <LoadingScreen
                                loading={this.state.loading}
                                spinnerColor='#ff1e56'
                                bgColor='transparent!important'
                                textColor='#2b2319'
                                logoSrc={Logo}>
                                <Form
                                    setModal = {this.setModal}
                                    updateID={this.updateID}
                                    updatePW={this.updatePW}
                                    updateDoneStatus={this.updateDoneStatus}
                                    text="Incorrect ID or Password"
                                    loginAsGuest={this.loginAsGuest}
                                />
                            </LoadingScreen>
                        </div>
                    </div>

            } else {                   
              
                //DEFAULT GIRIŞ
                screen =
                    <div id="loginScreen" className="row align-items-center ">
                        <div className="col-lg-6 col-md-4">
                            <img id="pablo" className="img-fluid" src={pablo} />
                        </div>

                        <div id="loginForm" className="col-lg-4 col-md-12">
                            <Form
                                setModal = {this.setModal}
                                updateID={this.updateID}
                                updatePW={this.updatePW}
                                updateDoneStatus={this.updateDoneStatus}
                                loginAsGuest={this.loginAsGuest}
                            />
                        </div>

                    </div>


            }

        }

        return (

            <section className="" id="KUGPA" style={style}>
            <Modal
              size = "lg"
              title= "Continuing as a guest"
              text1 = "If you login with your KUSIS credentials, you'll be able to add the courses you are currently enrolled quickly and you'll start with your current GPA and credits on KUSIS. Otherwise, you'll start adding courses from scratch."
              show={this.state.showModal}
              onHide={() => this.setModal(false)}/
            >
                <div>
                    {screen}
                </div>
            </section>

        );
    }





}
export default login;