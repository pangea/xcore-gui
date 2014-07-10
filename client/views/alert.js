enyo.kind({
  name: "XV.Alert",
  kind: 'enyo.Popup',
  handlers: {
    ontap: 'tapped'
  },
  published: {
    autoDismiss: false
  },
  tapped: function(inSender, inEvent) {
    this.hide();
    return true;
  }
});
