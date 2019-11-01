var assert = require("assert");
var ast = require("../index.js")


describe("Ping", async () => {

  let asteroid = new ast.Asteroid()
  let res = asteroid.api.adu.LoginEmail(ast.Configs.Dev, "test@moonlight.io", "password")
  console.log(res)
  //let res = asteroid.api.adu.LoginEmail(ast.Configs.Dev, "tyler@moonlight.io", "password")
  //console.log(res)

})