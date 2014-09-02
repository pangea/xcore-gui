/**
 * Generic kind that can take a given `value` and display it.
 * ValueDisplays can be used to display strings that require no modification
 * to be displayed.
 */
enyo.kind({
  name: 'XV.ValueDisplay',
  kind: 'enyo.Control',
  classes: 'value-display',
  published: {
    value: ''
  },
  bindings: [
    {from: '.value', to: '.content', transform: 'transform'}
  ],
  /**
   * The default behavior of the transform function simply returns the value
   * given.
   */
  transform: function(value) {
    return value;
  }
});

enyo.kind({
  name: 'XV.ValueCell',
  kind: 'XV.ValueDisplay',
  tag: 'td'
});

/**
 * AttributeDisplays are ValueDisplays that are tuned to displaying attribute
 * names (e.g. firstName)
 *
 * AttributeDisplays take camelCased attribute names and turns them into
 * Titlized strings (e.g. First Name)
 */
enyo.kind({
  name: 'XV.AttributeDisplay',
  kind: 'XV.ValueDisplay',
  allowHtml: true,
  style: 'text-align: right',
  published: {
    /**
     * If true, the final contents will be wrapped with `<b>` tags.
     * Default: true
     */
    bold: true,
    /**
     * If true, final contents will have a colon (:) appended to it.
     * Default: true
     */
    colonAfter: true
  },
  /**
   * Transforms the given camelCased value to a Titlized form.
   * E.g. firstName -> First Name
   */
  transform: function(value) {
    // the special value $& inserts the matched value into the string used in
    // replace.  This allows us to insert spaces before every capital letter.
    var newVal = enyo.cap(value.replace(/[A-Z]/, ' $&'));
    if(this.colonAfter) {
      newVal += ':';
    }

    return this.bold ? newVal.bold() : newVal;
  }
});

enyo.kind({
  name: 'XV.AttributeCell',
  kind: 'XV.AttributeDisplay',
  tag: 'td'
});

/**
 * BooleanDisplay is a type of ValueDisplay designed to display boolean values
 * nicely.  It does this by transforming 'true' to 'yes' and 'false' to 'no'.
 */
enyo.kind({
  name: 'XV.BooleanDisplay',
  kind: 'XV.ValueDisplay',
  transform: function(value) {
    if(enyo.isString(value)) {
      value = value.toLowerCase();
    }
    switch(value) {
      case true:
      case 'true':
        return 'Yes';

      default:
        return 'No';
    }
  }
});

enyo.kind({
  name: 'XV.BooleanCell',
  kind: 'XV.BooleanDisplay',
  tag: 'td'
});

/**
 * @WIP
 * CurrencyDisplays are used to display monetary values. E.g. $1,000.00
 */
enyo.kind({
  name: 'XV.CurrencyDisplay',
  kind: 'XV.ValueDisplay',
  transform: function(value) {
    return value;
  }
});

enyo.kind({
  name: 'XV.CurrencyCell',
  kind: 'XV.CurrencyDisplay',
  tag: 'td'
});

/**
 * @WIP
 * DateDisplays are used to better display date values.
 * The default stringification of Date objects isn't a form most people would be
 * accostomed to seeing
 */
enyo.kind({
  name: 'XV.DateDisplay',
  kind: 'XV.ValueDisplay',
  transform: function(value) {
    // NOTE: Times from imported data appear to be set to midnight UTC, instead of midnight CST

    if(enyo.isString(value)) {
      value = new Date(value);
    }

    if(value && value.toLocaleDateString) {
      // looks like it's a date object

      return (value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear();
    }

    return value;
  }
});

enyo.kind({
  name: 'XV.DateCell',
  kind: 'XV.DateDisplay',
  tag: 'td'
});

/**
 * @WIP
 */
enyo.kind({
  name: 'XV.RelationDisplay',
  kind: 'XV.ValueDisplay',
  allowHtml: true,
  published: {
    /**
     * String name or constructor for the model this relation works with
     */
    modelKind: '',
    model: null
  },
  bindings: [
    { from: '.value', to: '.model.id' }
  ],
  create: enyo.inherit(function(sup) {
    return function() {
      var that = this;

      if(enyo.isString(this.modelKind)) {
        this.set('model', enyo.store.createKind(this.modelKind));
      } else if(enyo.isFunction(this.modelKind)) {
        this.set('model', new this.modelKind());
      }

      sup.apply(this, arguments);

      this.model.fetch();
    };
  })
});
