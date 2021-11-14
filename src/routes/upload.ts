import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Router } from 'express';
import  multer from 'multer';
cloudinary.config({
  cloud_name: 'dzbytteef',
  api_key: '287217626513136',
  api_secret: 'BCjHZt9N7VErmYkM5gqNRyV39Sw',
});
const storage = new CloudinaryStorage({
  cloudinary,
  params:{
  },
});
const parser = multer({ storage });
const router = Router();
router.post('/',parser.single('image'),(req,res)=>{
    res.json({
      path:req.file.path,
    });
})
export default router;
