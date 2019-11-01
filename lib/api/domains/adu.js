var net = require("../network/network.js");

module.exports.LoginEmail = (network, email, password, version = 1, id = "0")  => {
  let params = {
    "version":  version,
    "email":    email,
    "password": password
  };
  return net.ExecuteMethod(network.adu, "User.LoginEmail", params, id)
};

module.exports.SetUserGroupByEmail =  (network, email, group, access_token = "", secret = "", version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "secret":       secret,
    "email":        email,
    "group":        group
  };
  return net.ExecuteMethod(network.adu, "User.SetUserGroupByEmail", params, id)
};

module.exports.LoginOauth = (network, provider, payload, version = 1, id = "0")  => {
  let params = {
    "version":    version,
    "provider":   provider,
    "payload":    payload
  };
  return net.ExecuteMethod(network.adu, "User.LoginOauth", params, id)
};

module.exports.NewAccessToken = (network, refresh_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "refresh_token": refresh_token
  };
  return net.ExecuteMethod(network.adu, "User.NewAccessToken", params, id)
};

module.exports.Logout = (network, access_token, refresh_token, version = 1, id = "0")  => {
  let params = {
    "version":        version,
    "access_token":   access_token,
    "refresh_token":  refresh_token
  };
  return net.ExecuteMethod(network.adu, "User.Logout", params, id)
};

module.exports.RegisterEmail =  (network, email, version = 1, id = "0")  => {
  let params = {
    "version":   version,
    "email":     email
  };
  return net.ExecuteMethod(network.adu, "User.RegisterEmail", params, id)
};

module.exports.RegisterEmailWithSecret = (network, email, secret, version = 1, id = "0")  => {
  let params = {
    "version":   version,
    "email":     email,
    "secret":    secret
  };
  return net.ExecuteMethod(network.adu, "User.RegisterEmailWithSecret", params, id)
};

module.exports.UpdatePassword = (network, dynamic_token, password, token_type, version = 1, id = "0")  => {
  let params = {
    "version":        version,
    "dynamic_token":  dynamic_token,
    "password":       password,
    "token_type":     token_type
  };
  return net.ExecuteMethod(network.adu, "User.UpdatePassword", params, id)
};

module.exports.UpdatePasswordJWT = (network, password, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "password":      password
  };
  return net.ExecuteMethod(network.adu, "User.UpdatePasswordJWT", params, id)
};

module.exports.RequestPasswordReset = (network, email, version = 1, id = "0")  => {
  let params = {
    "version":   version,
    "email":     email
  };
  return net.ExecuteMethod(network.adu, "User.RequestPasswordReset", params, id)
};

module.exports.CreateAttributes = (network, attributes, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "attributes":    attributes
  };
  return net.ExecuteMethod(network.adu, "User.CreateAttributes", params, id)
};

module.exports.UpdateAttributes = (network, attributes, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "attributes":    attributes
  };
  return net.ExecuteMethod(network.adu, "User.UpdateAttributes", params, id)
};

module.exports.DeleteAttributes = (network, attributes, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "attributes":    attributes
  };
  return net.ExecuteMethod(network.adu, "User.DeleteAttributes", params, id)
};

module.exports.GetAttributeHeadersByTypes = (network, types, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "types":        types
  };
  return net.ExecuteMethod(network.adu, "User.GetAttributeHeadersByTypes", params, id)
};

module.exports.GetAttributesByIDs = (network, attributes, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "attributes":   attributes
  };
  return net.ExecuteMethod(network.adu, "User.GetAttributesByIDs", params, id)
};

module.exports.CreateProfile = (network, payload, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "payload":      payload
  };
  return net.ExecuteMethod(network.adu, "User.CreateProfile", params, id)
};

module.exports.DeleteProfile = (network, profile_id, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "profile_id":    profile_id
  };
  return net.ExecuteMethod(network.adu, "User.DeleteProfile", params, id)
};

module.exports.GetOwnedProfileHeaders = (network, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token
  };
  return net.ExecuteMethod(network.adu, "User.GetOwnedProfileHeaders", params, id)
};

module.exports.ModifyProfileComponents = (network, payload, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "payload":      payload
  };
  return net.ExecuteMethod(network.adu, "User.ModifyProfileComponents", params, id)
};

module.exports.GetProfileByID = (network, profile_id, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "profile_id":   profile_id
  };
  return net.ExecuteMethod(network.adu, "User.GetProfileByID", params, id)
};

module.exports.GetFlatProfileByID = (network, profile_id, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "profile_id":    profile_id
  };
  return net.ExecuteMethod(network.adu, "User.GetFlatProfileByID", params, id)
};

module.exports.UpdateProfile = (network, profile_id, payload, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "profile_id":    profile_id,
    "payload":       payload
  };
  return net.ExecuteMethod(network.adu, "User.UpdateProfile", params, id)
};

module.exports.GetProfileByToken = (network, dynamic_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "dynamic_token": dynamic_token
  };
  return net.ExecuteMethod(network.adu, "User.GetProfileByToken", params, id)
};

module.exports.CreateProfilePrivToken = (network, profile_id, payload, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "profile_id":   profile_id,
    "payload":      payload
  };
  return net.ExecuteMethod(network.adu, "User.CreateProfilePrivToken", params, id)
};

module.exports.GetProfilePrivs = (network, profile_id, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "profile_id":    profile_id
  };
  return net.ExecuteMethod(network.adu, "User.GetProfilePrivs", params, id)
};

module.exports.UpdateProfilePriv = (network, priv_id, payload, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "priv_id":      priv_id,
    "payload":      payload
  };
  return net.ExecuteMethod(network.adu, "User.UpdateProfilePriv", params, id)
};

module.exports.DeleteProfilePriv = (network, priv_id, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "priv_id":       priv_id
  };
  return net.ExecuteMethod(network.adu, "User.DeleteProfilePriv", params, id)
};

module.exports.SendProfileTokenByEmail = (network, priv_id, target_emails, message, access_token, version = 1, id = "0")  => {
  let params = {
    "version":        version,
    "access_token":   access_token,
    "target_emails":  target_emails,
    "message":        message,
    "priv_id":        priv_id
  };
  return net.ExecuteMethod(network.adu, "User.SendProfileTokenByEmail", params, id)
};

module.exports.GetLogHeadersByTypes = (network, types, start_time, end_time, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "start_time":    start_time,
    "end_time":      end_time,
    "types":         types
  };
  return net.ExecuteMethod(network.adu, "User.GetLogHeadersByTypes", params, id)
};

module.exports.GetLogsByIDs = (network, logs, access_token, version = 1, id = "0")  => {
  let params = {
    "version":      version,
    "access_token": access_token,
    "logs":         logs
  };
  return net.ExecuteMethod(network.adu, "User.GetLogsByIDs", params, id)
};

module.exports.GetLatestLogsByTypes = (network, types, access_token, version = 1, id = "0")  => {
  let params = {
    "version":       version,
    "access_token":  access_token,
    "types":         types
  };
  return net.ExecuteMethod(network.adu, "User.GetLatestLogsByTypes", params, id)
};