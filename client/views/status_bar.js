enyo.kind({
  name: "XV.StatusBar",
  events: {},
  components: [
    {kind: "onyx.Toolbar", layoutKind: "FittableHeaderLayout", components: [
      {kind: "FittableColumns", fit: true, components: [
        {kind: "FittableRows", name: "alerts", style: "width: 50%;"},
        {kind: "FittableRows", name: "icons", style: "width: 50%;"}
      ]}
    ]}
  ]
});
