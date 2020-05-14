import React , { Component,useState, setShow} from 'react';
import './CourseList.css';
import LectureInput from '../LectureInput/LectureInput';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';
import Card from 'react-bootstrap/Card';
import FlipMove from 'react-flip-move';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, animateScroll as scroll, animateScroll } from "react-scroll";
import Modal from '../Modal/Modal';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import AnimateHeight from 'react-animate-height';
import throttle from 'lodash/throttle';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Badge from '@material-ui/core/Badge/Badge';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';
import ScrollableFeed from 'react-scrollable-feed'
import CancelIcon from '@material-ui/icons/Cancel';


class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.lectureInputElement = React.createRef();
    this.state = {

        course: {
          courseID: "",
          courseName: "",
          courseCredit: "",
          courseGrade: "",
          courseTakenGrade:""
        },        
        semesters: [],
        semester: {
          semesterID: "",
          semesterCourses: [],
          semesterSPA: 0,
          semesterCredits: 0,
          semesterSatisfactoryCredits: 0
        },
        totalCredits: 0,
        totalSatisfactoryCredits: 0,
        courseName: "",
        courseCredit: "",
        courseTakenGrade: "not taken",
        courseGrade: "",
        gpa: 0,
        currentTotalCredits: 0,
        totalTakenCredits: 0,
        isTaken: false,
        currentCourses: {},
        showModal: false,
        currentGradedCredits: 0,
        currentSemester: 1,
        height: ["auto",0],
        icon: "fa fa-chevron-down",
        courseCreated: false,
        showReport:true
       };

    this.handleCourseName = this.handleCourseName.bind(this)
    this.handleCourseCredit = this.handleCourseCredit.bind(this)
    this.handleCourseGrade = this.handleCourseGrade.bind(this)
    this.handleCourseTakenGrade = this.handleCourseTakenGrade.bind(this)
    this.handeCourseSemester = this.handleCourseSemester.bind(this)
    this.createCourse = this.createCourse.bind(this)
    this.deleteCourse = this.deleteCourse.bind(this)
    this.gradeToNumber = this.gradeToNumber.bind(this)
    this.checkHandler = this.checkHandler.bind(this)
    this.fillForm = this.fillForm.bind(this)
    this.setModal = this.setModal.bind(this)
    this.deleteCourse = this.deleteCourse.bind(this)
    this.deleteSemester = this.deleteSemester.bind(this)


    
   }  


//COURSE HANDLERS/////////////////////////

checkHandler = (isChecked) => {

  this.state.isTaken = isChecked;
}


handleCourseName = (e) => {

  this.setState({
    courseName: e
  })
}

handleCourseSemester = (e) => {
  this.setState({
    currentSemester: e
  })

  document.getElementById("lectureSemesterField").style["border"] = "1px solid #ced4da";
}
  
handleCourseCredit = (e) => {

  this.setState({
    courseCredit: e
  })

  document.getElementById("lectureCreditField").style["border"] = "1px solid #ced4da";
}
  
  
handleCourseGrade = (e) => {

  this.setState({
    courseGrade: e
  })

  document.getElementById("lectureGradeField").style["border"] = "1px solid #ced4da";
}


handleCourseTakenGrade = (e) => {
 
  this.setState({
    courseTakenGrade: e
  })

  document.getElementById("lecturePreviousGradeField").style["border"] = "1px solid #ced4da";
}

resetInputs = () => {

  document.getElementById("lectureTextField").value = "";
  document.getElementById("lectureCreditField").value = "";
  document.getElementById("lectureGradeField").value = "";
  this.handleCourseName("")
  this.handleCourseCredit("")
  this.handleCourseGrade("")
  this.lectureInputElement.current.setDefaultValues();

  if (this.state.isTaken) {
    document.getElementById("lecturePreviousGradeField").value = "";
    this.handleCourseTakenGrade("")
    document.getElementById("lectureCheckbox").checked = false;
  }
}

fillForm = (name,credit) => {

  let options = {
    duration: 200,
    smooth: true
  }

  scroll.scrollToTop(options);
  name = name.replace(" ", "")

  document.getElementById("lectureTextField").value = name;
  document.getElementById("lectureCreditField").value = credit;
  this.handleCourseName(name)
  this.handleCourseCredit(credit)

}

setModal = (boolean) => {

  this.setState({
    showModal: boolean
  })

}

///////////////////////////



