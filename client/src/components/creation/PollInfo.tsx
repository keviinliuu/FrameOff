import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../../index.css';

export interface PollInfoProps {
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    onContinue: () => void;
}

export default function PollInfo({ setTitle, setDescription, onContinue }: PollInfoProps) {
    const maxTitleChars = 60;
    const maxDescChars = 180;

    const [existsTitle, setExistsTitle] = useState(false);
    const [titleAtMax, setTitleAtMax] = useState(false);
    const [descAtMax, setDescAtMax] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        setTitleAtMax(value.length >= maxTitleChars);
        setExistsTitle(value.length > 0);
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescription(value);
        setDescAtMax(value.length >= maxDescChars);
    };

    const mountedStyle = {
        animation: 'inAnimation 250ms ease-in',
    };
    const unmountedStyle = {
        animation: 'outAnimation 100ms ease-out',
    };

    return (
        <div className='relative flex flex-col justify-center items-center gap-y-4 min-h-screen snap-start snap-always'>
            <div className='text-white text-xl md:text-2xl'>Give your duel a title!</div>

            <input
                className={`w-[80vw] md:w-[38vw] placeholder:text-xl md:placeholder:text-2xl text-xl md:text-2xl rounded-lg border-2 border-plum bg-nocturne py-3 text-center text-blush placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0 transition ease-in-out ${titleAtMax ? 'wobble' : ''}`}
                placeholder='Enter title...'
                maxLength={maxTitleChars}
                onChange={handleTitleChange}
            />

            <div className='text-white text-xl md:text-2xl pt-20 text-center'>
                and a description too! (if you want...)
            </div>
            <textarea
                className={`w-[80vw] sm:h-3 md:w-[38vw] max-h-64 placeholder:text-xl md:placeholder:text-2xl text-xl md:text-2xl rounded-lg border-2 border-plum bg-nocturne py-4 md:py-3 px-2 text-center text-blush placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0 transition ease-in-out resize-none ${descAtMax ? 'wobble' : ''}`}
                placeholder='Enter description... (optional)'
                maxLength={180}
                rows={1}
                onChange={handleDescChange}
                style={{ minHeight: '60px' }}
                onInput={e => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                }}></textarea>

            <div className='absolute bottom-6'>
                {existsTitle && (
                    <button
                        style={existsTitle ? mountedStyle : unmountedStyle}
                        onClick={onContinue}>
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            className='cursor-pointer text-blush text-4xl md:text-5xl animate-bounce'
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
