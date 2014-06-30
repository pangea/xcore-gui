enyo.kind({
  name: "XV.ModuleSelector",
  events: {},
  components: [
    {kind: "onyx.Toolbar", classes: "white", components: [
      {kind: "FittableColumns", components: [
        {kind: "FittableRows", components: [
          {kind: "onyx.PickerDecorator", classes: "module-picker", components: [
            {content: "Test Module"}, // onyx.PickerButton
            {name: "modulePicker", classes: "module-picker", kind: "onyx.Picker"}
          ]}
        ]}
      ]
      }
    ]}
  ]
});
