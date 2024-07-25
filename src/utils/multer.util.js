const multer = require('multer');
const path = require('path');

// Define storage settings for different types of uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = '';

        switch (file.fieldname) {
            case 'coverImage':
                uploadPath = path.join(__dirname, '../uploads/games');
                break;
            case 'icon':
                uploadPath = path.join(__dirname, '../uploads/icons');
                break;
            case 'profilePicture':
                uploadPath = path.join(__dirname, '../uploads/profiles');
                break;
            case 'bannerImage':
                uploadPath = path.join(__dirname, '../uploads/banners');
                break;
            case 'attachments':
                uploadPath = path.join(__dirname, '../uploads/attachments');
                break;
            case 'files':
                uploadPath = path.join(__dirname, '../uploads/files');
                break;
            case 'certificates':
                uploadPath = path.join(__dirname, '../uploads/certificates');
                break;
            case 'tickets':
                uploadPath = path.join(__dirname, '../uploads/tickets');
                break;
            case 'blogs':
                uploadPath = path.join(__dirname, '../uploads/blogs');
                break;
            case 'projects':
                uploadPath = path.join(__dirname, '../uploads/projects');
                break;
            case 'products':
                uploadPath = path.join(__dirname, '../uploads/products');
                break;
            case 'teams':
                uploadPath = path.join(__dirname, '../uploads/teams');
                break;
            case 'tournaments':
                uploadPath = path.join(__dirname, '../uploads/tournaments');
                break;
            case 'categories':
                uploadPath = path.join(__dirname, '../uploads/categories');
                break;
            default:
                uploadPath = path.join(__dirname, '../uploads/others');
                break;
        }

        require('fs').mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, fileName);
    }
});

// Multer upload middleware
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|xlsx|xls|csv/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, GIF, PDF, DOC, DOCX, XLSX, XLS, and CSV files are allowed.'));
        }
    },
    limits: { fileSize: 50 * 1024 * 1024 } // Limit file size to 50MB
});

module.exports = upload;
