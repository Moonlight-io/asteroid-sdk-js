var assert = require("assert");
var ast = require("../index.js")


describe("register a worker", () => {
  let email = "worker@moonlight.io";
  let password = "password";
  let secret = "7A8D5C74979ABBF98F419BDD862BA234";
  let asteroid = new ast.Asteroid(ast.Configs.Dev);
  let user = null;

  it("should register a new worker", async () => {
    let registerRes = await asteroid.RegisterEmailWithSecret(email, secret);
    let updateRes = await asteroid.UpdatePassword(registerRes.dynamic_token, password, 'NewAccount')
  });

  it("should log into the account and elevate its privs", async () => {
    user = await asteroid.LoginEmail(email, password);
    let privUpgradeRes = await user.SetUserGroupByEmail(email,"worker", secret);
    console.log(privUpgradeRes)
  });

  it("should register the worker", async () => {
    let res = await user.RegisterWorker("the sdk");
    console.log(res)
  })
});

