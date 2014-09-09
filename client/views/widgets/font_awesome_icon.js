enyo.kind({
  name: 'XV.FontAwesomeIcon',
  tag: 'i',
  published: {
    icon: ''
  },
  create: function() {
    this.inherited(arguments);

    this.addClass('fa');
    this.iconChanged();
  },
  iconChanged: function(oldIcon) {
    if(oldIcon) {
      this.removeClass('fa-' + oldIcon);
    }

    this.addClass('fa-' + this.get('icon'));
  }
});
