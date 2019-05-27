import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../Actions/authenticationActions.js';
import { getCurrentUserProfile } from '../../Actions/profileActions.js';
import TextInput from '../Inputs/TextInput.js';

class UserProfile extends Component {
  componentDidMount() {
    this.props.getCurrentUserProfile();
  };
  handleWebLinkFormat = (webString) => {
    if (webString.includes("https://") || webString.includes("http://")) {
      return webString
    } else {
      webString = "http://" + webString;
      return webString
    }
  };
  render() {
    const user = this.props.auth.user;
    const currentUserProfile = this.props.profile.currentUserProfile;
    const loadingProfile = this.props.profile.loadingProfile;
    let userProfileContent;
    if (currentUserProfile === null || loadingProfile) {
      userProfileContent = <h4>
        <i className="fas fa-spinner"/>
      </h4>
    } else {
      userProfileContent = <h1>Content</h1>
      if (Object.keys(currentUserProfile).length > 0) {
        userProfileContent = (
          <div className="currentUserProfile">
            <h4>Welcome <span id="currentUserName">{currentUserProfile.fullName}</span></h4>
            <h5>Your profile</h5>
            <div className="currentUserProfileHeader">
              <div className="row" style={{marginBottom:"0px",marginTop:"12px"}}>
                <div className="col s12 m4">
                  <h5>{currentUserProfile.fullName}</h5>
                  <p id="usernameCurrentUser">{currentUserProfile.username}</p>
                </div>
                <div className="col s12 m4">
                  <h6>{currentUserProfile.location}</h6>
                </div>
                <div className="col s12 m4">
                  <h6>{currentUserProfile.church}</h6>
                </div>
              </div>
              <div className="socialLinks">
                {currentUserProfile.socialLinks.personalWebsite ? <a href={this.handleWebLinkFormat(currentUserProfile.socialLinks.personalWebsite)}><i className="fas fa-globe" id="socialIcon"/></a> : null}
                {currentUserProfile.socialLinks.youtube ? <a href={this.handleWebLinkFormat(currentUserProfile.socialLinks.youtube)} target="_blank"><i className="fab fa-youtube" id="socialIcon"/></a> : null}
                {currentUserProfile.socialLinks.facebook ? <a href={this.handleWebLinkFormat(currentUserProfile.socialLinks.facebook)} target="_blank"><i className="fab fa-facebook-square" id="socialIcon"/></a> : null}
                {currentUserProfile.socialLinks.instagram ? <a href={this.handleWebLinkFormat(currentUserProfile.socialLinks.instagram)} target="_blank"><i className="fab fa-instagram" id="socialIcon"/></a> : null}
                {currentUserProfile.socialLinks.twitter ? <a href={this.handleWebLinkFormat(currentUserProfile.socialLinks.twitter)} target="_blank"><i className="fab fa-facebook-square" id="socialIcon"/></a> : null}
              </div>
            </div>
            <div className="currentUserProfileList">
              <div className="row" id="testimonyCurrentUser">
                <div className="col s12 m12">
                <h6>Testimony</h6>
                <p>{currentUserProfile.briefTestimony}</p>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6" id="ministryExperienceCurrentUser">
                  <h6>Ministry Experience</h6>
                  {currentUserProfile.ministryExperience ?
                    currentUserProfile.ministryExperience.map(exp => (
                      <div>
                      <p>{exp.role}</p>
                      <p>{exp.description}</p>
                      </div>
                    ))
                    : <div>None</div>
                }
                </div>
                <div className="col s12 m6" id="hobbiesCurrentUser">
                  <p><span id="profileProperty">YouTube: </span>{currentUserProfile.socialLinks.youtube}</p>
                  <p><span id="profileProperty">Username: </span>{currentUserProfile.username}</p>
                  <p><span id="profileProperty">Location: </span>{currentUserProfile.location}</p>
                  <p><span id="profileProperty">Church: </span>{currentUserProfile.church}</p>
                </div>
              </div>
              <div className="prayerRequestsCurrentUser">
              </div>
            </div>
          </div>
        )
      } else {
        userProfileContent = (
          <div className="currentUserProfile">
            <h4>Welcome {currentUserProfile.fullName}</h4>
            <p>You have not created a profile yet.</p>
            <p>Click HERE to create one so others can see you!</p>
          </div>
        )
      }
    }
    return (
      <div className="currentUserProfile">
        {userProfileContent}
      </div>
    )
  }
};

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authenticate,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUserProfile })(UserProfile);
