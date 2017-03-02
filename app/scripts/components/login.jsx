var $ = require('jquery');
var React = require ('react');

var baseUrl = 'https://tiny-lasagna-server-new.herokuapp.com';

class Container extends React.Component {

  constructor(props) {
    super(props);
    var self = this;

    this.state = {
      authenticated: false,
      username: '',
      password: ''
    }

    this._handleSignup = this._handleSignup.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
  }

  componentWillMount() {
    var self = this;
    if(localStorage.getItem('userToken') !== null){
      self.setState({authenticated: true});
    }
  }

  _handleSignup(user) {
    var self = this;
    $.post(baseUrl + '/users', user).then(function(data){
      console.log('session id', data.sessionToken);
      localStorage.setItem('userToken', data.sessionToken);
      self.setState({authenticated: true});
    });
  }

  _handleLogin(user) {
    var self = this;
    var url = baseUrl + '/login?username=' +
            encodeURIComponent(user.username) + '&' +
            'password=' + encodeURIComponent(user.password);
    $.get(url).then(function(data){
      console.log('session id', data.sessionToken);
      localStorage.setItem('userToken', data.sessionToken);
      self.setState({authenticated: true});
    });
  }

  render() {
    return (
      <div className="row">
        <Login handleLogin={ this._handleLogin } />
        <Signup handleSignup={ this._handleSignup } />
        <Chat authenticated={ this.state.authenticated } />
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
    this.setState({username: event.target.value})
  }

  _handlePassword(event) {
    this.setState({password: event.target.value})
  }

  _handleLogin(event) {
    event.preventDefault();
    this.props.handleLogin(this.state)
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>Please Login</h1>
        <form id="login" onSubmit={this._handleLogin}>
          <div className="form-group">
            <input value={this.state.username} onChange={this._handleUsername} className="form-control" name="email" id="email-login" type="email" placeholder="email" />
          </div>
          <div className="form-group">
            <input value={this.state.password} onChange={this._handlePassword} className="form-control" name="password" id="password-login" type="password" placeholder="password" />
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
    this.setState({username: event.target.value})
  }

  _handlePassword(event) {
    this.setState({password: event.target.value})
  }

  _handleSignup(event) {
    event.preventDefault();
    this.props.handleSignup(this.state)
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>No Account Please Sign Up</h1>
        <form id="signup" onSubmit={this._handleSignup}>
          <div className="form-group">
            <input value={this.state.username} onChange={this._handleUsername} className="form-control" name="email" id="email-login" type="email" placeholder="email" />
          </div>
          <div className="form-group">
            <input value={this.state.password} onChange={this._handlePassword} id="signup-password" className="form-control" type="text" name="password" placeholder="password" />
          </div>
          <input className="btn btn-primary" type="submit" name="" value="Sign Up!" />
        </form>
      </div>
    )
  }
}

class Chat extends React.Component {
  render() {
    if(this.props.authenticated) {
      return(
        <div className="col-md-6">
          <h1>Oh User!</h1>
          <form>
            <div className="form-group">
              <input className="form-control" name="message" id="message" type="text" placeholder="enter message" />
            </div>
            <input className="btn btn-primary" type="submit" name="" value="Say Something!" />
          </form>
        </div>
      )
    }
    return(
      <div></div>
    )
  }
}

module.exports = {
  Container
}
