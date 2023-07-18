import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const bucketName: string = process.env.S3_BUCKET_NAME!;
const bucketRegion: string = process.env.S3_BUCKET_REGION!;
const accessKey: string = process.env.S3_ACCESS_KEY!;
const secretAccessKey: string = process.env.S3_SECRET_ACCESS_KEY!;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

export async function uploadImage(fileBuffer: Buffer, fileName: string, mimetype: string) {
    console.log(s3.config.region)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);
};

export function getImageUrl(imageName: string) {
    const url: string = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageName}`;
    return url;
};