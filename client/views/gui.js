/**
  For simple applications, you might define all of your views in this file.
  For more complex applications, you might choose to separate these kind definitions
  into multiple files under this folder.
*/

enyo.kind({
  name: "XV.Gui",
  kind: "FittableRows",
  fit: true,
  handlers: {
    onLogoLoaded: "logoLoaded"
  },
  components:[
    {kind: "onyx.Toolbar", name: "header", layoutKind: "FittableHeaderLayout", components: [
      {kind: "XV.Logo", name: "logo"},
      {kind: "XV.Search", name: "search"},
      {kind: 'onyx.MenuDecorator', name: 'userNav', classes: "user-nav", components: [
        {content: "User Menu"},
        {name: 'userMenu', kind: 'onyx.Menu', components: [
          {content: 'New Tab', value: 'newTab'},
          {content: 'Preferences', value: 'preferences'},
          {content: 'Logout', value: 'logout'}
        ]}
      ]}
    ]},
    {kind: "FittableColumns", fit: true, components: [
      {kind: "FittableRows", components: [
        {kind: "XV.ModuleSelector", name: "moduleSelector"},
        {name: "SubModule", content: "subModuleList", fit: true}
      ]},
      {kind: "FittableRows", fit: true, components: [
        {kind: "XV.WorkspaceToolbar", name: "workspaceToolbar"},
        {name: "workspace", content: "Workspace", fit: true},
        {kind: "XV.StatusBar", name: "statusBar"}
      ]}
    ]}
  ],
  rendered: function () {
    this.inherited(arguments);
    this.resize();
  },
  logoLoaded: function () {
    // resize after image is loaded
    this.resize();
  },
  addRightWorkspaceToolbarAction: function (action) {
    this.$.workspaceToolbar.addRightWorkspaceToolbarAction(action);
    return true;
  },
  addLeftWorkspaceToolbarAction: function (action) {
    this.$.workspaceToolbar.addLeftWorkspaceToolbarAction(action);
    return true;
  },
  setLogoImage: function (url) {
    this.$.logo.setImage(url);
    return true;
  }
});
