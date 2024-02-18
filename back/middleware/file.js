const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) =>
  cb(null, validTypes.includes(file.mimetype));

module.exports = multer({ storage, fileFilter });
