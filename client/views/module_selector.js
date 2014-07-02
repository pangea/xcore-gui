enyo.kind({
  name: "XV.ModuleSelector",
  events: {
    onModuleSelect: ""
  },
  components: [
    {kind: "onyx.Toolbar", classes: "white", components: [
      {kind: "FittableColumns", components: [
        {kind: "FittableRows", components: [
          {kind: "onyx.PickerDecorator", classes: "module-picker", components: [
            {name: "modulePickerButton", style: "min-width: 200px;"},
            {name: "modulePicker", classes: "module-picker", kind: "onyx.Picker", count: 0, ontap: "moduleItemTap"}
          ]}
        ]}
      ]
      }
    ]}
  ],
  addModuleToPicker: function (module) {
    if(!module.content){
      module.content = module.name;
    }
    var added = this.$.modulePicker.createComponent(module);
    this.$.modulePicker.count++;
    this.$.modulePicker.render();
    if(this.$.modulePicker.count == 1) {
      this.$.modulePicker.setSelected(added);
      this.$.modulePickerButton.setContent(module.content);
    }
  },
  moduleItemTap: function(inSender, inEvent) {
    this.doModuleSelect(inEvent.originator.name);
  }
});
