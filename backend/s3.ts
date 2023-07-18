import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
})

export function uploadImage(fileBuffer: Buffer, fileName: string, mimetype: string) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    }

    const command = new PutObjectCommand(uploadParams);
    return s3.send(command);
}