import { Router } from 'express';

import multer from 'multer';
import { uploadImage, getImageUrl } from '../s3';
import crypto from 'crypto';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const generateImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

router.route('/api/uploadimage').post(upload.single('image'), async(req, res) => {
    const imageName = generateImageName();

    await uploadImage(
        req.file!.buffer,
        imageName,
        req.file!.mimetype
    );

    const url = getImageUrl(imageName);
    return res.send(url);
});

export default router;