(function() {
  "use strict";

  /**
   * Transforms the given camelCased value to a Titlized form.
   * E.g. firstName -> First Name
   */
  XV.titlize = function(inString) {
    // the special value $& inserts the matched value into the string used in
    // replace.  This allows us to insert spaces before every capital letter.
    return enyo.trim(enyo.cap(inString.toString().replace(/[A-Z]/, ' $&')));
  };

  xCore.registerGui('XV.Gui');
}());

