enyo.kind({
  name: "XV.Workspace",
  kind: "Panels",
  fit: true,
  events: {
  },
	handlers: {
		onChangeWorkspace: function(inSender, inEvent) {
			console.log("Caught it");
		}
	},
  components: []  
});
