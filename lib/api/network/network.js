var axios = require('axios');


async function ExecuteMethod(target, method, params, id = "0") {
  try {
    var res = await axios.post(target, {
      "jsonrpc": "2.0",
      "method": method,
      "params": params,
      "id": id
    });

    if (res.data.error != null) {
      throw new Error(res.data.error.message)
    }
    return res.data.result

  } catch (err) {
    throw new Error(err)
  }
}

module.exports.ExecuteMethod = ExecuteMethod;