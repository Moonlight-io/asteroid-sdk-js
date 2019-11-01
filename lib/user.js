


class User {
  constructor(access_token, refresh_token) {
    this.refresh_token = access_token;
    this.access_token = refresh_token;
  }
}




module.exports = {
  User:   User
};