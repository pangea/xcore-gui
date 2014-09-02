enyo.kind({
  name: 'XV.Sublist',
  events: {
    onLoadWorkspace: ""
  },
  published: {
    items: []
  },
  components: [
    { name: "list",
      kind: "List",
      fit: true,
      classes: "extension-sub-list",
      onSetupItem: "setupItem",
      components: [
        { name: "sublistItem",
          classes: 'item',
          ontap: "itemTap",
          components: [
            { name: "sublistModule" }
          ]
        }
      ]
    }
  ],
  create: enyo.inherit(function(sup) {
    return function() {
      sup.call(this, arguments);
      // apparently, data bindings don't work for this...
      this.$.list.setCount(this.items.length);
    };
  }),
  setupItem: function(inSender, inEvent) {
    var i = inEvent.index,
        item = this.getItems()[i];
    this.$.sublistModule.setContent(item.name);
    this.$.sublistItem.addRemoveClass('selected', inSender.isSelected(i));
    return true;
  },
  itemTap: function(inSender, inEvent) {
    var i = inEvent.index;
    this.doLoadWorkspace(this.getItems()[i]);
    this.$.list.select(i);
  }
});
