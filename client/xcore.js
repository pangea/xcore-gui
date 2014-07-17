(function() {
  "use strict";

  enyo.ready(function() {
    enyo.store.addSources({localStorage: 'b3.localStorageSource'});
    xCore.registerGui('XV.Gui');
  });
}());
