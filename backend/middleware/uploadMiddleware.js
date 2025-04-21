const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

// Set up storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/uploads/images');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware to process uploaded image
const processImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    // Get file path
    const filePath = req.file.path;
    const outputPath = filePath.replace(path.extname(filePath), '_optimized' + path.extname(filePath));
    
    // Process image - resize and optimize
    await sharp(filePath)
      .resize(1200) // Set max width to 1200px while maintaining aspect ratio
      .jpeg({ quality: 80 }) // Optimize quality
      .toFile(outputPath);
    
    // Replace the original file with the optimized one
    fs.unlinkSync(filePath);
    fs.renameSync(outputPath, filePath);
    
    // Add file URL to request
    req.fileUrl = `/uploads/images/${path.basename(filePath)}`;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, processImage };