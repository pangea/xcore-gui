enyo.kind({
  name: "XV.Search",
  fit: true,
  components : [{
    kind: "onyx.InputDecorator",
    name: "searchBar", 
    classes: "search",
    components: [{
      kind: "onyx.Input",
      style: "width: 100%;"
    }]
  }]
});
