var net = require("../network/network.js");

module.exports.CreateTask = (network, task_type, task_version, task_priority, predecessor_id, payload, next_action, version = 1, id = "0")  => {
  let params = {
    "version":         version,
    "task_type":       task_type,
    "task_version":    task_version,
    "task_priority":   task_priority,
    "predecessor_id":  predecessor_id,
    "payload":         payload,
    "next_action":     next_action
  };
  return net.ExecuteMethod(network.adw, "Worker.CreateTask", params, id)
};

module.exports.GetTask = (network, task_types, access_token, version = 1, id = "0") => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "task_types":    task_types
  };
  return net.ExecuteMethod(network.adw, "Worker.GetTask", params, id)
};

module.exports.ClaimTask = (network, task_id, access_token, version, id = "0") => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "task_id":      task_id
  };
  return net.ExecuteMethod(network.adw, "Worker.ClaimTask", params, id)
};

module.exports.ResolveTask = (network, task_id, access_token, version, id = "0") => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "task_id":      task_id
  };
  return net.ExecuteMethod(network.adw, "Worker.ResolveTask", params, id)
};

module.exports.RegisterWorker = (network, access_point, access_token, version, id = "0") => {
  let params = {
    "version":        version,
    "access_token":   access_token,
    "access_point":   access_point
  };
  return net.ExecuteMethod(network.adw, "Worker.RegisterWorker", params, id)
};