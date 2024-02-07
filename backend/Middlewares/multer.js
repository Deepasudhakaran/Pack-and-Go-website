
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Pictures');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `file-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

const uploadMultiple = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
]);

module.exports = uploadMultiple;


