(function() {
  var Browser = require("zombie");
  var assert = require("assert");
  XV = {};
  
  if (!XV.browser) {
    XV.browser = new Browser();  
  }

  // Load the page from localhost
  XV.browser.visit("http://localhost:8443/");
}());
