import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect, DragEvent } from 'react';
import anime, { AnimeTimelineInstance } from 'animejs';
export interface FileUploadProps {
    image?: File | string;
    onChange(image: File): void;
}

export default function FileUpload({ image, onChange }: FileUploadProps) {
    const iconRef = useRef(null);
    const bgRef = useRef(null);
    const outlineTRef = useRef(null);
    const outlineBRef = useRef(null);
    const outlineLRef = useRef(null);
    const outlineRRef = useRef(null);
    const containerRef = useRef(null);
    const borderTL = useRef<AnimeTimelineInstance | null>(null);

    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        const tl = anime.timeline({
            loop: true,
            easing: 'easeOutCubic',
            duration: 250,
            delay: 0,
        });
        tl.add(
            {
                targets: outlineTRef.current,
                width: [0, '100%'],
                marginLeft: [0, 0],
            },
            '-=250',
        );
        tl.add({
            targets: outlineBRef.current,
            marginLeft: ['100%', 0],
            width: [0, '100%'],
        });
        tl.add(
            {
                targets: outlineRRef.current,
                marginTop: [0, 0],
                height: [0, '100%'],
            },
            '-=250',
        );
        tl.add({
            targets: outlineLRef.current,
            marginTop: ['100%', 0],
            height: [0, '100%'],
        });
        tl.add(
            {
                targets: outlineTRef.current,
                width: 0,
                marginLeft: '100%',
            },
            '-=250',
        );
        tl.add({
            targets: outlineBRef.current,
            width: 0,
        });
        tl.add(
            {
                targets: outlineRRef.current,
                marginTop: [0, '100%'],
                height: 0,
            },
            '-=250',
        );
        tl.add({
            targets: outlineLRef.current,
            height: 0,
        });
        tl.pause();
        borderTL.current = tl;
    }, []);

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(true);
        borderTL.current?.restart();
        console.log('drag enter');
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        borderTL.current?.pause();
        console.log('drag leave');
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
        <div className='relative flex w-full h-full' ref={containerRef}>
            <div className={`absolute flex w-full h-full ${isDragOver ? '' : 'hidden'}`}>
                <div
                    className='absolute w-full h-full rounded-lg border-blush border-t-2'
                    ref={outlineTRef}
                />
                <div
                    className='absolute self-end w-full h-full rounded-lg border-blush border-b-2'
                    ref={outlineBRef}
                />
                <div
                    className='absolute w-full h-full rounded-lg border-blush border-l-2'
                    ref={outlineLRef}
                />
                <div
                    className='absolute w-full h-full rounded-lg border-blush border-r-2'
                    ref={outlineRRef}
                />
            </div>
            <label
                className='flex flex-col z-10 gap-y-4 items-center justify-center box-border border-dashed border-blush border-2 w-full h-full text-blush cursor-pointer p-4 bg-transparent rounded-lg'
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={bgRef}>
                {image ? (
                    <img
                        className='max-w-full aspect-square object-cover'
                        src={image instanceof File ? URL.createObjectURL(image as File) : image}
                    />
                ) : (
                    <div className='z-0 w-[40px] h-[40px]' ref={iconRef}>
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
        </div>
    );
}