createSemester = (e) => {
  
  var semesterCourses = [];

  if (this.state.semesters.length == 0) {

    Object.keys(this.props.currentGradedCourses).map((gradedCourse) => 

    {var course = {
      courseID : uuid(),
      courseName: gradedCourse,
      courseGrade: this.props.currentGradedCourses[gradedCourse][1],
      courseCredit: this.props.currentGradedCourses[gradedCourse][0],
      courseTakenGrade: this.props.currentGradedCourses[gradedCourse][2]
    } 
  
    semesterCourses = [...semesterCourses, course]
    }
  );
}

  var semester = {
    semesterID : uuid(),
    semesterCourses: semesterCourses,
    semesterSPA: 0,
    semesterCredits: 0,
    semesterSatisfactoryCredits: 0
  }
  
  this.state.semesters.push(semester);



  var option = document.createElement("option");
  option.text = this.state.semesters.length;
  if(document.getElementById("lectureSemesterField") != null){
    document.getElementById("lectureSemesterField").add(option);
    document.getElementById("lectureSemesterField").value = this.state.semesters.length
    this.handleCourseSemester(this.state.semesters.length)
  }

  this.forceUpdate()

}


deleteSemester = (id) => {
  var semesterIndex = -1;

  for(var i = 0; i<this.state.semesters.length; i++){
    if(this.state.semesters[i]["semesterID"] == id){
      semesterIndex=i;
    }
  }

  if(semesterIndex != -1){
   this.state.semesters = this.state.semesters.filter(semester => semester.semesterID !== id)

    
    if(document.getElementById("lectureSemesterField") != null){
      document.getElementById("lectureSemesterField").remove(document.getElementById("lectureSemesterField").length-1);
      }
    
      if(this.state.semesters.length == 0){
        this.createSemester()
      }
    
      if(document.getElementById("lectureSemesterField") != null){
        document.getElementById("lectureSemesterField").value = this.state.semesters.length
        this.handleCourseSemester(this.state.semesters.length)
        this.lectureInputElement.current.handleDeleteSemester(this.state.semesters.length);
        }        



}

}


createCourse = () => {

    var takenResult = "not taken";
    if (this.state.isTaken) {
      takenResult = this.state.courseTakenGrade;
    }

    this.setState({
        course: {
            courseID : uuid(),
            courseName: this.state.courseName,
            courseGrade: this.state.courseGrade,
            courseCredit: this.state.courseCredit,
            courseTakenGrade: takenResult
        }
    }, () => {
      this.state.semesters[this.state.currentSemester-1] = {
              semesterID : this.state.semesters[this.state.currentSemester-1]["semesterID"],
              semesterCourses: [...this.state.semesters[this.state.currentSemester-1]["semesterCourses"], this.state.course],
              semesterSPA: 0,
              semesterCredits: 0,
              semesterSatisfactoryCredits:0
              }

        this.setState({
          firstAdded : true,
          courseCreated: true
          
        })
        this.resetInputs();
        this.updateSemesterInfo(this.state.currentSemester-1);
    })

}


deleteCourse = (id) => {

  var foundSemester = -1;
  var foundCourse = -1;

  for (var semesterIndex = 0; semesterIndex<this.state.semesters.length; semesterIndex++) {
    for (var courseIndex = 0; courseIndex <this.state.semesters[semesterIndex]["semesterCourses"].length; courseIndex++) {
        if (this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseID"] == id) {
          foundSemester = semesterIndex;
          foundCourse = courseIndex;
        }
    }
  }

  if (foundSemester != -1) {
    this.state.semesters[foundSemester]["semesterCourses"].splice(foundCourse,1);
  }

  for (var i = 0; i<this.state.semesters.length; i++) {
    this.updateSemesterInfo(i)
  }
  this.forceUpdate()
}

updateSemesterInfo = (semester) => {

  var satisfactoryCredits = 0;
  var totalCredits = 0;
  var totalGrades = 0;

  for (var index=0; index<this.state.semesters[semester]["semesterCourses"].length; index++) {

    if (this.state.semesters[semester]["semesterCourses"][index]["courseGrade"] != "S") {

      totalCredits += this.state.semesters[semester]["semesterCourses"][index]["courseCredit"] * 1;
      totalGrades += this.gradeToNumber(this.state.semesters[semester]["semesterCourses"][index]["courseGrade"]) * this.state.semesters[semester]["semesterCourses"][index]["courseCredit"];
    
    } else {

      satisfactoryCredits += this.state.semesters[semester]["semesterCourses"][index]["courseCredit"] * 1;
    }
  }

  this.state.semesters[semester]["semesterCredits"] = totalCredits;
  this.state.semesters[semester]["semesterSatisfactoryCredits"] = satisfactoryCredits;

  if (totalCredits != 0) {

    this.state.semesters[semester]["semesterSPA"] = totalGrades / totalCredits;

  } else {

    this.state.semesters[semester]["semesterSPA"] = 0;
  }
}


