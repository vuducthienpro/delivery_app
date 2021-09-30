import path from 'path';
import multer from 'multer';

const storate = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer ({
    storage: storate,
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg'
        ) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    limits: {
        fileSize:  1024 * 1024 * 2,
    },
});

module.exports = upload;