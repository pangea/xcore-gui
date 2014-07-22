enyo.kind({
	name: 'XV.ModelTable',
	edit: false,
	colsPerRow: 3, // Actually 6 cells,
	model: null,
  components: [
    {
			name: 'itemForm', tag: 'form', classes: 'model-form',
			components: [
        {
			    name: 'mtable',
			    kind: 'enyo.Table',
			    style: 'width: 100%;',
			    attributes: {cellpadding: '2', cellspacing: '2'}
		    }
      ]
		}
  ],
	create: function () {
		this.inherited(arguments);

		var modelKeys = _.keys(this.model.attributes),
        rows = Math.ceil(modelKeys.length / this.colsPerRow);

		for(var i = 0; i<rows; i++) {
			var attrs = [];
			for(var j = 0; j<this.colsPerRow; j++) {
				var attr = modelKeys.shift(),
						newAttr = {};

				if (typeof attr === 'undefined') continue;

				newAttr[attr] = this.model.attributes[attr];
				attrs.push(newAttr);
			}
			this.addRow(attrs);
		}
	},
	addRow: function (attrs) {
		/*** For a three column layout you acutally need 6 cells. ***/
		var cells = [],
        editMode = this.edit;

    _.each(attrs, function(attrHash) {
      cells = _.union(cells, _.map(attrHash, function(value, key) {
        return [
          {content: key + ":", style: 'text-align: right; font-weight: bold;'},
          {components: [
						{
							kind: 'onyx.InputDecorator',
							components: [{
								kind: 'onyx.Input',
                name: key,
								value: value,
                disabled: !editMode
							}]
						}
					]}
        ];
      }));
    });

		this.$.mtable.createComponent({
			components: _.flatten(cells)
		});
	},
	getForm: function() {
		return this.$.itemForm;
	}
});
