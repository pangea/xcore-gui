enyo.kind({
  name: "XV.Logo",
  events: {
    onLogoLoaded: ""
  },
  components: [{
    kind: "enyo.Image",
    classes: "logo",
    onload: "logoLoaded",    
    src: "images/logo.png",
    style: "vertical-align: middle"
  }],
  logoLoaded: function () {
    this.doLogoLoaded();
  },
  setImage: function (url) {
    this.$.image.setAttribute('src', url);
  }
});
