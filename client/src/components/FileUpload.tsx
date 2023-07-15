import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function FileUpload() {
    return (
        <div className='flex flex-col gap-y-4 items-center justify-center border-dashed border-gray-200 border-2 h-full text-gray-300'>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size='2x' />
            <div>Drag and drop to upload files</div>
        </div>
    );
}
