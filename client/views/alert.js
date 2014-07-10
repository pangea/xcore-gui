enyo.kind({
  name: "XV.Alert",
  kind: 'enyo.Popup',
  constructor: function(type, content) {
    this.type = type;
    this.content = content;
    this.classes = 'alert ' + type;
  }
});
