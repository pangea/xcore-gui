/**
  For simple applications, you might define all of your views in this file.
  For more complex applications, you might choose to separate these kind definitions
  into multiple files under this folder.
*/

enyo.kind({
  name: "XV.Gui",
  kind: "XV.GuiInterface",
  fit: true,
  handlers: {
    onLogoLoaded: "resizeGui",
    onExtensionSelect: "extensionSelected",
    onSubListSelect: "subListSelected",
    onStatusBarItemAdded: 'resizeGui',
    onNotificationRendered: 'resizeGui'
  },
  components:[
    {kind: "onyx.Toolbar", name: "header", layoutKind: "FittableHeaderLayout", components: [
      {kind: "XV.Logo", name: "logo"},
      {kind: "XV.Search", name: "search"},
      {kind: "XV.UserNav", name: "userNav"}
    ]},
    {kind: "FittableColumns", components: [
      {kind: "FittableRows", components: [
        {kind: "XV.ExtensionSelector", name: "extensionSelector"}
      ]},
      {kind: "FittableRows", fit: true, components: [
        {kind: "XV.WorkspaceToolbar", name: "workspaceToolbar"}
      ]}
    ]},
    {kind: "FittableColumns", fit: true, components: [
      {kind: "FittableRows", style: "width: 18%;", components: [
        {kind: "XV.ExtensionSubList", name: "extensionSubList"}
      ]},
      {kind: "FittableRows", fit: true, components: [
        {kind: "XV.Workspace", name: "workspace"},
        {kind: "XV.StatusBar", name: "statusBar"}
      ]}
    ]}
  ],
  extensions: null,  
  currentExtension: null,
  create: function() {
    // Check to make sure font awesome hasn't already been loaded
    var fontAwesome = document.getElementById('font-awesome-css');
    if(!fontAwesome) {
      fontAwesome = document.createElement('link');
      fontAwesome.id = 'font-awesome-css';
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = '//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css';
      document.getElementsByTagName('head').item(0).appendChild(fontAwesome);
    }
    this.inherited(arguments);
  },
  registerExtension: function (extension) {
    this.extensions = xCore.getExtensions();
    this.$.extensionSelector.addExtensionToPicker(extension);

    if(Object.keys(this.extensions).length === 1) {
      this.currentExtension = extension;
      extension.loadSubList(this.$.extensionSubList);
    }
    return true;
  },
  extensionSelected: function (inEvent, name) {
    this.currentExtension = this.extensions[name];
    
    this.$.workspace.destroyClientControls();
    this.$.extensionSubList.destroyClientControls();
    this.currentExtension.loadSubList(this.$.extensionSubList);
  },
  subListSelected: function(inEvent, name) {
    this.$.workspace.destroyClientControls();
    this.currentExtension.loadWorkspace(this.$.workspace, name);
  },
  rendered: function () {
    this.inherited(arguments);
    this.resize();
  },
  resizeGui: function() {
    this.resize();
  },
  addUserNavAction: function (action) {
    this.$.userNav.addUserNavAction(action);
    return true;
  },
  addRightWorkspaceToolbarAction: function (action) {
    this.$.workspaceToolbar.addRightWorkspaceToolbarAction(action);
    return true;
  },
  addLeftWorkspaceToolbarAction: function (action) {
    this.$.workspaceToolbar.addLeftWorkspaceToolbarAction(action);
    return true;
  },  
  addStatusBarIcon: function (action) {
    this.$.statusBar.addStatusBarIcon(action);
    return true;
  },  
  setLogoImage: function (url) {
    this.$.logo.setImage(url);
    return true;
  },
  addStatusBarAlertAction: function(inEvent, alert) {
    this.$.statusBar.addStatusBarAlertAction(inEvent, alert);
    return true;
  }
});
