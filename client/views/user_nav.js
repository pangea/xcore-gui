enyo.kind({
  name: "XV.UserNav",
  events: {},
  components: [
    {kind: 'onyx.MenuDecorator', classes: "user-nav", components: [
      {content: "User Menu"},
      {name: 'userMenu', kind: 'onyx.Menu', components: [
        {content: 'Logout', value: 'logout'}
      ]}
    ]}
  ],
  addUserNavAction: function (action) {
    this.$.userMenu.createComponent(action);
    this.$.userMenu.render();
  }
});
