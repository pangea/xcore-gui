enyo.kind({
  name: "XV.ExtensionSubList",
  kind: "Panels",
  fit: true,
  data: [],
  events: {
    onSubListSelect: ""
  },
  components: [
    {name: "list", kind: "List", fit: true, multiSelect: false, classes: "extension-sub-list", onSetupItem: "setupItem", components: [
			{ name: 'sublist_item', classes: 'item', ontap: 'itemTap', components: [
				{ name: 'sublist_module' }
			]}
    ]}
  ],
  create: function() {
    this.inherited(arguments);
    this.$.list.count = this.data.length;
  },
  setupItem: function(inSender, inEvent) {
		var idx = inEvent.index;
		var item = this.data[idx];
		this.$.sublist_module.setContent(item.name);
console.log(this.$.sublist_item);
console.log("--------------------------");
console.log(this.$);
    this.$.sublist_item.addRemoveClass("selected", inSender.isSelected(idx));
    return true;
  },
  itemTap: function(inSender, inEvent) {
		var idx = inEvent.index;
		this.doSubListSelect(this.data[idx]);
    this.$.list.select(idx);
  }
});
