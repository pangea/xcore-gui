/**
  For simple applications, you might define all of your views in this file.
  For more complex applications, you might choose to separate these kind definitions
  into multiple files under this folder.
*/

enyo.kind({
  name: "XV.MainView",
  kind: "FittableRows",
  fit: true,
  components:[
    {kind: "FittableColumns",
      name: "header",
      classes: "xcore-header",
      components: [
        {name: "logo", fit: true, components: [
          {kind: "enyo.Image", src: "images/logo.png", classes: "logo"}
        ]},
        {name: "searchBar", content: "SearchBar", fit: true},
        {name: "userNav", content: "UserNav", fit: true}
      ]
    },
    {kind: "FittableColumns",
      components: [
        {content: "Sidebar"},
        {content: "Workspace", fit: true}
      ]
    }
  ]
});
