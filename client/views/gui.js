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
    onLogoLoaded: "logoLoaded",
    onModuleSelect: "moduleSelected"
  },
  components:[
    {kind: "onyx.Toolbar", name: "header", layoutKind: "FittableHeaderLayout", components: [
      {kind: "XV.Logo", name: "logo"},
      {kind: "XV.Search", name: "search"},
      {kind: "XV.UserNav", name: "userNav"}
    ]},
    {kind: "FittableColumns", components: [
      {kind: "FittableRows", components: [
        {kind: "XV.ModuleSelector", name: "moduleSelector"}
      ]},
      {kind: "FittableRows", fit: true, components: [
        {kind: "XV.WorkspaceToolbar", name: "workspaceToolbar"}
      ]}
    ]},
    {kind: "FittableColumns", fit: true, components: [
      {kind: "FittableRows", style: "width: 18%;", components: [
        {kind: "XV.SubmoduleList", name: "submoduleList"}
      ]},
      {kind: "FittableRows", fit: true, components: [
        {name: "workspace", content: "Workspace", fit: true},
        {kind: "XV.StatusBar", name: "statusBar"}
      ]}
    ]}
  ],
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
  registerModule: function (module) {
    this.$.moduleSelector.addModuleToPicker(module);
    return true;
  },
  moduleSelected: function (name) {
    var modules = xCore.getModules(),
        module = modules[name];

    module.loadSubmoduleList(this.$.submoduleList);
  },
  rendered: function () {
    this.inherited(arguments);
    this.resize();
  },
  logoLoaded: function () {
    // resize after image is loaded
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
  setLogoImage: function (url) {
    this.$.logo.setImage(url);
    return true;
  }
});
