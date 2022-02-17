const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
aws.config.loadFromPath(__dirname + '/../s3.json')

const s3 = new aws.S3()
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mini-project-image-upload',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(
        null,
        `${Date.now()}_profile_picture` +
          '.' +
          file.originalname.split('.').pop()
      )
    },
  }),
})
module.exports = upload
