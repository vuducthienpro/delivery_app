import path from 'path';
import multer from 'multer';

const typeImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/jfif'];

const storate = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },

    filename: (req, file, cb) => {
        const ext = file.originalname;
        cb(null, ext);
    },
});


        //   file.mimetype === 'image/png' ||
        //     file.mimetype === 'image/jpg' ||
        //     file.mimetype === 'image/jpeg' ||
        //     file.mimetype === 'image/jfif';

const upload = multer ({
    storage: storate,
    fileFilter: (req, file, callback) => {
        if (typeImage.indexOf(file.mimetype) >= 0) {
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