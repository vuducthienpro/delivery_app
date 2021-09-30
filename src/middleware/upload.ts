import path from 'path';
import multer from 'multer';

const storate = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },

    filename: (req, file, cb) => {
        const ext = file.originalname;
        cb(null, ext);
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

export default upload;