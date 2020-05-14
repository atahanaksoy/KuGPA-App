import React, { Component, } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import './LectureInput.css';
import Modal from '../Modal/Modal';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


class lectureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomLecture: "",
      lectures: ["e.g ECON100", "e.g MATH101", "e.g COMP130", "e.g ACWR1O1", "e.g HIST300"
        , "e.g TURK100", "e.g PHYS101", "e.g ELEC204", "e.g ENGR400", "e.g COMP305"
        , "e.g ACCT201", "e.g MKTG201", "e.g ASIU102"],
      checked: false,
      grade: "",
      takenGrade: "",
      credit: 0,
      showModal: false,
      semester: "",
      buttonID: "insertButton"
    };
    this.handleCheck = this.handleCheck.bind(this)
    this.clicked = this.clicked.bind(this)
  }



  componentDidMount() {
    var randIndex = Math.floor(Math.random() * (this.state.lectures.length))
    var randLecture = this.state.lectures[randIndex]
    this.setState({ randomLecture: randLecture })

  }


  getInitialState() {
    return { checked: true }
  }

  handleCheck() {
    this.setState({ checked: !this.state.checked })
  }

  handleDeleteSemester(x) {
    this.setState({ semester: x })
  }

  setDefaultValues() {
    this.setState({
      checked: false,
      grade: "",
      takenGrade: "",
      credit: 0
    })
  }

  handleSemester = (semester) => {
    this.setState({
      semester: semester,
      buttonID: "insertButton"
    })
  }

  handleGrade = (grade) => {

    this.setState({
      grade: grade,
      buttonID: "insertButton"
    })

  }

  handleTakenGrade = (takenGrade) => {

    this.setState({
      takenGrade: takenGrade,
      buttonID: "insertButton"
    })

  }

  handleCredit = (credit) => {

    this.setState({
      credit: credit,
      buttonID: "insertButton"
    })

  }

  gradeToNumber = (str) => {

    switch (str) {
      case "A+":
        return 4;
      case "A":
        return 4;
      case "A-":
        return 3.7;
      case "B+":
        return 3.3;
      case "B":
        return 3;
      case "B-":
        return 2.7;
      case "C+":
        return 2.3;
      case "C":
        return 2;
      case "C-":
        return 1.7;
      case "D+":
        return 1.3;
      case "D":
        return 1;
      case "S":
        return 0.000000001;
      default:
        return 0;
    }

  }

  setModal = (boolean) => {

    this.setState({
      showModal: boolean
    })

  }

  clicked = () => {

    this.state.buttonID = "insertButton";
    this.forceUpdate()
    
    if (this.state.grade == "") {
      document.getElementById("lectureGradeField").style["border"] = "1px solid #ff1e56";
    }

    if (this.props.courseCredit == 0) {
      document.getElementById("lectureCreditField").style["border"] = "1px solid #ff1e56";
    }

    if (this.state.checked && this.state.takenGrade == "") {
      document.getElementById("lecturePreviousGradeField").style["border"] = "1px solid #ff1e56";
    }

    if (this.state.currentSemester == "") {
      document.getElementById("lectureSemesterField").style["border"] = "1px solid #ff1e56";
    }
    if (this.state.currentSemester != "" && this.state.grade != "" && this.props.courseCredit != 0 && ((this.state.checked && this.state.takenGrade != "") || !this.state.checked)) {

      if (this.state.checked && (this.gradeToNumber(this.state.takenGrade) >= this.gradeToNumber(this.state.grade))) {
        this.setModal(true);
      }

      if (this.state.checked && (this.gradeToNumber(this.state.takenGrade) < this.gradeToNumber(this.state.grade))) {
        this.props.createCourse()
        this.state.buttonID = "insertButtonSuccess"
      } else if (!this.state.checked) {
        this.props.createCourse()
        this.state.buttonID = "insertButtonSuccess"
      }
    }
  }

  handleTakenChanges = (e) => {
    this.handleTakenGrade(e);
    this.props.handleCourseTakenGrade(e);
  }


  handleGradeChanges = (e) => {
    this.handleGrade(e);
    this.props.handleCourseGrade(e);
  }


  handleCreditChanges = (e) => {
    this.handleCredit(e);
    this.props.handleCourseCredit(e);
  }

  handleSemesterChanges = (e) => {
    this.handleSemester(e);
    this.props.handleCourseSemester(e);
  }



  render() {

    let screen;



    if (this.state.checked) {
      screen =
        <div className="col-lg-12">
          <Form.Group controlId="formGrade">
            <Form.Label>Previous Grade <span className="text-muted">(Required)</span></Form.Label>
            <Form.Control
              id="lecturePreviousGradeField"
              as="select"
              onChange={(e) => this.handleTakenChanges(e.target.value)}
              className="form-control-lg"
            >
              <option value="" selected disabled hidden>Select Grade</option>
              <option>A+</option>
              <option>A</option>
              <option>A-</option>
              <option>B+</option>
              <option>B</option>
              <option>B-</option>
              <option>C+</option>
              <option>C</option>
              <option>C-</option>
              <option>D+</option>
              <option>D</option>
              <option>F</option>
              <option>S</option>
            </Form.Control>
          </Form.Group>
        </div>

    }


    return (

      <div id="LectureForm">
        <Form onSubmit={this.props.handleSubmit}>

          <Modal
            size="lg"
            title= "Course can't be added"
            text1="You can't add a course with a lower grade since it won't affect your GPA. If you still want to see its impact on your SPA, add the course 
                  without checking 'I've taken this course before' option."
            show={this.state.showModal}
            onHide={() => this.setModal(false)} />


          <div className="row">
            <div className="col-lg-12">
              <Form.Group controlId="formLecture">
                <Form.Label>Lecture Name</Form.Label>
                <input
                  id="lectureTextField"
                  name="lecture"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={this.state.randomLecture}
                  onChange={(e) => this.props.handleCourseName(e.target.value)}
                />
              </Form.Group>
            </div>

          </div>

          <div className="row align-items-center">
            <div className="col-lg-12">
              <Form.Group controlId="formGrade">
                <Form.Label>Grade <span className="text-muted">(Required)</span></Form.Label>
                <Form.Control
                  id="lectureGradeField"
                  as="select"
                  onChange={(e) => this.handleGradeChanges(e.target.value)}
                  className="form-control-lg"
                >
                  <option value="" selected disabled hidden>Select Grade</option>
                  <option>A+</option>
                  <option>A</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B</option>
                  <option>B-</option>
                  <option>C+</option>
                  <option>C</option>
                  <option>C-</option>
                  <option>D+</option>
                  <option>D</option>
                  <option>F</option>
                  <option>S</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-12">
              <Form.Group controlId="formCredits">
                <Form.Label>Credit <span className="text-muted">(Required)</span></Form.Label>
                <Form.Control
                  id="lectureCreditField"
                  as="select"
                  onChange={(e) => this.handleCreditChanges(e.target.value)}
                  className="form-control-lg">
                  <option value="" selected disabled hidden>Select Credits</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-12">
              <Form.Group controlId="formCredits">
                <Form.Label>Semester <span className="text-muted">(Required)</span></Form.Label>
                <Form.Control
                  id="lectureSemesterField"
                  as="select"
                  onChange={(e) => this.handleSemesterChanges(e.target.value)}
                  className="form-control-lg"
                  >
                  <option value="" selected disabled hidden>Select Semester</option>
                  <option>1</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>



          <div className="row ">
            <div id="checkbox" className="col-lg-12">
                  <Form.Check
                  id="lectureCheckbox"
                  type="checkbox"
                  label = {<span><label  title for="lectureCheckbox">I've taken this course before</label>
                                <label>
                                  <InfoOutlinedIcon  id="questionMark" onClick={() => this.props.setModal(true)}/></label> 
                            </span>}
                  onChange={this.props.checkHandler(this.state.checked), this.handleCheck}
                  defaultChecked={this.state.checked}

                  />


                </div>
              </div>

          <div className="row align-items-center">
            {screen}
          </div>

          <div className="row align-items-center">
            
            <div className="col-lg-12">
              <Button id={this.state.buttonID}
                type="button"
                className="btn btn-block"
                onClick={() => this.clicked()}>
                <AddRoundedIcon /> Course
            </Button>
            </div>



          </div>


        </Form>
      </div>
    );
  }
}
export default lectureInput;

