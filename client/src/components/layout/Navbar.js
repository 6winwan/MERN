import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const {isAuthenticated, user} = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            <i class="fas fa-clipboard-list"></i>
            <span> Post Feed</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
          <i class="fas fa-user-alt"></i>
          <span className="font-weight-bold"> {user.name}</span>' Dashboard 
          </Link>
        </li>
        <li className="nav-item"> 
          <a 
            href="/" 
            onClick={this.onLogoutClick.bind(this)}  className="nav-link">
            <img 
              className="rounded-circle"
              src={user.avatar} 
              alt={user.name} 
              style={{ width: '25px', marginLeft:'8px', marginRight: '5px'}} 
              title="You must have a Gravatar connted to your email to display an image"/>
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            <i className="fas fa-user-plus"></i>
            <span> Register</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            <i className="fas fa-sign-in-alt"></i>
            <span> Login</span>
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-info mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
        <i class="fas fa-laptop-code"></i>
        <span> Developers MeetUp</span> 
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
              {' '}
              <i className="fas fa-users"></i>
              <span> Developers</span>
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks: guestLinks}
        </div>
      </div>
    </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateProps, { logoutUser, clearCurrentProfile })(Navbar);