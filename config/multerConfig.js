const multer = require('multer');
const path = require('path');
let varaible=0;
// Set the destination folder for uploaded files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Upload all files to the 'uploads' directory
    cb(null, 'uploads/contactUs');
  },
  filename: function(req, file, cb) {
    varaible++;
    // Use Date.now() to make sure each file has a unique name
    cb(null, `${Date.now()}${varaible}${path.extname(file.originalname)}`);
  }
});

// Initialize multer middleware with the defined storage
const uploadContactUs = multer({ storage: storage });

module.exports = {uploadContactUs};
