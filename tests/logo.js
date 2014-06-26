(function() {
  "use strict";

  var login = require(__dirname + '/lib/login');

  describe('logo functionality', function (done) {                                                   
    it('can set the logo source url', function (done) {    
      xCore.$.mainView.setLogoImage('test-url');
      assertEqual(xCore.$.mainView.$.logo.$.image.getAttribute('src'), 'test-url');
    });
  });
}());       
