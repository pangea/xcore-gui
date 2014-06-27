enyo.kind({
  name: "XV.WorkspaceToolbar",
  events: {},
  components: [
    {kind: "onyx.Toolbar", classes: "white workspace-toolbar", layoutKind: "FittableHeaderLayout", components: [
      {kind: "FittableColumns", fit: true, components: [
        {kind: "FittableRows", name: "leftActionGroup", ontap: "workspaceToolbarActionSelected", style: "width: 50%;", defaultKind: 'onyx.Button'},
        {kind: "FittableRows", name: "rightActionGroup", ontap: "workspaceToolbarActionSelected", style: "width: 50%; text-align: right;", defaultKind: 'onyx.Button'}
      ]}
    ]}
  ],
  addRightWorkspaceToolbarAction: function (action) {
    this.$.rightActionGroup.createComponent(action);
    this.$.rightActionGroup.render();
  },
  addLeftWorkspaceToolbarAction: function (action) {
    this.$.leftActionGroup.createComponent(action);
    this.$.leftActionGroup.render();
  },
  workspaceToolbarActionSelected: function (inSender, inEvent) {
    var action = inEvent.originator,
        method;

    if(action.method) {
      console.log( action.method );
    }
  }
});
