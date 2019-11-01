var assert = require("assert");
var ast = require("../index.js")


describe("Ping", () => {
  let email = "tyler@moonlight.io";
  let password = "password";
  let secret = "7A8D5C74979ABBF98F419BDD862BA234";
  let asteroid = new ast.Asteroid(ast.Configs.Dev);
  let user = null;

  it("should register a new account", async () => {
    let registerRes = await asteroid.RegisterEmailWithSecret(email, secret);
    let updateRes = await asteroid.UpdatePassword(registerRes.dynamic_token, password, 'NewAccount')
  });

  it("should log into the account", async () => {
    user = await asteroid.LoginEmail(email, password)
  });

  it("should create a new profile for the account", async () => {
    let profile = await user.CreateProfile();
    console.log(profile)
  })

});

