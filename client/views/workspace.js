enyo.kind({
  name: "XV.Workspace",
  kind: "Panels",
  published: {
    history: []
  },
  createComponent: enyo.inherit(function(sup) {
    return function(component) {
      // Enforce 1 child limit
      if(this.children.length) {
        throw new Error("Workspace cannot have more than one child");
      }

      this.history.push(enyo.clone(component));

      sup.apply(this, arguments);
    };
  }),
  goBack: function() {
    this.history.pop();                       // remove 'current' workspace
    this.createComponent(this.history.pop()); // load new 'current' workspace
    this.render();
  },
  clearHistory: function() {
    this.history = [];
  },
  /**
   * hasHistory checks to see if the current history array has more than one
   * object in it.  We specifically check for greater than 1 because the current
   * implementation of history always includes the current workspace.  Ergo, for
   * us to have history, it must be greater than one.
   *
   * @return {Boolean} if the length of the history array is greater than one
   */
  hasHistory: function() {
    return this.history.length > 1;
  }
});
