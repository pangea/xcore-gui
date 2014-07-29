enyo.kind({
	name: 'XV.ModelTable',
	edit: false,
	colsPerRow: 3, // Actually 6 cells,
	model: null,
	style: 'font-size: 12px;',
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

		var modelKeys = enyo.keys(this.model.editable);
        rows = Math.ceil(modelKeys.length / this.colsPerRow);

		for(var i = 0; i<rows; i++) {
			var attrs = [];
			for(var j = 0; j<this.colsPerRow; j++) {
				var attr = modelKeys.shift(),
						newAttr = {};

				if (typeof attr === 'undefined') continue;

				newAttr[attr] = this.model.get(attr) || '';
				attrs.push(newAttr);
			}
			this.addRow(attrs);
		}
	},
	addRow: function (attrs) {
		/*** For a three column layout you acutally need 6 cells. ***/
		var cells = [],
        editMode = this.edit;

		enyo.forEach(attrs, function(attr) {
			for (key in attr) {
				var valueCell;
				if (editMode) { // make valueCell an editor
					valueCell = this.model.editable[key] ? 
						{
							kind: this.model.editable[key].editor,
							attrs: {
								name: key,
								value: attr[key]
							}
						} :
						{
							kind: 'onyx.InputDecorator',
							components: [{
								kind: 'onyx.Input',
        				name: key,
								value: attr[key],
        				attributes: {
        				  name: key
        				}
							}]
						};
				} else { // valueCell should be a viewer
					if (this.model.editable[key]) {
						if (this.model.editable[key].viewer === 'enyo.Component') {
							valueCell = {content: attr[key]}
						} else {
							valueCell = {
								kind: this.model.editable[key].viewer,
								attrs: {
									name: key,
									value: attr[key]
								}
							}
						}
					} else {
						valueCell = {
							content: attr[key]
						};
					}					
				}

				cells.push({
					content: key + ':', style: 'width: 15%; text-align: right; font-weight: bold;'
				});
				cells.push({
					kind: "enyo.TableCell",
					style: 'width: 15%;',
					components: [
						valueCell
					]			
				});
			}
		}, this);

		this.$.mtable.createComponent({
			components: cells
		});

	},
	getForm: function() {
		return this.$.itemForm;
	}
});
