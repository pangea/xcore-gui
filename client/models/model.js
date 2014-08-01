enyo.kind({
	name: 'XM.Model',
	kind: 'enyo.Model',
	hasCreator: function() {
		var creator = this.get('created_by');

		if ((typeof creator !== 'undefined') && (creator !== '')) {
			return true;		
		}

		return false;
	}
});
