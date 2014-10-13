// TODO: Research using a mixin to further abstract functionality.  These two
//       kinds are way too similar.
enyo.kind({
  name: 'XV.InputCell',
  kind: 'enyo.TableCell',
  classes: 'value-input',
  published: {
    value: ''
  },
  bindings: [
    { from: '.value', to: '.$.input.value', oneWay: false }
  ]
});

enyo.kind({
  name: 'XV.InputField',
  kind: 'onyx.InputDecorator',
  published: {
    value: ''
  },
  bindings: [
    {from: '.value', to: '.$.input.value', oneWay: false}
  ]
});

/*** Text Input Field ***/
enyo.kind({
	name: 'XV.TextInput',
	kind: 'XV.InputField',
	components: [{
		name: 'input',
		kind: 'onyx.Input',
		type: 'text'
	}]
});

enyo.kind({
  name: 'XV.TextInputCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.TextInput' }
  ]
});

/*** Text Area Field ***/
enyo.kind({
	name: 'XV.TextArea',
	kind: 'XV.InputField',
	components: [{
		name: 'input',
		kind: 'onyx.TextArea'
	}]
});

enyo.kind({
  name: 'XV.TextAreaCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.TextArea' }
  ]
});

/*** Integer Input Field ***/
enyo.kind({
  name: 'XV.NumberInput',
  kind: 'XV.InputField',
  components: [{
    name: 'input',
    kind: 'onyx.Input',
    type: 'Number'
  }]
});

enyo.kind({
  name: 'XV.NumberInputCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.NumberInput' }
  ]
});

/*** ZipCode Input Field ***/
enyo.kind({
	name: 'XV.ZipCodeInput',
	kind: 'XV.InputField',
	components: [{
		name: 'input',
		kind: 'onyx.Input',
		type: 'text',
		attributes: {
			pattern: "[0-9]{5}",
			title: "5 number zip code"
		}
	}]
});

enyo.kind({
  name: 'XV.ZipCodeInputCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.ZipCodeInput' }
  ]
});


/*** Telephone Input Field ***/
enyo.kind({
	name: 'XV.TelephoneInput',
	kind: 'XV.InputField',
	components: [{
		name: 'input',
		kind: 'onyx.Input',
		type: 'tel',
		attributes: {
			pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{4}",
			title: "10 digit phone number xxx-xxx-xxxx"
		}
	}]
});

enyo.kind({
  name: 'XV.TelephoneInputCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.TelephoneInput' }
  ]
});

/*** Date Input Field ***/
// define ilib as undefined to fix some date picker issues
window.ilib = undefined;
enyo.kind({
  name: 'XV.DateInput',
  kind: 'XV.InputField',
  components: [
    { name: 'input',
      kind: 'onyx.DatePicker',
      // fixes another date picker issue when not using ilib
      localeInfo: {}
    }
  ]
});

enyo.kind({
  name: 'XV.DateInputCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.DateInput' }
  ]
});
