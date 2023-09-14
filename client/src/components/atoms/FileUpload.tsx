import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

export interface FileUploadProps {
    image?: File | string;
    onChange(image: File): void;
}

export default function FileUpload({ image, onChange }: FileUploadProps) {
    return (
        <label className='flex flex-col gap-y-4 items-center justify-center border-dashed border-blush border-2 h-full text-blush cursor-pointer p-4 bg-nocturne rounded-lg'>
            {image ? (
                <img
                    className='max-w-full aspect-square object-cover'
                    src={image instanceof File ? URL.createObjectURL(image as File) : image}
                />
            ) : (
                <>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size='2x' />
                    {/* <div>Click to upload files</div> */}
                </>
            )}
            <input
                name='image'
                type='file'
                hidden
                accept='image/png,image/jpeg'
                onChange={e => onChange(e.target.files![0])}
            />
        </label>
    );
}
