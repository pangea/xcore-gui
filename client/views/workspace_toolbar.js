enyo.kind({
  name: "XV.WorkspaceToolbar",
  events: {},
  components: [
    {kind: "onyx.Toolbar", layoutKind: "FittableHeaderLayout", components: [
      {kind: "FittableColumns", fit: true, components: [
        {kind: "FittableRows", name: "leftActionGroup", ontap: "actionSelected", style: "width: 50%;", defaultKind: 'onyx.Button'},
        {kind: "FittableRows", name: "rightActionGroup", ontap: "actionSelected", style: "width: 50%; text-align: right;", defaultKind: 'onyx.Button'}
      ]}
    ]}
  ],
  addRightAction: function (action) {
    this.$.rightActionGroup.createComponent(action);
    this.$.rightActionGroup.render();
  },
  addLeftAction: function (action) {
    this.$.leftActionGroup.createComponent(action);
    this.$.leftActionGroup.render();
  },
  actionSelected: function (inSender, inEvent) {
    var action = inEvent.originator,
        method;

    if(action.method) {
      console.log( action.method );
    }
  }
});
