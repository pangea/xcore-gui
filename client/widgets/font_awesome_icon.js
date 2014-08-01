enyo.kind({
  name: 'XV.FontAwesomeIcon',
  tag: 'i',
  classes: 'fa',
  published: {
    icon: ''
  },
  create: function() {
    this.inherited(arguments);

    this.addClass('fa-' + this.get('icon'));
  }
});
