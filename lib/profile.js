var api = require("./api/resolver.js")


class Profile {

  constructor(user, profile_id, remark, sections) {
    this.user = user;
    this.profile_id = profile_id;
    this.remark = remark;
    this.sections = sections;
  }

  DeleteProfile() {
    return api.adu.DeleteProfile(this.user.network, this.profile_id, this.user.access_token)
  }

  UpdateProfile(payload) {
    return api.adu.UpdateProfile(this.user.network, this.profile_id, payload, this.user.access_token)
  }

  CreateProfilePrivToken(payload) {
    return api.adu.CreateProfilePrivToken(this.user.network, this.profile_id, payload, this.user.access_token)
  }

  GetProfilePrivs() {
    return api.adu.GetProfilePrivs(this.user.network, this.profile_id, this.user.access_token)
  }
}

module.exports = {
  Profile: Profile
};