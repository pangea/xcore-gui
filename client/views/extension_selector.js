enyo.kind({
  name: "XV.ExtensionSelector",
  handlers: {
    onSelect: "extensionItemTap"
  },
  events: {
    onExtensionSelect: ""
  },
  components: [
    {kind: "onyx.Toolbar", classes: "white", components: [
      {kind: "FittableColumns", components: [
        {kind: "FittableRows", components: [
          {kind: "onyx.PickerDecorator", classes: "extension-picker", components: [
            {name: "extensionPickerButton", style: "min-width: 200px;", ontap: "extensionButtonTap"},
            {name: "extensionPicker", classes: "extension-picker", kind: "onyx.Picker", count: 0}
          ]}
        ]}
      ]
      }
    ]}
  ],
  previouslySelectedItem: null,
  addExtensionToPicker: function (extension) {
    if(!extension.content){
      extension.content = extension.name;
    }
    var added = this.$.extensionPicker.createComponent(extension);
    this.$.extensionPicker.count++;
    this.$.extensionPicker.render();
    if(this.$.extensionPicker.count == 1) {
      this.$.extensionPicker.setSelected(added);
      this.$.extensionPickerButton.setContent(extension.content);
    }
  },
  extensionButtonTap: function(inSender, inEvent) {
    this.previouslySelectedItem = this.$.extensionPicker.selected.name;
  },
  extensionItemTap: function(inSender, inEvent) {
    if(this.previouslySelectedItem != inEvent.originator.name) {
      this.doExtensionSelect(inEvent.originator.name);
    }
  }
});
