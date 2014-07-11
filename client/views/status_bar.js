enyo.kind({
  name: "XV.StatusBar",
  events: {
    onStatusBarItemAdded: ''
  },
  components: [
    {kind: "onyx.Toolbar", layoutKind: "FittableHeaderLayout", components: [
      {kind: "FittableColumns", fit: true, components: [
        {kind: "FittableRows", name: "alerts", style: "width: 50%;", components: [
          {kind: "Notification", name: "notif"}
        ]},
        {kind: "FittableRows", name: "icons", style: "width: 50%;"}
      ]}
    ]}
  ],
  addStatusBarIcon: function (action) {
    this.$.icons.createComponent(action);
    this.$.icons.render();
    this.doStatusBarItemAdded();
  },
  addStatusBarAlertAction: function(inEvent, alert) {
    var type = alert.type,
        content = alert.content,
        title = alert.title ? alert.title : '',
        icon = alert.icon ? alert.icon : '';

    this.$.notif.sendNotification({ 
      type: type,
      title: title,
      message: content,
      icon: icon,
      theme: "notification.MessageBar",
      stay: true,
      duration: undefined
    });
    this.doStatusBarItemAdded();
  }
});
