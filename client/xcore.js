(function() {
  "use strict";
  enyo.store.addSources({localStorage: 'b3.localStorageSource'});

  enyo.ready(function() {
    xCore.registerGui('XV.Gui');
  });
}());
