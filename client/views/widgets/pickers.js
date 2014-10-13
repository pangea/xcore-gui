enyo.kind({
	name: 'XV.Select',
	kind: 'enyo.Select',
  published: {
    active: ''
  },
  handlers: {
    onchange: 'updateActive'
  },
  bindings: [
    {from: '.active', to: '.selected', transform: function(val) {
      var selected = -1,
          value = val+'';

		  enyo.forEach(this.children, function(option, idx) {
			  if ((option.value+'') === value) {
				  selected = idx;
			  }
		  });

      return selected;
    }}
  ],
  updateActive: function() {
    this.set('active', this.getValue());
  }
});

enyo.kind({
  name: 'XV.SelectWrapper',
  kind: 'enyo.Control',
  defaultKind: 'XV.Select',
  published: {
    value: ''
  },
  bindings: [
    { from: '.value', to: '.$.select.active', oneWay: false }
  ]
});

enyo.kind({
	name: 'XV.BooleanPicker',
	kind: 'XV.SelectWrapper',
	components: [
    {name: 'select', components: [
		  {content: "Yes", value: "true"},
		  {content: "No", value: "false"}
    ]}
	]
});

enyo.kind({
  name: 'XV.BooleanPickerCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.BooleanPicker' }
  ]
});

enyo.kind({
	name: 'XV.StatePicker',
	kind: 'XV.SelectWrapper',
	components: [
    {name: 'select', components: [
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
    ]}
	]
});

enyo.kind({
  name: 'XV.StatePickerCell',
  kind: 'XV.InputCell',
  components: [
    {name: 'input', kind: 'XV.StatePicker'}
  ]
});

enyo.kind({
  name: 'XV.RelationPicker',
  kind: 'XV.SelectWrapper',
  published: {
    collection: null
  },
  components: [
    { kind: 'XV.FontAwesomeIcon', icon: 'spinner', classes: 'fa-spin' }
  ],
  create: enyo.inherit(function(sup) {
    return function() {
      if(enyo.isString(this.collection)) {
        this.collection = enyo.getPath(this.collection);
      }

      if(enyo.isFunction(this.collection)) {
        this.collection = new this.collection();
      }

      sup.apply(this, arguments);

      this.collection.fetch({
        success: enyo.bindSafely(this, 'buildSelect')
      });
    };
  }),
  buildSelect: function() {
    var options = [];

    for(var i = 0, m; (m = this.collection.at(i)); i++) {
      options.push({
        value: m.getKey(),
        content: this.modelValue(m)
      });
    }

    this.destroyComponents();
    this.createComponent({ name: 'select', components: options });
    this.render();
  },
  modelValue: function(record) {
    // provide a sane default
    if(record.naturalKey) {
      return record.getKey();
    } else {
      // You will need to subkind in order to use models without natrual keys
      throw new Error('Record does not have a natural key.');
    }
  }
});

enyo.kind({
  name: 'XV.RelationPickerCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.RelationPicker'}
  ]
});

enyo.kind({/** @lends XV.NestedRelationPicker */
  name: 'XV.NestedRelationPicker',
  kind: 'XV.RelationPicker',
  /**
   * @constructor
   * A Nested Relation Picker maintains an instance of XM.Model as its `value`.
   * This requires special processing during the binding to provide two-way
   * binding.
   */
  create: enyo.inherit(function(sup) {
    return function() {
      // We need to alter values going to/from the input
      // We can't just add a new binding, so, instead, we edit the existing one
      this.bindings[0].transform = 'alterValue';

      sup.apply(this, arguments);
    };
  }),
  alterValue: function(value, dir) {
    if(dir === 'target') {
      // when pulling the value from the target, we need to transform it into
      // a model
      return this.collection.filter(function(record) {
        return record.getKey() == value;
      })[0];
    } else {
      // otherwise, we just need to grab the model's key
      return value && value.getKey();
    }
  }
});

enyo.kind({
  name: 'XV.NestedRelationPickerCell',
  kind: 'XV.InputCell',
  components: [
    { name: 'input', kind: 'XV.NestedRelationPicker'}
  ]
});