calculateGPA = () => {

  if (this.state.semesters.length == 0) {
    this.createSemester()
    this.forceUpdate()
  }

  var totalSatisfactoryCredits = 0;
  var totalCredits = 0;
  var totalGrades = 0;

  Object.keys(this.props.previousCourses).map((course) => 
    {
      if (this.props.previousCourses[course][1] != "S") {
        totalCredits += parseInt(this.props.previousCourses[course][0]);
        totalGrades += this.gradeToNumber(this.props.previousCourses[course][1]) * this.props.previousCourses[course][0];
      } else {
        totalSatisfactoryCredits += parseInt(this.props.previousCourses[course][0]);
      }

    }
  );

  for (var semesterIndex = 0; semesterIndex<this.state.semesters.length; semesterIndex++) {

    for (var courseIndex = 0; courseIndex <this.state.semesters[semesterIndex]["semesterCourses"].length; courseIndex++) {

      if (this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseGrade"] != "S") {

          if (this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseTakenGrade"] == "not taken") {
            totalCredits += parseInt(this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseCredit"]);
            totalGrades += this.gradeToNumber(this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseGrade"]) 
                            * this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseCredit"];
          }

          else {
            totalGrades += parseInt(this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseCredit"]) *
                            (this.gradeToNumber(this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseGrade"])
                            - this.gradeToNumber(this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseTakenGrade"]))
          }

      } else {

        if (this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseTakenGrade"] == "not taken") {
          
          totalSatisfactoryCredits += parseInt(this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseCredit"]);

        } else {

          totalCredits -= parseInt(this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseCredit"]);
          totalSatisfactoryCredits += parseInt(this.state.semesters[semesterIndex]["semesterCourses"][courseIndex]["courseCredit"]);
        }

      }

    }
  }

  this.state.totalCredits = totalCredits;
  this.state.totalSatisfactoryCredits = totalSatisfactoryCredits;

  if (totalCredits != 0) {
    return totalGrades / totalCredits;
  }

  return 0;
}


gradeToNumber = (str) => {

  switch(str) {
    case "A++":
      return 4.3;
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


changeCoursesEnrolledStyle = () => {
  if (this.state.height[0] == 0) {
    this.state.height[0] = "auto";
    this.state.icon = "fa fa-chevron-up";
  } else {
    this.state.height[0] = 0;
    this.state.icon = "fa fa-chevron-down";
  }

  this.forceUpdate()

}

changeHeightOfReport = () => {
  if (this.state.height[1] == 0) {
    this.state.height[1] = "auto";
  } else {
    this.state.height[1] = 0;
  }
}

badgeUpdateHandler = () => {

  var numLectures = 0

  for (var i=0; i<this.state.semesters.length; i++) {

    numLectures += this.state.semesters[i]["semesterCourses"].length
  }


  return numLectures

}

snackbarUpdateHandler = () => {
  this.setState({
    courseCreated: false
  })
}


showReport = () => {

  if (this.state.showReport) {
    this.changeHeightOfReport()
    this.state.showReport = false;
  } else {
    this.changeHeightOfReport()
    this.state.showReport = true;
  }
  this.forceUpdate()
}

handleShowReport = () => {

  if (!this.state.showReport) {
    this.state.showReport = true;
    this.changeHeightOfReport()
    this.forceUpdate()
  }


}


///////////////////////////////////////////

 

render() {

  let enrolledCourses;
  let coursesEnrolledText;
  let coursesEnrolledButton;

  if (!this.props.guestMode) {
    coursesEnrolledText = <h3 onClick={this.changeCoursesEnrolledStyle} id="coursesEnrolledText">Courses Enrolled  <i id = "expandClassesIcon" class={this.state.icon}></i></h3>;
    coursesEnrolledButton = "coursesEnrolledButton"
    enrolledCourses = Object.keys(this.props.currentCourses).map((course) => 
      <div id="enrolledCourseDiv" className="col-lg-6 col-md-4 col-sm-2 col-xs-1">
            <Link to="addText" containerId="lectureInput" smooth={true} duration= {200} offset={-50}>
          <p 
            onClick= {() => {this.fillForm(course,this.props.currentCourses[course])}} 
            className="text-muted" 
            id="enrolledCourse"
          >

            {course.replace(" ", "")}
          </p>
          </Link>
      </div>
    )
  } 







  return (
    <div>
      
      <Navbar className="bottomNav" bg="dark"  fixed="bottom">
         <div  className="row align-items-center navRow my-auto">
         <AnimateHeight height={this.state.height[1]} className="AnimateHeight">
                <Navbar className="bottomReport"  bg="reportbg" fixed="bottom">
                    <div id="bottomReportCollapse">
                      <CancelIcon id="collapseIcon" onClick={() => this.handleShowReport()}/>
                    </div>
                    <div id="bottomReportData">
                      <h3>Cumulative GPA</h3>
                      <div className="row">
                        <div id="semesterSPA" >
                              <p id="SPAValue">{this.calculateGPA().toFixed(3)}</p>
                              <p id="SPAText">GPA</p>
                        </div>
                      </div>

                    <div id="otherDataContainer">
                        <div id="otherDataRow" >
                          <p>Graded Credits <span>{parseInt(this.state.totalCredits)}</span></p> 
                        </div>

                        <div id="otherDataRow" >
                            <p>Total Credits <span>{parseInt(this.state.totalCredits + this.state.totalSatisfactoryCredits)}</span></p>
                        </div>
                    </div>
                   </div>

              </Navbar>
       </AnimateHeight>
           </div> 


       <div className="row align-items-center navRow">
       <div id="bottomNavContainer" className="container">
          <Link to="lectureInput" smooth={true} duration= {500} offset= {-25} >
            <Nav.Link className="bottomNavLink" href="#lectureInput" onClick={() => this.handleShowReport()}>
              <AddCircleOutlineRoundedIcon fontSize="small"/>
              <br/>
              Add
            </Nav.Link>
          </Link>
            <Link to="CourseList" smooth={true} duration= {500} offset= {-25}>
                <Nav.Link className="bottomNavLink" href="#CourseList" onClick={() => this.handleShowReport()}>
                  <Badge badgeContent={this.badgeUpdateHandler()} color="primary">
                    <CalendarTodayRoundedIcon fontSize="small"/>
                  </Badge>
                    <br/>
                    SPA
                </Nav.Link>
            </Link>
          
            <Nav.Link className="bottomNavLink" active={!this.state.showReport} onClick={() => this.showReport()}>
            <AssignmentRoundedIcon fontSize="small" id="bottomNavLink"/> 
              <br/>
              GPA
            </Nav.Link>
          </div>
       </div> 




       
      </Navbar>




    <div id="allElements" className = "row">


  
        
        <div id="lectureInput" className="frame col-lg-3 col-md-12">
                <h1 id="addText">Add Course  
                </h1>

          
          <Modal
              size = "lg"
              title = "Previously taken courses"
              text1 = "If you are adding a course that you have already taken in the previous semesters, make sure to check 'I've taken this course before’  before adding it."
              developerNames = "Atahan Aksoy & Barış Özcan"
              show={this.state.showModal}
              onHide={() => this.setModal(false)}/
          >

          <LectureInput ref = {this.lectureInputElement}
                        handleCourseName={this.handleCourseName}   
                        handleCourseCredit={this.handleCourseCredit}
                        handleCourseGrade={this.handleCourseGrade}
                        handleCourseTakenGrade={this.handleCourseTakenGrade}
                        createCourse={this.createCourse}
                        checkHandler={this.checkHandler}
                        courseCredit = {this.state.courseCredit}
                        createSemester = {this.createSemester}
                        handleCourseSemester = {this.handleCourseSemester}
                        setModal = {this.setModal}
          />

      <Snackbar id="snackbar" anchorOrigin={{ vertical:"top", horizontal:"center" }} open={this.state.courseCreated} onClose={() => this.snackbarUpdateHandler()} autoHideDuration={3000}>
        <Alert severity="success">
          Successfully added the course!
        </Alert>
      </Snackbar>

        <div  id= "enrolledCoursesList">
          <div id={coursesEnrolledButton}>
                {coursesEnrolledText}
          <AnimateHeight height={this.state.height[0]} className="AnimateHeight">
            <div className="row align-items-center">
              {enrolledCourses}
            </div>
          </AnimateHeight>
        </div>
        </div>
        </div>
        

          <div id="section2" className="col-lg-9 col-md-12">
            <div className="row align-items center">
              <div className="col-lg-9">
              <div  id="CourseList">
          <div className="container">
          <h1 id="addText">Course List</h1>

            <div className="semesterContainer">
            <ScrollableFeed>

              <FlipMove duration={200} enterAnimation="accordionVertical" leaveAnimation="accordionVertical" staggerDurationBy="100" id="addedCourses">
                  {this.state.semesters.map((semester) => 
                        <Card className="addedSemester" key={semester["semesterID"]}>
                          <Card.Body>
                    
                            <Card.Title> 
                              <div id="SemesterTitleRow" className="row align-items-center">
                                <div className="col-lg-4">
                                  <div id="SemesterText">
                                    Semester {this.state.semesters.indexOf(semester) + 1} 
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                </div>
                                <div className="col-lg-4">
                                  <div id="SemesterText">
                                    <i id="deleteButton" onClick={throttle(() => {this.deleteSemester(semester["semesterID"])},800)} class="fa fa-times"></i>
                                  </div>
                                </div>
                              </div>
                              <div id="SemesterInfoRow" className="row align-items-center">
                                <div className="col-lg-4">
                                  <div id="semesterSPA">
                                    <p id="SPAValue">{semester["semesterSPA"].toFixed(3)}</p>
                                    <p id="SPAText">SPA</p>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div id="semesterOtherData">
                                    <p id="SPAValue">{semester["semesterCredits"]}</p>
                                    <p id="SPAText">Graded Credits</p> 
                                  </div>
                                      
                                </div>
                                <div className="col-lg-4">
                                  <div id="semesterOtherData">
                                    <p id="SPAValue">{semester["semesterCredits"] + semester["semesterSatisfactoryCredits"] }</p>
                                    <p id="SPAText">Total Credits</p>
                                  </div>
                                </div>
                              </div>
                            </Card.Title>
                              <FlipMove duration={300} enterAnimation="elevator" leaveAnimation="elevator" staggerDurationBy="100" className="row align-items-center">
                              {semester["semesterCourses"].map((course) => 
                                <div className="col-lg-4 col-sm-6" key={course["courseID"]}>
                              <Card className="addedCourse align-items-center">
                                <Card.Body>
                                  <Card.Title>
                                      <span id="courseName">
                                          {course["courseName"].substring(0,9)}
                                      </span>
                                      <i id="deleteButton" id="deleteCourseButton" class="fa fa-times" onClick={() => {this.deleteCourse(course["courseID"])}}></i>
                                  </Card.Title>
                                        <span id="cardCourseSubtitle">
                                        {course["courseGrade"]},  {course["courseCredit"]} credits
                                        </span>  
                                </Card.Body>
                              </Card> 
                              </div>                           
                              )}
                            </FlipMove>
                        </Card.Body>
                      </Card>
                  )}
              </FlipMove>
              </ScrollableFeed>

          </div>
          <div className="row">
            <div className="col-lg-4">
            <Button id="semesterButton"
                type="button"
                className="btn btn-block"
                onClick={() => this.createSemester()}>
                <AddRoundedIcon /> Semester
              </Button>
            </div>
          </div>

            </div>
          </div>
        </div>

        <div id="dataBlock" className = "frame col-lg-3 col-md-12">
                  <h1 id="addText">Report</h1>
            <div id="reportCard">
              <div className="row" id="semesterRow">
                <div className="col-lg-12" align="center">
                        <div id="semesterSPA" >
                          <p id="SPAValue">{this.calculateGPA().toFixed(3)}</p>
                          <p id="SPAText">GPA</p>
                        </div>
                  </div>
                </div>

              <div className="row align-items-center">
                <div className="col-lg-6">
                    <div id ="semesterOtherData">
                      <p id="SPAValue">{parseInt(this.state.totalCredits)}</p>
                      <p id="SPAText">Graded Credits</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div id ="semesterOtherData">
                      <p id="SPAValue">{parseInt(this.state.totalCredits + this.state.totalSatisfactoryCredits)}</p>
                      <p id="SPAText">Total Credits</p>
                  </div> 
              </div>
            </div>
            </div>
        </div>




            </div>





        </div>

          </div>




    </div>
    

  );
}

  
}

export default CourseList;


