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

