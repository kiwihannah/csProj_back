const Model = require('../models')

class User extends Model {
  static init() {
    return super.init(
      {
        userId: 'string',
        nickname: 'string',
        userPw: 'string',
      },
      {
        tableName: 'Users',
        sync: true,
      }
    )
  }
}

module.exports = User
