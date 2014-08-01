(function() {
  enyo.kind({
	  name: 'XV.ModelView',
	  kind: 'enyo.FittableRows',
	  model: null,
	  edit: false,
    dirty: false,
	  events: {
		  onSubListSelect: '',
		  onStatusAlert: ''
	  },
    handlers: {
      onchange: 'markDirty'
    },
    buttons: {
      leftButtons: [
			  {kind: 'onyx.Button', method: 'goBack', classes: 'fa fa-reply'}
      ],
		  centerButtons: [],
      rightButtons: [
			  {kind: 'onyx.Button', method: 'editItem', classes: 'fa fa-edit'}
      ]
    },
    markDirty: function() {
      this.dirty = true;
    },
	  create: function () {
		  this.inherited(arguments);

		  this.createComponent({
			  name: 'modelTable',
			  kind: 'XV.ModelTable',
			  model: this.model,
			  edit: this.edit
		  });

		  this.setupToolbarActions();
	  },
    setupToolbarActions: function() {
      var that = this,
          leftButtons = this.buttons.leftButtons,
          centerButtons = this.buttons.centerButtons,
          rightButtons = this.buttons.rightButtons,
          applyButtons = function (position, btn) {
            btn.context = that;
            var fn = 'add' + position + 'WorkspaceToolbarAction';
            xCore.$.gui[fn](btn);
          };

      if(this.model.isNew || this.edit) {
        rightButtons = [
          {kind: 'onyx.Button', method: 'saveItem', classes: 'fa fa-save'}
        ];
      }

      _.each(leftButtons, applyButtons.bind(this, 'Left'));
		  _.each(centerButtons, applyButtons.bind(this, 'Center'));
      _.each(rightButtons, applyButtons.bind(this, 'Right'));
    },
	  goBack: function() {
      var verified = true;

      if(this.dirty) {
        verified = confirm('You have unsaved changes, are you sure you want to go back?');
      }

		  // TODO: doSubListSelect should be renamed to doSetWorkspace or something
      //       since that's what it does.
      if(verified) {
        if(this.edit && !this.model.isNew) {
		      this.doSubListSelect({
			      name: 'itemView',
            kind: this.kind,
			      model: this.model,
            edit: false
		      });
        } else {
          // TODO: Not sure I like this, but it should work
		      this.doSubListSelect({name: 'itemList', kind: this.kind + 'List'});
        }
      }
	  },
	  editItem: function(inSender, inEvent) {
		  this.doSubListSelect({
			  name: 'itemEditor',
        kind: this.kind,
			  model: this.model,
        edit: true
		  });
    },
	  getFormValues: function() {
      var form = this.$.modelTable.getForm(),
          node = form.hasNode(),
          values = {};

      /*** Should write some sanitation code here. Especially SQL Injection prevention. ***/
      if(node) {
        for (var i = 0, l = node.elements.length; i < l; i++) {
          var el = node.elements.item(i),
              name = el.name;

          values[name] = el.value;
        }
      }

      return values;
	  },
	  saveItem: function() {
		  var user = xCore.currentUser();
		  var values = this.getFormValues();

		  if (!this.model.hasCreator()) {
        values.created_at = new Date();
			  values.created_by = user.uid;
		  }

      values.updated_at = new Date();
      values.updated_by = user.uid;

      this.model.setObject(values);
      this.model.commit();
      this.dirty = false;
		  this.goBack();
	  }
  });
}());
