// Import react with 'Component' to call the pre-built components to this page
import React, { Component } from "react";
// Import 'compose' in order to connect 'action' and 'reducer' that used in this page
import { compose } from "redux";
// Import 'connect' in order to connect 'props' & 'action' that used in this page
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../commons/Footer";
import logo from "../assests/images/Serler-logo.png";
import background_image from "../assests/images/img_bg.jpg";
import button_google from "../assests/images/login-with-google-icon-3.jpg";

// There are two important elements in a 'class', which are 'comstructor' and 'render'
class Login extends Component {
  //The function of 'Constructor' is about to create 'State'
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Create header
  renderHeader() {
    return (
      <div style={{ height: 120 }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: 120, width: 120, float: "left" }}
        />
      </div>
    );
  }

  // Create 'Login with Google' in the middle of the screen
  renderContent() {
    return (
      <div
        style={{
          // button container
          height: "calc( 100vh - 100px )",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Link to="/home" className="google-logo">
          <img
            src={button_google}
            alt="g+ icon"
            style={{
              width: 240,
              height: 40,
              marginTop: "calc( 50vh - 100px )"
            }}
          />
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url(${background_image})`,
          backgroundSize: "100% 100%"
        }}
      >
        {this.renderHeader()}
        {this.renderContent()}
        <Footer />
      </div>
    );
  }
}

// Get the relevant fields in that 'state' of redux then pass those values to 'props' via reducer
const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(Login);
