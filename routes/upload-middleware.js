const util = require('util')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const dbConfig = require('../models/index')

const storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg']
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`
      return filename
    }
    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-bezkoder-${file.originalname}`,
    }
  },
})
let uploadFiles = multer({ storage: storage }).single('file')
let uploadFilesMiddleware = util.promisify(uploadFiles)

module.exports = uploadFilesMiddleware
