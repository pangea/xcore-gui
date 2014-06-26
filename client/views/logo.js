enyo.kind({
	name: "XV.Logo",
	components: [{
		kind: "enyo.Image",
		classes: "logo",
		src: "images/logo.png"
	}],
	setImage: function (url) {
		this.$.image.setAttribute('src', url);	
	}
});
