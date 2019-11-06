var api = require("./api/resolver.js");
var profile = require("./profile.js");

class User {
  constructor(network, access_token, refresh_token) {
    this.network = network;
    this.refresh_token = access_token;
    this.access_token = refresh_token;
  }


  ClaimTask(task_id) {
    return api.adw.ClaimTask(this.network, task_id, this.access_token)
  }


  CreateClaim(claim) {
    return api.adu.CreateClaim(this.network, claim, this.access_token)
  }


  CreateAttributes(attributes) {
    return api.adu.CreateAttributes(this.network, attributes, this.access_token)
  }


  async CreateProfile(payload) {
    let res = await api.adu.CreateProfile(this.network, payload, this.access_token);
    return new profile.Profile(this, res.profile_id)
  }


  CreateProfilePrivToken(profile_id, payload) {
    return api.adu.CreateProfilePrivToken(this.network, profile_id, payload, this.access_token)
  }


  CreateTask(task_type, task_version, task_priority, predecessor_id, payload, next_action, shared_secret) {
    return api.adw.CreateTask(this.network, task_type, task_version, task_priority, predecessor_id, payload, next_action, shared_secret)
  }


  DeleteAttributes(attributes) {
    return api.adu.DeleteAttributes(this.network, attributes, this.access_token)
  }


  DeleteProfile(profile_id) {
    return api.adu.DeleteProfile(this.network, profile_id, this.access_token)
  }


  DeleteProfilePriv(priv_id) {
    return api.adu.DeleteProfilePriv(this.network, priv_id, this.access_token)
  }


  GetActiveTaskIDs() {
    return api.adw.GetActiveTaskIDs(this.network, this.access_token)
  }


  GetAttributeHeadersByTypes(types) {
    return api.adu.GetAttributeHeadersByTypes(this.network, types, this.access_token)
  }


  GetAttributesByIDs(attributes) {
    return api.adu.GetAttributesByIDs(this.network, attributes, this.access_token)
  }


  GetFlatProfileByID(profile_id) {
    return api.adu.GetFlatProfileByID(this.network, profile_id, this.access_token)
  }


  GetLatestLogsByTypes(types) {
    return api.adu.GetLatestLogsByTypes(this.network, types, this.access_token)
  }


  GetLogHeadersByTypes(types, start_time, end_time) {
    return api.adu.GetLogHeadersByTypes(this.network, types, start_time, end_time)
  }


  GetLogsByIDs(logs) {
    return api.adu.GetLogsByIDs(this.network, logs, this.access_token)
  }


  GetOwnedProfileHeaders() {
    return api.adu.GetOwnedProfileHeaders(this.network, this.access_token)
  }


  async GetProfileByID(profile_id) {
    let res = await api.adu.GetProfileByID(this.network, profile_id, this.access_token);
    return new profile.Profile(this, res.profile.profile_id, this.profile.remark, this.profile.sections)
  }


  async GetProfileByToken(dynamic_token) {
    let res = await api.adu.GetProfileByToken(this.network, dynamic_token, this.access_token);
    return new profile.Profile(this, res.profile.profile_id, this.profile.remark, this.profile.sections)
  }


  GetProfilePrivs(profile_id) {
    return api.adu.GetProfilePrivs(this.network, profile_id, this.access_token)
  }


  GetUnclaimedTask(task_types) {
    return api.adw.GetUnclaimedTask(this.network, task_types, this.access_token)
  }


  GetTaskByID(task_id) {
    return api.adw.GetTaskByID(this.network, task_id, this.access_token)
  }


  Logout() {
    return api.adu.Logout(this.network, this.access_token, this.refresh_token)
  }


  ModifyProfileComponents(payload) {
    return api.adu.ModifyProfileComponents(this.network, payload, this.access_token)
  }


  NewAccessToken() {
    this.access_token = api.adu.NewAccessToken(this.network, this.refresh_token)
  }


  RegisterWorker(access_point) {
    return api.adw.RegisterWorker(this.network, access_point, this.access_token)
  }


  ResolveTask(task_id) {
    return api.adw.ResolveTask(this.network, task_id, this.access_token)
  }


  SendProfileTokenByEmail(priv_id, target_emails, message) {
    return api.adu.SendProfileTokenByEmail(this.network, priv_id, target_emails, message, this.access_token)
  }


  SetUserGroupByEmail(email, group, secret = "") {
    return api.adu.SetUserGroupByEmail(this.network, email, group, this.access_token, secret)
  }


  SubmitWorkflowToken(dynamic_token) {
    return api.adu.SubmitWorkflowToken(this.network, dynamic_token, this.access_token)
  }


  UpdateAttributes(attributes) {
    return api.adu.UpdateAttributes(this.network, attributes, this.access_token)
  }


  UpdatePasswordJWT(password) {
    return api.adu.UpdatePasswordJWT(this.network, password, this.access_token)
  }


  UpdateProfile(profile_id, payload) {
    return api.adu.UpdateProfile(this.network, profile_id, payload, this.access_token)
  }


  UpdateProfilePriv(priv_id, payload) {
    return api.adu.UpdateProfilePriv(this.network, priv_id, payload, this.access_token)
  }

  UnclaimTask(task_id) {
    return api.adw.UnclaimTask(this.network, task_id, this.access_token)
  }
}


module.exports = {
  User:   User
};