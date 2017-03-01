var React = require ('react');

class Login extends React.Component {
  render() {
    return (
      <div className="row">
         <div className="col-md-6">
          <h1>Please Login</h1>
          <form id="login">
             <div className="form-group">
               <input className="form-control" name="email" id="email-login" type="email" placeholder="email" />
             </div>
            <div className="form-group">
               <input className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
             </div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </form>
         </div>
        <div className="col-md-6">
          <h1>No Account Please Sign Up</h1>
          <form id="signup">
           <div className="form-group">
             <input id="signup-email" className="form-control" type="text" name="email" placeholder="Email Address" />
           </div>
           <div className="form-group">
             <input id="signup-password" className="form-control" type="text" name="password" placeholder="Password" />
           </div>
           <input className="btn btn-primary" type="submit" name="" value="Sign Up!" />
          </form>
         </div>
       </div>
    )
  }
}

module.exports = {
  Login
}
