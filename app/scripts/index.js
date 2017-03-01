var $ = require('jquery');
var Backbone = require('backbone');

require('./router.js');
require('./utilities');

$(function(){
  Backbone.history.start();
})
