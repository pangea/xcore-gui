enyo.kind({
  name: "XV.ExtensionSubList",
  style: "position: relative;",
  fit: true,
  events: {
  },
  components: [
    {kind: "List", name: "extensionSubList", classes: "enyo-fit extension-sub-list", onSetupItem: "setupItem", components: [
      {name: "extensionSubListItem", classes: "item", ontap: "extensionItemTap", components: [
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
    this.$.extensionSubList.setCount(this.data.length);
  },
  setupItem: function (inSender, inEvent) {
    this.inherited(arguments);

    var i = inEvent.index;
    this.$.extensionSubListItem.setContent(this.data[i]);
    this.$.extensionSubListItem.addRemoveClass("selected", inSender.isSelected(i));    
  },
  extensionItemTap: function(inSender, inEvent) {
    console.log("You tapped on row: " + inEvent.index);
  }
});
