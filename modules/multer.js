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
        key: function (req, file, cb) {
            cb(null, `${res.locals.user[0].userId}_profile_picture`)
        },
    }),
})
module.exports = upload
