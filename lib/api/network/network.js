var axios = require('axios');


async function ExecuteMethod(target, method, params, id = "0") {
  console.log(method)
  console.log(params)
  console.log(id)
  console.log(target)
  const res = await axios.post(target,  {
      "jsonrpc": "2.0",
      "method": method,
      "params": params,
      "id": id
    })
    .catch(function (err) {
      throw new Error(err)
    });

  if (res.data.error != null) {
    throw new Error(res.data.error.message)
  }

  return res.data.result
};
module.exports.ExecuteMethod = ExecuteMethod