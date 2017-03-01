var $ = require('jquery');

function setupAjax(user){
  $.ajaxSetup({
    beforeSend: function(xhr){
      xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
      xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");
      if(user){
        xhr.setRequestHeader("X-Parse-Session-Token", user.sessionToken);
      }
    }
  });
}

setupAjax();
