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
				{name: "logo", kind: "XV.Logo"},
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
  ],
	setLogoImage: function (url) {
		this.$.logo.setImage(url);
		return true;
	}
});
