enyo.kind({
  name: 'XV.BackButton',
  kind: 'onyx.Button',
  classes: 'fa fa-reply',
  events: {
    onGoBack: ''
  },
  handlers: {
    ontap: 'handleTap'
  },
  handleTap: function() {
    this.doGoBack();
    return true;
  }
});
