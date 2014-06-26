(function() {
  "use strict";

  var login = require(__dirname + '/lib/login');

   before(function (done) {
            this.timeout(50000);
            var appLoaded = function () {
              console.log("App loaded");
              done();
            };

            login.loadApp(appLoaded);
    });


  describe('logo functionality', function (done) {
    it('can set the logo source url', function (done) {
      xCore.$.mainView.setLogoImage('test-url');
      assertEqual(xcore.$.mainView.$.logo.$.image.getAttribute('src'), 'test-url');

         done();
    });
  });
}());
