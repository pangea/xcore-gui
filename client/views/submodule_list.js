enyo.kind({
  name: "XV.SubmoduleList",
  style: "position: relative;",
  fit: true,
  events: {
  },
  components: [
    {kind: "List", name: "submoduleList", classes: "enyo-fit submodule-list", onSetupItem: "setupItem", components: [
      {name: "submoduleListItem", classes: "item", ontap: "subModuleItemTap", components: [
      ]}
    ]}
  ],
  data: [],
  create: function () {    
    this.inherited(arguments);
    
    this.data = [];
    for(var i=0;i<10; i++){
      this.data.push("Link " + i);
    }
    this.$.submoduleList.setCount(this.data.length);
  },
  setupItem: function (inSender, inEvent) {
    this.inherited(arguments);

    var i = inEvent.index;
    this.$.submoduleListItem.setContent(this.data[i]);
    this.$.submoduleListItem.addRemoveClass("selected", inSender.isSelected(i));    
  },
  subModuleItemTap: function(inSender, inEvent) {
    console.log("You tapped on row: " + inEvent.index);
  }
});
