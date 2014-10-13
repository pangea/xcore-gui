enyo.kind({
  name: 'XV.ModelList',
  kind: 'FittableRows',
  fit: true,
  events: {
    onAlert: "",
    onLoadWorkspace: ""
  },
  published: {
    collection: null,
    leftButtons: null,
    centerButtons: null,
    rightButtons: null
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
  newItem: function() {
    throw new Error("ModelLists must implement the newItem method");
  },
  /**
   * setupFetch allows subclasses to add additional information to the options
   * passed into the collection's fetch method.
   *
   * @param {Object} options the options passed into collection.fetch()
   */
  setupFetch: enyo.nop,
  create: enyo.inherit(function(sup) {
    return function () {
      var self = this,
          scrimZIndex = 999,
          hideScrim = function() {
            self.$.blocker.hideAtZIndex(scrimZIndex);
          },
          fetchOptions = {
            success: hideScrim,
            fail: hideScrim
          };

      // Ensure the collection is in a form we can use
      if(enyo.isString(this.collection)) {
        this.collection = enyo.getPath(this.collection);
      }

      if(enyo.isFunction(this.collection)) {
        this.collection = new this.collection();
      }

      this.setupFetch(fetchOptions);

      this.collection.fetch(fetchOptions);

      // setup button arrays
      // For some reason, doing this the 'normal' way results in all lists
      // sharing these arrays.  This is bad for a number of reasons
      // TODO: poke enyo guys about this.  It seems like something that should
      //       be fixed farther down
      this.leftButtons || (this.leftButtons = []);
      this.centerButtons || (this.centerButtons = []);
      this.rightButtons || (this.rightButtons = [
        {kind: 'onyx.Button', method: 'newItem', content: "New", classes: 'text'}
      ]);

      sup.apply(this, arguments);

      this.createComponent({
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

      this.$.blocker.showAtZIndex(scrimZIndex);

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
  }
});
