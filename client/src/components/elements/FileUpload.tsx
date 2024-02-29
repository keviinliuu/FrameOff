import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, DragEvent } from 'react';
import anime from 'animejs';
export interface FileUploadProps {
    image?: File | string;
    onChange(image: File): void;
}

export default function FileUpload({ image, onChange }: FileUploadProps) {
    const iconRef = useRef(null);
    const bgRef = useRef(null);

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

    const handleMouseEnter = () => {
        anime({
            targets: iconRef.current,
            duration: 150,
            width: 50,
            height: 50,
            easing: 'easeOutCubic',
        });
        anime({
            targets: bgRef.current,
            duration: 50,
            backgroundColor: 'rgba(228, 27, 159, .2)',
            easing: 'easeOutCubic',
        });
    };

    const handleMouseLeave = () => {
        anime({
            targets: iconRef.current,
            duration: 50,
            width: 40,
            height: 40,
            easing: 'easeOutCubic',
        });
        anime({
            targets: bgRef.current,
            duration: 150,
            backgroundColor: 'rgba(228, 27, 159, 0)',
            easing: 'easeOutCubic',
        });
    };

    return (
        <label
            className='relative flex flex-col gap-y-4 items-center justify-center border-dashed border-blush border-2 h-full text-blush cursor-pointer p-4 bg-transparent rounded-lg'
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={bgRef}>
            <div className='absolute w-full h-full rounded-lg border-blush border-2' />
            {image ? (
                <img
                    className='max-w-full aspect-square object-cover'
                    src={image instanceof File ? URL.createObjectURL(image as File) : image}
                />
            ) : (
                <div className='w-[40px] h-[40px]' ref={iconRef}>
                    <FontAwesomeIcon className='w-full h-full' icon={faArrowUpFromBracket} />
                </div>
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
