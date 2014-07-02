(function() {

   var Zombie = require("zombie"),
   assert = require("assert"),
   secondsToWait = 40;
   XZ = {};

   var loadApp = exports.loadApp = function (options) {

	   // Load the page from localhost
	   Zombie.visit("http://localhost:8443/",
			             {debug: true},
			             function (e, browser) {

                     // give up after some time
                     var timeout = setTimeout(function () {
                                                console.log("App did not fully load");
                                                process.exit(1);
                                              }, secondsToWait * 1000);

				             // Check frequently to see if the app is loaded, and move forward when it is
				             var interval = setInterval(
                       function () {
									         // add the global objects to our global namespace
									         enyo = browser.window.enyo;
                           xcore = browser.window.xcore;
									         XG = browser.window.XG;
									         XM = browser.window.XM;
									         // XT = browser.window.XT;
									         XV = browser.window.XV;
									         XZ.browser = browser;

                         // TODO: uncomment when we get XT
									         // XT.log = function (message, obj) {
										       //   if (message && message.toLowerCase().indexOf("error") === 0) {
											     //     // errors from the datasource should cause the test to fail
											     //     assert.fail(message + " " + JSON.stringify(obj));
										       //   }
										       //   // log if verbose mode or if the log is a warning
										       //   if (verboseMode || (message && message.code)) {
											     //     console.log(JSON.stringify(arguments));
										       //   }
									         // };

									         // // WIP. Not yet working. Probably need to move it up to earlier app start status.
                           // var oldLoc = XT.String.loc;
									         // XT.String.loc = function (str) {
										       //   var localized = XT.localizeString(str);
										       //   if (localized === str) {
											     //     assert.fail(str + " has no translation");
										       //   } else {
											     //     oldLoc(str);
										       //   }
									         // };

									         // clear out both is interval and the I'm-giving-up timeout
									         // we really want neither to be run again.
									         clearInterval(interval);
									         clearTimeout(timeout);
							         }, 100); // 100 = check to see if the app is loaded every 0.1 seconds)
			             });
   };
 }());
