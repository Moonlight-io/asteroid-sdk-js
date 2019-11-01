var api = require("./api/resolver.js");
var user = require("./user.js");

class Asteroid {
  constructor(network) {
    this.network = network;
    this.api = api;
    this.user = null
  }

  LoginEmail(email, password) {
    let res = this.api.adu.LoginEmail(this.network, email, password);
    this.user = new user.User(res.access_token, res.refresh_token);
    return this.user
  }

}

module.exports = {
  Asteroid: Asteroid
}