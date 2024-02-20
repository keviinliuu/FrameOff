import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState, DragEvent } from 'react';

export interface FileUploadProps {
    image?: File | string;
    onChange(image: File): void;
}

export default function FileUpload({ image, onChange }: FileUploadProps) {
    const [_, setIsDragOver] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                onChange(file);
            } else {
                alert('Only PNG or JPEG files are allowed!');
            }
        }
    };

    return (
        <label
            className='flex flex-col gap-y-4 items-center justify-center border-dashed border-blush border-2 h-full text-blush cursor-pointer p-4 bg-nocturne rounded-lg'
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            {image ? (
                <img
                    className='max-w-full aspect-square object-cover'
                    src={image instanceof File ? URL.createObjectURL(image as File) : image}
                />
            ) : (
                <>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size='2x' />
                </>
            )}
            <input
                name='image'
                type='file'
                hidden
                accept='image/png,image/jpeg'
                onChange={e => e.target.files && onChange(e.target.files![0])}
            />
        </label>
    );
}
