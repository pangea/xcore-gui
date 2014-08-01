enyo.kind({
	name: 'XV.Yesify',
	kind: 'enyo.Control',
	create: function() {
		this.inherited(arguments);
		content = this.attrs.value === 'true' ? 'Yes' : 'No';
		this.addContent(content);
	}
});
