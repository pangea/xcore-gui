enyo.kind({
  name: "XV.UserNav",
  components: [
    {kind: 'onyx.MenuDecorator', classes: "user-nav", components: [
      {content: "User Menu"},
      { name: 'userMenu',
        kind: 'onyx.Menu',
        ontap: 'handleNavSelect',
        components: [
          {content: 'Logout', value: 'logout', method: 'logout'}
        ]
      }
    ]}
  ],
  addUserNavAction: function (action) {
    this.$.userMenu.createComponent(action);
    this.$.userMenu.render();
  },
  handleNavSelect: function(inSender, inEvent) {
    var tapped  = inEvent.originator,
        method  = tapped.method,
        context = tapped.context;

    if(context) {
      context[method].call(context);
    } else {
      this[method].call(this);
    }

    return true;
  },
  logout: function() {
    location.assign('/logout');
  }
});
