// var User = Backbone.Model.extend({
//   urlRoot: '/users'
// }, {
//   login: function(cridentials, callback) {
//     var url = '.../login?' + $.param(credentials);
//     $.get(url).then(data => {
//       var newUser = new User(data);
//       User.store(newUser);
//       callback(newUser);
//     });
//   },
//
//   signup: function(creds) {
//     var newUser = new User(creds);
//     newUser.save().then(() => {
//       User.store(newUser);
//     });
//     return newUser;
//   },
//
//   store: function(user) {
//     localStorage.setItem('user', JSON.stringify(user.toJSON()));
//   },
//
//   current: function() {
//     var user = localStorage.getItem('user');
//
//     // if no user in local storage, bail
//     if (!user) {
//       return false;
//     }
//
//     return new User(JSON.parse(user));
//   }
// });
