import React, { Component } from 'react';
import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

class navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: false
    }
    this.setNavExpanded = this.setNavExpanded.bind(this)
    this.closeNav = this.closeNav.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }

  closeNav() {
    this.setState({ navExpanded: false });
  }


  logOut() {
    this.props.logOut()
    this.closeNav()
  }


  render() {

    let screen;


    if (!this.props.loading && this.props.done) {
      screen = <NavLink  className="nav-link" to="/logout" onClick={this.logOut}>Log Out</NavLink>
    } else {
      screen = null
    }

    return (

      <Navbar bg="light" expand="sm" id="navbarTop" onToggle={this.setNavExpanded}
      expanded={this.state.navExpanded}>

        <NavLink className="navbar-brand" to="/" onClick={this.closeNav}>KuGPA</NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

          <Navbar.Collapse id="basic-navbar-nav"  >
            <Nav.Link  className="ml-auto"/>


            <NavLink  className="nav-link" to="/faq" onClick={this.closeNav}>FAQ</NavLink>

            <NavLink  className="nav-link" to="/contact" onClick={this.closeNav}>Contact</NavLink>

            {screen}
          </Navbar.Collapse>

      </Navbar>


    );
  }

}


export default navbar;

