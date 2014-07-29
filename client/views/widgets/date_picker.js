enyo.kind({
	name: 'XV.DatePicker',
	kind: 'onyx.InputDecorator',
	attrs: {},
	components: [{
		name: 'attrDate',
		kind: 'onyx.Input',
		type: 'date',
		attributes: {}
	}],
	create: function() {
		this.inherited(arguments);
		this.$.attrDate.set('value', this.attrs.value);
		this.$.attrDate.attributes.name = this.attrs.name;
	}
});
