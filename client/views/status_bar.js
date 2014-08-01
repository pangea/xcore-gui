enyo.kind({
  name: "XV.StatusBar",
  events: {
    onStatusBarItemAdded: ''
  },
	getNotification: function () {
		return this.$.notif;
	},
  components: [
    {kind: "onyx.Toolbar", classes: "status-bar", layoutKind: "FittableHeaderLayout", components: [
      {kind: "FittableColumns", fit: true, components: [
        {kind: "FittableRows", name: "alerts", classes: "alert", style: "width: 50%;", components: [
          {kind: "Notification", name: "notif"}
        ]},
        {kind: "FittableRows", name: "icons", style: "width: 50%; text-align: right;"}
      ]}
    ]}
  ],
  addStatusBarIcon: function (action) {
    this.$.icons.createComponent(action);
    this.$.icons.render();
    this.doStatusBarItemAdded();
  },
  addStatusBarAlertAction: function(inEvent, alert) {
    console.log(alert);
    var type = alert.type ? alert.type : 'info',
        content = alert.content,
        title = alert.title ? alert.title : '',
        icon = alert.icon ? alert.icon : '' ,
        duration = alert.duration ? alert.duration : undefined,
        stay = alert.stay == false ? false : true,
        theme = alert.theme ? alert.theme : 'notification.MessageBar';

    console.log(duration);
    console.log(stay);
    this.$.notif.sendNotification({ 
      type: type,
      title: title,
      message: content,
      icon: icon,
      theme: theme,
      stay: stay,
      duration: duration
    });
    this.doStatusBarItemAdded();
  }
});
