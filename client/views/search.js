enyo.kind({
  name: "XV.Search",
  fit: true,
  components : [{
    kind: "onyx.InputDecorator",
    name: "searchBar", 
    style: "width: 40%;",
    components: [{
      kind: "onyx.Input"
    }]
  }]
});
