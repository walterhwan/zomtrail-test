import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    SignInUser,
    toggleClose,
    toggleOpen
 } from './../redux/actions/actions';

class SignInWith extends Component {
  constructor(props) {
    super(props);

    this.renderButton = this.renderButton.bind(this);
    this.logout = this.logout.bind(this);
  }


  logout () {
    let auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('Successfully sign out');
    });

    document.getElementById('signin-button').style.display = 'block';
    document.getElementById('logout-div').style.display = 'none';
    // const { logged, currentProvider } = this.state;
    //
    // if (logged && currentProvider) {
    //   this.nodes[currentProvider].props.triggerLogout();
    // }
  }

  renderButton() {
    window.gapi.signin2.render('signin-button', {
      scope: 'email',
      width: 180,
      height: 36,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.responseGoogle,
      onfailure: () => {console.log('login failed');}
    });
  }

  responseGoogle(res) {
    let postData = {
      name: res.w3.ig,
      provider: 'google',
      email: res.w3.U3,
      provider_id: res.El,
      token: res.Zi.access_token,
      provider_pic: res.w3.Paa
    };
    console.log(postData);
    console.log('Logged in as: ' + res.getBasicProfile().getName());

    document.getElementById('signin-button').style.display = 'none';
    document.getElementById('logout-div').style.display = 'block';
    document.getElementById('greeting').innerHTML = `Hello, ${postData.name}`;
    // window.currentUser = res;
    // build our user data
    // this.props.SignInUser(postData);
    // this.props.toggleClose();
  }

  componentDidMount() {
    this.renderButton();
  }

  render() {
    return (
      <div className='google-auth' id='google-auth'>
        <div
          className='signin-button'
          id="signin-button">
        </div>
        <div
          className='logout-div' id='logout-div'>
          <p id='greeting'></p>
          <button
            className='logout-button'
            id='logout-button'
            onClick={this.logout}
            >Logout</button>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//
// };
// export default connect(mapStateToProps, {
//     toggleClose,
//     toggleOpen,
//     SignInUser
// })(SignInWith);

export default SignInWith;
