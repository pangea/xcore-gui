(function() {
  enyo.kind({
    name: 'XV.ModelUI',
    kind: 'enyo.Scroller',
    published: {
	    model: null,
      fields: [],
      columns: 3
    },
	  events: {
		  onLoadWorkspace: '',
		  onStatusAlert: ''
	  },
    components: [
      { name: 'modelTable', kind: 'enyo.Table', classes: 'model-table' },
      { name: 'blocker',
        kind: 'onyx.Scrim',
        classes: 'onyx-scrim enyo-fit onyx-scrim-translucent',
        components: [
          { kind: 'XV.FontAwesomeIcon',
            icon: 'spinner',
            classes: 'fa-spin',
            style: 'color: #636363'
          }
        ]
      }
    ],
    leftButtons: [
			{kind: 'onyx.Button', method: 'goBack', classes: 'fa fa-reply'}
    ],
		centerButtons: [],
    rightButtons: [],
    create: enyo.inherit(function(sup) {
      return function() {
        sup.apply(this, arguments);

        this.setupRows();

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
    setupRows: function() {
      var fields = this.fields,
          cols = this.columns;

      for(var i = 0, l = Math.ceil(fields.length/cols); i < l; i++) {
        var row = fields.slice(i*cols, (i+1)*cols);

        this.setupRow(row);
      }
    },
    setupRow: function(row) {
      throw new Error('Not Implemented');
    },
	  goBack: function() {
      throw new Error('Not Implemented');
	  }
  });

  enyo.kind({
	  name: 'XV.ModelView',
	  kind: 'XV.ModelUI',
    rightButtons: [
			{kind: 'onyx.Button', method: 'editItem', classes: 'fa fa-edit'}
    ],
    setupRow: function(row) {
      var that = this,
          components = [];

      enyo.forEach(row, function(field) {
        components.push({ value: field.name, kind: 'XV.AttributeCell' });

        field.value = that.model.get(field.name);
        components.push(field);
      });

      this.$.modelTable.createComponent({
        defaultKind: 'XV.ValueCell',
        classes: 'model-table-row',
        components: components
      });
    },
	  editItem: function(inSender, inEvent) {
      // Example implementation
		  // this.doLoadWorkspace({
			//   name: 'itemEditor',
      //   kind: 'XV.ModelEditor',
			//   model: this.model,
      //   edit: true
		  // });
      throw new Error('Not Implemented');
    }
  });

  enyo.kind({
    name: 'XV.ModelEditor',
    kind: 'XV.ModelUI',
    published: {
      dirty: false
    },
    handlers: {
      onchange: 'markDirty'
    },
    rightButtons: [
		  {kind: 'onyx.Button', method: 'saveItem', classes: 'fa fa-save'}
    ],
    markDirty: function() {
      this.dirty = true;
    },
    /**
     * This implementation of goBack is a partial method implmenting only
     * verification for dirty models.
     * Subkinds should override this method as part of their implmentations, but
     * should ensure it is called using one of enyo's inheritence methods.
     */
    goBack: function() {
      var verified = true;

      if(this.dirty) {
        verified = confirm('You have unsaved chages, are you sure you want to go back?');
      }

      return verified;
    },
    setupRow: function(row) {
      var components = [];

      enyo.forEach(row, function(field) {
        components.push({ value: field.name, kind: 'XV.AttributeCell' });

        field.value = this.model.get(field.name);
        components.push(field);
      }, this);

      this.$.modelTable.createComponent({
        defaultKind: 'XV.TextInputCell',
        classes: 'model-table-row',
        components: components
      });
    },
	  getFormValues: function() {
      var values = {};

      enyo.forEach(this.fields, function(field) {
        // Normally, doing this would be considered bad practice (it still kinda is)
        // but I think it's okay in this case since we can actually reasonably
        // assume the structure of modelTable
        values[field.name] = this.$.modelTable.$[field.name].value;
      }, this);

      return values;
	  },
	  saveItem: function() {
		  var that = this,
          user = xCore.currentUser(),
          values = this.getFormValues(),
          scrimZIndex = 999;

      // Create Audit Log entry?
      // should probably be done on the server.

      this.model.setObject(values);

      this.$.blocker.showAtZIndex(scrimZIndex);

      this.model.commit({
        success: function() {
          that.$.blocker.hideAtZIndex(scrimZIndex);
          that.dirty = false;
		      that.goBack();
        },
        fail: function(inEvent, opts, res) {
          console.log(arguments);
          that.$.blocker.hideAtZIndex(scrimZIndex);
          // TODO: Better error message
          that.doStatusAlert({
            type: 'danger',
            title: 'Save Failed',
            content: 'An error prevented this object from saving.',
            stay: false
          });
        }
      });
	  }
  });

}());
