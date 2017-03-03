var $ = require('jquery');
var Backbone = require('backbone');
var React = require ('react');

var parse = require('../parse');

var User = require('../models/user').User;

class Authentication extends React.Component {

  constructor(props) {
    super(props);

    this._handleSignup = this._handleSignup.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
  }

  _handleSignup(credentials) {
    var user = new User(credentials);
    // user.save() makes a post request to models base url
    user.save().then(function(data){
      localStorage.setItem('user', JSON.stringify(data));
      Backbone.history.navigate('recipes/', {trigger: true});
    })
  }

  _handleLogin(credentials) {
    User.login(credentials, function(){
      Backbone.history.navigate('recipes/', { trigger: true })
    })
  }

  render() {
    return (
      <div className="row">
        <Login handleLogin={ this._handleLogin } />
        <Signup handleSignup={ this._handleSignup } />
      </div>
    )
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this._handleUsername = this._handleUsername.bind(this);
    this._handlePassword = this._handlePassword.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
  }

  _handleUsername(event) {
    this.setState({ username: event.target.value })
  }

  _handlePassword(event) {
    this.setState({ password: event.target.value })
  }

  _handleLogin(event) {
    event.preventDefault();
    this.props.handleLogin(this.state)
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>Please Login</h1>
        <form id="login" onSubmit={ this._handleLogin }>
          <div className="form-group">
            <input value={ this.state.username } onChange={ this._handleUsername } className="form-control" name="email" id="email-login" type="email" placeholder="email" />
          </div>
          <div className="form-group">
            <input value={ this.state.password } onChange={ this._handlePassword } className="form-control" name="password" id="password-login" type="password" placeholder="password" />
          </div>
          <input className="btn btn-primary" type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this._handleUsername = this._handleUsername.bind(this);
    this._handlePassword = this._handlePassword.bind(this);
    this._handleSignup = this._handleSignup.bind(this);
  }

  _handleUsername(event) {
    this.setState({ username: event.target.value })
  }

  _handlePassword(event) {
    this.setState({ password: event.target.value })
  }

  _handleSignup(event) {
    event.preventDefault();
    this.props.handleSignup(this.state)
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>No Account Please Sign Up</h1>
        <form id="signup" onSubmit={ this._handleSignup }>
          <div className="form-group">
            <input value={ this.state.username } onChange={ this._handleUsername } className="form-control" name="email" id="email-login" type="email" placeholder="email" />
          </div>
          <div className="form-group">
            <input value={ this.state.password } onChange={ this._handlePassword } id="signup-password" className="form-control" type="text" name="password" placeholder="password" />
          </div>
          <input className="btn btn-primary" type="submit" name="" value="Sign Up!" />
        </form>
      </div>
    )
  }
}

module.exports = {
  Authentication
}
