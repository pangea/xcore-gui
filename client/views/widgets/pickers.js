enyo.kind({
	name: 'XV.Select',
	kind: 'enyo.Select',
	onchange: 'selectChanged',
	create: function() {
		this.inherited(arguments);
		this.attributes.name = this.attrs.name;
		enyo.forEach(this.children, function(option, idx) {
			if (option.value === this.attrs.value) {
				this.set('selected', idx);
			}
		}, this);
	},
	selectChanged: function(inSender, inEvent) {}
});

enyo.kind({
	name: 'XV.BooleanPicker',
	kind: 'XV.Select',
	components: [
		{content: "Yes", value: "true"},
		{content: "No", value: "false"}
	]
});

enyo.kind({
	name: 'XV.StatePicker',
	kind: 'XV.Select',
	components: [
		{ value: "AL", content:"Alabama" },
		{ value: "AK", content:"Alaska" },
		{ value: "AZ", content:"Arizona" },
		{ value: "AR", content:"Arkansas" },
		{ value: "CA", content:"California" },
		{ value: "CO", content:"Colorado" },
		{ value: "CT", content:"Connecticut" },
		{ value: "DE", content:"Delaware" },
		{ value: "DC", content:"District Of Columbia" },
		{ value: "FL", content:"Florida" },
		{ value: "GA", content:"Georgia" },
		{ value: "HI", content:"Hawaii" },
		{ value: "ID", content:"Idaho" },
		{ value: "IL", content:"Illinois" },
		{ value: "IN", content:"Indiana" },
		{ value: "IA", content:"Iowa" },
		{ value: "KS", content:"Kansas" },
		{ value: "KY", content:"Kentucky" },
		{ value: "LA", content:"Louisiana" },
		{ value: "ME", content:"Maine" },
		{ value: "MD", content:"Maryland" },
		{ value: "MA", content:"Massachusetts" },
		{ value: "MI", content:"Michigan" },
		{ value: "MN", content:"Minnesota" },
		{ value: "MS", content:"Mississippi" },
		{ value: "MO", content:"Missouri" },
		{ value: "MT", content:"Montana" },
		{ value: "NE", content:"Nebraska" },
		{ value: "NV", content:"Nevada" },
		{ value: "NH", content:"New Hampshire" },
		{ value: "NJ", content:"New Jersey" },
		{ value: "NM", content:"New Mexico" },
		{ value: "NY", content:"New York" },
		{ value: "NC", content:"North Carolina" },
		{ value: "ND", content:"North Dakota" },
		{ value: "OH", content:"Ohio" },
		{ value: "OK", content:"Oklahoma" },
		{ value: "OR", content:"Oregon" },
		{ value: "PA", content:"Pennsylvania" },
		{ value: "RI", content:"Rhode Island" },
		{ value: "SC", content:"South Carolina" },
		{ value: "SD", content:"South Dakota" },
		{ value: "TN", content:"Tennessee" },
		{ value: "TX", content:"Texas" },
		{ value: "UT", content:"Utah" },
		{ value: "VT", content:"Vermont" },
		{ value: "VA", content:"Virginia" },
		{ value: "WA", content:"Washington" },
		{ value: "WV", content:"West Virginia" },
		{ value: "WI", content:"Wisconsin" },
		{ value: "WY", content:"Wyoming" }
	]
});
