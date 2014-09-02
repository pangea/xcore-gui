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
      { name: 'modelTable', kind: 'enyo.Table', classes: 'model-table' }
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
      for(var i = 0, l = Math.ceil(this.fields.length/this.columns); i < l; i++) {
        var row = this.fields.slice(i*3, (i+1)*3);

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
    components: [
      { name: 'modelForm', tag: 'form', components: [
        { name: 'modelTable', kind: 'enyo.Table', classes: 'model-table' }
      ]}
    ],
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
      var that = this,
          components = [];

      enyo.forEach(row, function(field) {
        components.push({ value: field.name, kind: 'XV.AttributeCell' });

        field.value = that.model.get(field.name);
        components.push(field);
      });

      this.$.modelTable.createComponent({
        defaultKind: 'XV.TextInputCell',
        classes: 'model-table-row',
        components: components
      });
    },
	  getFormValues: function() {
      // var form = this.$.modelTable.getForm(),
      //     node = form.hasNode(),
      //     values = {};

      // // Should write some sanitation code here. Especially SQL Injection prevention.
      // if(node) {
      //   for (var i = 0, l = node.elements.length; i < l; i++) {
      //     var el = node.elements.item(i),
      //         name = el.name;

      //     values[name] = el.value;
      //   }
      // }

      // return values;
	  },
	  saveItem: function() {
		  var user = xCore.currentUser();
		  var values = this.getFormValues();

      // Create Audit Log entry?
		  // if (!this.model.hasCreator()) {
      //   values.created_at = new Date();
			//   values.created_by = user.uid;
		  // }

      // values.updated_at = new Date();
      // values.updated_by = user.uid;

      this.model.setObject(values);
      // Use success/fail functions?
      this.model.commit();
      this.dirty = false;
		  this.goBack();
	  }
  });

}());
