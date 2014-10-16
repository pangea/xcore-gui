enyo.kind({
  name: "XV.Search",
  fit: true,
  events: {
    onLoadWorkspace: ''
  },
  handlers: {
    onkeypress: 'handleKey'
  },
  published: {
    value: '',
    searching: false,
    searchWorkspace: null
  },
  components : [{
    kind: "onyx.InputDecorator",
    name: "searchBar", 
    classes: "search",
    components: [{
      name: 'input',
      kind: "onyx.Input",
      style: "width: 100%;"
    }]
  }],
  bindings: [
    { from: '.$.input.value', to: '.value' }
  ],
  handleKey: function(inSender, inEvent) {
    if(inEvent.keyCode == 13) { // Enter
      this.beginSearch();
    }
  },
  beginSearch: function() {
    if(!this.searching) {
      this.searching = 0;
      this.addClass('searching');

      var term = this.value,
          exts = xCore.getExtensions(),
          names = Object.keys(exts),
          numSearching = 0,
          searchCallback = (function(results) {
            if(results === false) {
              this.set('searching', this.searching-1);
            } else {
              var workspace = this.$.searchResults;
              workspace.createComponent({
                tag: 'h3',
                content: results.header,
                style: 'border-bottom: 1px solid #ddd'
              });
              workspace.createComponent(results.view);
              workspace.render();
            }
          }).bind(this);

      this.doLoadWorkspace({
        name: 'searchResults',
        kind: 'XV.SearchResults',
        owner: this
      });

      enyo.forEach(names, function(name) {
        var ext = exts[name];
        if(ext.search && ext.search.call) {
          this.searching += 1;

          /* TODO: Callback
           * Callback should return an object:
           * { header: 'foo',
           *   view: {
           *     kind: 'XV.FooSearch',
           *     collection: [a collection of foo's]
           *   }
           * }
           * The `view` will be dropped straight into whatever view is loaded
           * for search.  We can't use the normal list views since the whole
           * list will need to be scrollable and the list views include 
           * scrollers.
           *
           * The callback should be able to be called multiple times.  Calling
           * the callback with a falsy value will signal that the extension is
           * done searching.
           */
          ext.search(term, searchCallback);
        }
      }, this);

      if(this.searching === 0) {
        this.searchFinished();
      }
    }
  },
  searchingChanged: function() {
    if(this.searching === 0) {
      this.searchFinished();
    }
  },
  searchFinished: function() {
    this.set('searching', false);
    this.removeClass('searching');
    this.$.searchResults.searchFinished();
  }
});

enyo.kind({
  name: 'XV.SearchResults',
  kind: 'enyo.Scroller',
  create: enyo.inherit(function(sup) {
    return function() {
      this.leftButtons || (this.leftButtons = []);
      this.centerButtons || (this.centerButtons = []);
      this.rightButtons || (this.rightButtons = []);

      sup.apply(this, arguments);


      if(xCore.$.gui.hasHistory()) {
        this.leftButtons.push({ kind: 'XV.BackButton' });
      }

      this.setupToolbarActions();
    };
  }),
  setupToolbarActions: function() {
    var leftButtons = this.leftButtons,
        centerButtons = this.centerButtons,
        rightButtons = this.rightButtons,
        applyButtons = function (position, btn) {
          btn.context = this;
          var fn = 'add' + position + 'WorkspaceToolbarAction';
          xCore.$.gui[fn](btn);
        };

    _.each(leftButtons, applyButtons.bind(this, 'Left'));
		_.each(centerButtons, applyButtons.bind(this, 'Center'));
    _.each(rightButtons, applyButtons.bind(this, 'Right'));
  },
  searchFinished: function() {
    
  }
});
