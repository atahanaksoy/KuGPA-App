import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { AnimatedSwitch } from 'react-router-transition';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import FAQ from './Component/FAQ/FAQ';
import Login from './Component/Login/Login';
import Contact from './Component/Contact/Contact';
import axios from 'axios';
import HttpsRedirect from 'react-https-redirect';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: "true",
      done: "false"
    };
  }

  componentDidMount = () => {
    axios.get('/',(req,res) => {
      return "test"
      console.log("test")
  ;
  });
  }

  handleState = (loading, done) => {
    this.setState({
      loading: loading,
      done: done
    })
    this.forceUpdate()
  }

  logOut = () => {
    if(!this.state.loading && this.state.done){
      this.setState({
        loading: "true",
        done: "false",
      })
    }
  }




  render() {



    return (
      <HttpsRedirect>
      <React.Fragment>
        <div className="App">
          <Router>
          <Navbar isTop={this.state.isTop} logOut={this.logOut} loading={this.state.loading}
           done={this.state.done}/>
            <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper">
                <Route exact path="/" render ={props => (<Login handleState = {this.handleState}/>)} />
                <Route path="/faq"  render ={props => (<FAQ handleState = {this.handleState}/>)} />
                <Route path="/contact"  render ={props => (<Contact handleState = {this.handleState}/>)} />
                <Route render={() => (<Redirect to='/' />)} />
            </AnimatedSwitch>
          </Router>
        </div>
      </React.Fragment>
      </HttpsRedirect>
    );
  }

}


export default App;

