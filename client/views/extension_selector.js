enyo.kind({
  name: "XV.ExtensionSelector",
  classes: "extension-selector",
  events: {
    onExtensionSelect: ""
  },
  components: [
    { kind: 'bootstrap.DropdownButton', classes: "btn-block", btnAttributes: {block: true}, name: "extensionPickerButton", ontap: "extensionButtonTap", text: "Test", components: [
      {kind: "bootstrap.DropdownMenu", name: "extensionPicker", ontap: "extensionItemTap", count: 0, components: []}
    ]},
  ],
  previouslySelectedItem: null,
  addExtensionToPicker: function (extension) {
    if(!extension.content){
      extension.text = extension.name;
    }
    var added = this.$.extensionPicker.createComponent(extension);
    added.index = this.$.extensionPicker.count;

    this.$.extensionPicker.count++;
    this.$.extensionPicker.render();    

    if(this.$.extensionPicker.count == 1) {
      this.$.extensionPicker.getComponents()[0].addClass('active');    
      this.$.extensionPickerButton.$.button.$.text.setContent(extension.text + " ");
    }
  },
  extensionButtonTap: function(inSender, inEvent) {
    this.previouslySelectedItem = this.$.extensionPickerButton.$.button.$.text;
  },
  extensionItemTap: function(inSender, inEvent) {
    var components = this.$.extensionPicker.getComponents(),
        index = inEvent.originator.originator.index;
    
    if(this.previouslySelectedItem != inEvent.originator.content) {
      components.forEach(function(component) {
        component.removeClass('active');
      });
      
      components[index].addClass('active');
      this.doExtensionSelect(inEvent.originator.content);
      this.$.extensionPickerButton.$.button.$.text.setContent(inEvent.originator.content + " ");
    }
  }
});
