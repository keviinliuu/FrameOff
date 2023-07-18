import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

export interface FileUploadProps {
    image?: File;
    onChange(image: File): void;
}

export default function FileUpload({ image, onChange }: FileUploadProps) {
    return (
        <label className='flex flex-col gap-y-4 items-center justify-center border-dashed border-gray-200 border-2 h-full text-gray-300 cursor-pointer'>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size='2x' />
            <div>Click to upload files</div>
            {image && <div>An image was uploaded with the name {image.name}</div>}
            <input
                name='image'
                type='file'
                hidden
                accept='image/*'
                onChange={e => onChange(e.target.files![0])}
            />
        </label>
    );
}
