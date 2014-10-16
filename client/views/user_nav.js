enyo.kind({
  name: "XV.UserNav",
  kind: "bootstrap.NavbarNav",
  float: "right",
  components: [
    {kind: "bootstrap.NavDropdown", text: "User Menu", href: "#", components: [
      {kind: "bootstrap.DropdownMenu", name: "userMenu", ontap: 'handleNavSelect', components: [
        {text: "Logout", href: "logout"}
      ]}
    ]}
  ],
  addUserNavAction: function (action) {
    this.$.userMenu.createComponent(action);
    this.$.userMenu.render();
  },
  handleNavSelect: function(inSender, inEvent) {
    var tapped  = inEvent.originator,
        method  = tapped.href,
        context = tapped.context;

    inEvent.preventDefault();

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
