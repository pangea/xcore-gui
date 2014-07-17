enyo.kind({
  name: "XV.GuiInterface",
  kind: "FittableRows",
  handlers: {
    onAlert: "addStatusBarAlertAction"
  },
  addStatusBarAlertAction: function() {
    throw 'this function needs to be implemented';
  }
});
