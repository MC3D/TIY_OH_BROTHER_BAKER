var $ = require('jquery');
var React = require ('react');

// require('./../utilities');

$.fn.serializeObject = function() {
    return this.serializeArray().reduce(function(acum, i) {
      acum[i.name] = i.value;
      return acum;
    }, {});
  };

var baseUrl = 'https://tiny-lasagna-server-new.herokuapp.com';

class Login extends React.Component {

  constructor(props) {
    super(props);
    var self = this;

    this.state = {
      authenticated: false
    }
  }

  componentWillMount() {
    var self = this;
    if(localStorage.getItem('userToken') !== null){
      self.setState({authenticated: true});
    }
  }

  _signup(event) {
    event.preventDefault();
    var user = $(event.target).serializeObject();
    var self = this;
    user = {
      username: user.email,
      password: user.password
    };
    $.post(baseUrl + '/users', user).then(function(data){
      console.log('session id', data.sessionToken);
      localStorage.setItem('userToken', data.sessionToken);
      self.setState({authenticated: true});
    });
  }

  _login(event) {
    event.preventDefault();
    var user = $(event.target).serializeObject();
    var self = this;
    var username = user.email;
    var password = user.password;

    var url = baseUrl + '/login?username=' +
            encodeURIComponent(username) + '&' +
            'password=' + encodeURIComponent(password);

    $.get(url).then(function(data){
      localStorage.setItem('userToken', data.sessionToken);
      console.log('session id', data.sessionToken);
      self.setState({authenticated: true});
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h1>Please Login</h1>
          <form id="login" onSubmit={this._login.bind(this)}>
            <div className="form-group">
              <input className="form-control" name="email" id="email-login" type="email" placeholder="email" />
            </div>
            <div className="form-group">
              <input className="form-control" name="password" id="password-login" type="password" placeholder="password" />
            </div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </form>
        </div>
        <div className="col-md-6">
          <h1>No Account Please Sign Up</h1>
          <form id="signup" onSubmit={this._signup.bind(this)}>
            <div className="form-group">
              <input className="form-control" name="email" id="email-login" type="email" placeholder="email" />
            </div>
            <div className="form-group">
              <input id="signup-password" className="form-control" type="text" name="password" placeholder="password" />
            </div>
            <input className="btn btn-primary" type="submit" name="" value="Sign Up!" />
          </form>
        </div>
        <Chat authenticated={this.state.authenticated}/>
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
  Login
}
