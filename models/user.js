const mongoose = require('mongoose')
/**
 * @swagger
 *     components:
 *         schemas:
 *             User:
 *                 type: object
 *                 required:
 *                     - userId
 *                     - nickname
 *                     - userPw
 *                 properties:
 *                     id:
 *                         type: object
 *                         description: The auto-generated id of the User table.
 *                     userId:
 *                         type: string
 *                         description: The user id for log-in.
 *                     nickname:
 *                         type: string
 *                         description: Who wrote this post?
 *                     userPw:
 *                         type: string
 *                         description: The user pw for log-in?
 *                     example:
 *                         userId: hannah1009
 *                         nickname: hannah
 *                         userPw: hannahpw123
 */
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  nickname: {
    type: String,
  },
  userPw: {
    type: String,
  },
  profileImageUrl: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)
