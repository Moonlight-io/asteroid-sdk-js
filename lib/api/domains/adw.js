var net = require("../network/network.js");


module.exports.ClaimTask = (network, task_id, access_token, version = 1, id = "0") => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "task_id":      task_id
  };
  return net.ExecuteMethod(network.adw, "Worker.ClaimTask", params, id)
};


module.exports.CreateTask = (network, task_type, task_version, task_priority, predecessor_id, payload, next_action, shared_secret, version = 1, id = "0")  => {
  let params = {
    "version":         version,
    "shared_secret":   shared_secret,
    "task_type":       task_type,
    "task_version":    task_version,
    "task_priority":   task_priority,
    "predecessor_id":  predecessor_id,
    "payload":         payload,
    "next_action":     next_action
  };
  return net.ExecuteMethod(network.adw, "Worker.CreateTask", params, id)
};


module.exports.GetActiveTaskIDs = (network, access_token, version = 1, id = "0") => {
  let params = {
    "version":       version,
    "access_token":  access_token
  };
  return net.ExecuteMethod(network.adw, "Worker.GetActiveTaskIDs", params, id)
};


module.exports.GetTaskByID = (network, task_id, access_token, version = 1, id = "0") => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "task_id":       task_id
  };
  return net.ExecuteMethod(network.adw, "Worker.GetTaskByID", params, id)
};


module.exports.GetUnclaimedTask = (network, task_types, access_token, version = 1, id = "0") => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "task_types":    task_types
  };
  return net.ExecuteMethod(network.adw, "Worker.GetUnclaimedTask", params, id)
};


module.exports.RegisterWorker = (network, access_point, access_token, version = 1, id = "0") => {
  let params = {
    "version":        version,
    "access_token":   access_token,
    "access_point":   access_point
  };
  return net.ExecuteMethod(network.adw, "Worker.RegisterWorker", params, id)
};


module.exports.ResolveTask = (network, task_id, access_token, version = 1, id = "0") => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "task_id":      task_id
  };
  return net.ExecuteMethod(network.adw, "Worker.ResolveTask", params, id)
};


module.exports.UnclaimTask = (network, task_id, access_token, version = 1, id = "0") => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "task_id":      task_id
  };
  return net.ExecuteMethod(network.adw, "Worker.UnclaimTask", params, id)
};