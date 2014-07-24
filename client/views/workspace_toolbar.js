enyo.kind({
  name: "XV.WorkspaceToolbar",
  events: {},
  components: [
    {kind: "onyx.Toolbar", classes: "white workspace-toolbar", layoutKind: "FittableHeaderLayout", components: [
      {kind: "FittableColumns", fit: true, components: [
        {kind: "FittableRows", name: "leftActionGroup", ontap: "workspaceToolbarActionSelected", defaultKind: 'onyx.Button'},
				{kind: "FittableRows", name: "centerActionGroup", ontap: "workspaceToolbarActionSelected", style: 'padding-left: 15px;', defaultKind: 'onyx.Button'},
        {kind: "FittableRows", name: "rightActionGroup", ontap: "workspaceToolbarActionSelected", defaultKind: 'onyx.Button', style: 'float: right;'}
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
	addCenterWorkspaceToolbarAction: function (action) {
    this.$.centerActionGroup.createComponent(action);
    this.$.centerActionGroup.render();
  },
  clearWorkspaceToolbar: function() {
    this.$.rightActionGroup.destroyClientControls();
    this.$.leftActionGroup.destroyClientControls();
		this.$.centerActionGroup.destroyClientControls();
  },
  workspaceToolbarActionSelected: function (inSender, inEvent) {
    var action = inEvent.originator,
        method;
 
    if(action.method) {
      if(action.context) {
        action.context[action.method]();
      } else {
        xCore.$.gui.currentExtension[action.method]();
      }
    }
  }
});
