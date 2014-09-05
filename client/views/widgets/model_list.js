enyo.kind({
  name: 'XV.ModelList',
  kind: 'FittableRows',
  fit: true,
  events: {
    onAlert: "",
    onLoadWorkspace: ""
  },
  published: {
    collection: null
  },
  // These components are meant to be overriden in subkinds.  They are here for
  // demonstration purposes only and represent only the basics of what you need.
  components: [
    // If you want to be really fancy, you can add a header here
    // The ability to add things before or after the list is the sole reason we
    // didn't opt for making the ModelList a DataList itself.
    { name: 'list',
      kind: 'DataList',
      classes: 'collection-list',
      fit: true,
      allowTransitions: false,
      renderDelay: null,
      components: [
        { classes: 'item-holder', 
          components: [
            { kind: 'FittableColumns', components: [
              // In here you would put the columns for your model
              // e.g. { name: 'id', fit: true }
            ] }
          ],
          bindings: [
            // Bindings from the model to the column
            // e.g. { from: '.model.id', to: '.$.id.content' }
          ]
        }
      ],
      ontap: 'viewItem'
    }
  ],
  bindings: [
    { from: '.collection', to: '.$.list.collection' }
  ],
  newButton: {kind: 'onyx.Button', method: 'newItem', content: "New", classes: 'text'},
  newItem: function() {
    throw new NotImplementedError("ModelLists must implement the newItem method");
  },
  create: function () {
    var self = this,
        scrimZIndex = 999,
        hideScrim = function() {
          self.$.blocker.hideAtZIndex(scrimZIndex);
        };

    // Ensure the collection is in a form we can use
    switch(typeof(self.collection)) {
      // collection is the name of a kind
      case "string":
        self.set('collection', enyo.createFromKind(self.collection));
        break;

      // collection is the constructor for a kind
      case "function":
        self.set('collection', new self.collection());
        break;
    }

    self.collection.fetch({
      success: hideScrim,
      fail: hideScrim
    });

    self.inherited(arguments);

    self.createComponent({
      name: 'blocker',
      kind: 'onyx.Scrim',
      classes: 'onyx-scrim enyo-fit onyx-scrim-translucent',
      components: [
        { kind: 'XV.FontAwesomeIcon',
          icon: 'spinner',
          classes: 'fa fa-spin',
          style: 'color: #636363'
        }
      ]
    });

    self.$.blocker.showAtZIndex(scrimZIndex);

    self.setupToolbarActions();
  },
  setupToolbarActions: function() {
    this.newButton.context = this;
    xCore.$.gui.addRightWorkspaceToolbarAction(this.newButton);
  }
});
