// middlewares/uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Set up storage engine with destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify where the uploaded files will be saved
    cb(null, 'Assets/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Rename the file to avoid name conflicts
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter function to allow specific file types
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|mp4|mov|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Files only (jpeg, jpg, png, gif, mp4, mov, pdf)!');
    }
  }

// Multer middleware setup
export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }, // Limit files to 5MB
});
