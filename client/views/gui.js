/**
  For simple applications, you might define all of your views in this file.
  For more complex applications, you might choose to separate these kind definitions
  into multiple files under this folder.
*/

enyo.kind({
  name: "XV.gui",
  kind: "FittableRows",
  fit: true,
  handlers: {
    onLogoLoaded: "logoLoaded"
  },
  components:[
    {kind: "onyx.Toolbar", name: "header", layoutKind: "FittableHeaderLayout", components: [
      {kind: "XV.Logo", name: "logo"},
      {kind: "XV.Search", name: "search"},
      {kind: "onyx.Button", name: "userNav", content: "User Nav"},
      {kind: "onyx.Button", name: "help", content: "Help Link"}
    ]},
    {kind: "FittableColumns", fit: true, components: [
      {kind: "FittableRows", components: [
        {kind: "onyx.Toolbar", layoutKind: "FittableHeaderLayout", components: [
          {kind: "FittableColumns", components: [
             {kind: "FittableRows", style: "width: 50%;", components: [
               {kind: "onyx.Button", content: "Action 1"}
             ]}
           ]
          }
        ]}        
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
  addRightAction: function (action) {
    this.$.workspaceToolbar.addRightAction(action);
    return true;
  },
  addLeftAction: function (action) {
    this.$.workspaceToolbar.addLeftAction(action);
    return true;
  },
  setLogoImage: function (url) {
    this.$.logo.setImage(url);
    return true;
  }
});
