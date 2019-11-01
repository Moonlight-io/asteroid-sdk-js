var api = require("./api/resolver.js");
var user = require("./user.js");

class Asteroid {
  constructor(network) {
    this.network = network;
    this.api = api;
    this.user = null
  }

  async LoginEmail(email, password) {
    let res = await this.api.adu.LoginEmail(this.network, email, password);
    this.user = new user.User(this.network, res.access_token, res.refresh_token);
    return this.user
  }

  RegisterEmail(email) {
    return this.api.adu.RegisterEmail(this.network, email)
  }

  RegisterEmailWithSecret(email, secret) {
    return this.api.adu.RegisterEmailWithSecret(this.network, email, secret)
  }

  UpdatePassword(dynamic_token, password, token_type) {
    return this.api.adu.UpdatePassword(this.network, dynamic_token, password, token_type)
  }

}

module.exports = {
  Asteroid: Asteroid
}