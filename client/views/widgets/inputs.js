/*** Text Input Field ***/
enyo.kind({
	name: 'XV.TextInput',
	kind: 'onyx.InputDecorator',
	attrs: {},
	components: [{
		name: 'tiInput',
		kind: 'onyx.Input',
		type: 'text'
	}],
	create: function() {
		this.inherited(arguments);
		this.$.tiInput.set('value', this.attrs.value);
		this.$.tiInput.attributes.name = this.attrs.name;
	}
});

/*** Text Area Field ***/
enyo.kind({
	name: 'XV.TextArea',
	kind: 'onyx.InputDecorator',
	attrs: {},
	components: [{
		name: 'textArea',
		kind: 'onyx.TextArea'
	}],
	create: function() {
		this.inherited(arguments);
		this.$.textArea.set('value', this.attrs.value);
		this.$.textArea.attributes.name = this.attrs.name;
	}
});

/*** ZipCode Input Field ***/
enyo.kind({
	name: 'XV.ZipCodeInput',
	kind: 'onyx.InputDecorator',
	attrs: {},
	components: [{
		name: 'zcInput',
		kind: 'onyx.Input',
		type: 'text',
		attributes: {
			pattern: "[0-9]{5}",
			title: "5 number zip code"
		}
	}],
	create: function() {
		this.inherited(arguments);
		this.$.zcInput.set('value', this.attrs.value);
		this.$.zcInput.attributes.name = this.attrs.name;
	}
});


/*** Telephone Input Field ***/
enyo.kind({
	name: 'XV.TelephoneInput',
	kind: 'onyx.InputDecorator',
	attrs: {},
	components: [{
		name: 'telInput',
		kind: 'onyx.Input',
		type: 'tel',
		attributes: {
			pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{4}",
			title: "10 digit phone number xxx-xxx-xxxx"
		}
	}],
	create: function() {
		this.inherited(arguments);
		this.$.telInput.set('value', this.attrs.value);
		this.$.telInput.attributes.name = this.attrs.name;
	}
});
