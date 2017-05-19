'use strict';

SwaggerUi.Views.StatusCodeView = Backbone.View.extend({
  initialize: function (opts) {
    this.options = opts || {};
    this.router = this.options.router;
  },

  render: function(){
    $(this.el).html(Handlebars.templates.status_code(this.model));

    if (this.router.api.models.hasOwnProperty(this.model.responseModel)) {
      var responseModel = {
        id: this.model.responseModel,
        sampleJSON: JSON.stringify(this.router.api.models[this.model.responseModel].createJSONSample(), null, 2),
        isParam: false,
        signature: this.router.api.models[this.model.responseModel].getMockSignature(),
        template: 'response_signature'
      };

      var responseModelView = new SwaggerUi.Views.SignatureView({model: responseModel, tagName: 'div'});
      $(this.$el).append(responseModelView.render().el);
    }
    return this;
  }
});