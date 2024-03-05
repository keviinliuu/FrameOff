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
    const [roundFirst, setRoundFirst] = useState(true);
    const [roundSecond, setRoundSecond] = useState(false);

    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        const tl = anime.timeline({
            loop: true,
            easing: 'easeInOutCubic',
            duration: 500,
            delay: 0,
            loopBegin: () => {
                setRoundFirst(true);
                setRoundSecond(false);
            },
            loopComplete: () => {
                setRoundFirst(true);
                setRoundSecond(false);
            },
        });
        tl.add({
            targets: outlineTRef.current,
            width: ['3%', '100%'],
            marginLeft: [0, 0],
            change: anim => {
                if (anim.progress > 82) {
                    setRoundSecond(true);
                }
            },
        });
        tl.add(
            {
                targets: outlineBRef.current,
                marginLeft: ['97%', 0],
                width: ['3%', '100%'],
            },
            '-=500',
        );
        tl.add(
            {
                targets: outlineRRef.current,
                marginTop: [0, 0],
                height: ['3%', '100%'],
            },
            '-=500',
        );
        tl.add(
            {
                targets: outlineLRef.current,
                marginTop: ['97%', 0],
                height: ['3%', '100%'],
            },
            '-=500',
        );
        tl.add({
            targets: outlineTRef.current,
            width: '3%',
            marginLeft: '97%',
            change: anim => {
                if (anim.progress > 10) {
                    setRoundFirst(false);
                }
            },
        });
        tl.add(
            {
                targets: outlineBRef.current,
                width: '3%',
            },
            '-=500',
        );
        tl.add(
            {
                targets: outlineRRef.current,
                marginTop: [0, '97%'],
                height: '3%',
            },
            '-=500',
        );
        tl.add(
            {
                targets: outlineLRef.current,
                height: '3%',
            },
            '-=500',
        );
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
        handleMouseEnter();
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        borderTL.current?.pause();
        handleMouseLeave();
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
            <div className={`absolute flex w-full h-full ${isDragOver ? '' : 'hidden'} `}>
                <div
                    className={`absolute w-full h-full border-blush border-t-2 bg-transparent ${roundFirst ? 'rounded-tl-lg' : ''} ${roundSecond ? 'rounded-tr-lg' : ''}`}
                    ref={outlineTRef}
                />
                <div
                    className={`absolute self-end w-full h-full border-blush border-b-2 ${roundFirst ? 'rounded-br-lg' : ''} ${roundSecond ? 'rounded-bl-lg' : ''}`}
                    ref={outlineBRef}
                />
                <div
                    className={`absolute w-full h-full border-blush border-l-2 ${roundFirst ? 'rounded-bl-lg' : ''} ${roundSecond ? 'rounded-tl-lg' : ''}`}
                    ref={outlineLRef}
                />
                <div
                    className={`absolute w-full h-full border-blush border-r-2 ${roundFirst ? 'rounded-tr-lg' : ''} ${roundSecond ? 'rounded-br-lg' : ''}`}
                    ref={outlineRRef}
                />
            </div>
            <label
                className={`flex flex-col z-10 bg-clip-padding gap-y-4 items-center justify-center border-blush border-2 w-full h-full text-blush cursor-pointer p-4 bg-transparent rounded-lg ${image && !isDragOver ? '' : 'border-dashed'}`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={bgRef}>
                {image ? (
                    <img
                        className='max-w-full w-full aspect-square object-cover'
                        src={image instanceof File ? URL.createObjectURL(image as File) : image}
                    />
                ) : (
                    <div className='z-0 w-[20px] h-[20px] md:w-[40px] md:h-[40px] pointer-events-none' ref={iconRef}>
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
