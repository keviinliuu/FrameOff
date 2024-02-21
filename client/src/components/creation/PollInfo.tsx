import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../../index.css';

export interface PollInfoProps {
    handleFinish: (title: string, description: string, finish: boolean) => void;
}

export default function PollInfo({ handleFinish }: PollInfoProps) {
    const maxTitleChars = 60;
    const maxDescChars = 180;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const [titleAtMax, setTitleAtMax] = useState(false);
    const [descAtMax, setDescAtMax] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        setTitleAtMax(value.length >= maxTitleChars);
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
        <div className='relative flex flex-col justify-center items-center gap-y-4 min-h-screen w-fit bg-midnight snap-start'>
            <div className='text-white text-2xl'>Give your duel a title!</div>

            <input
                className={`w-[180%] placeholder:text-2xl text-2xl rounded-lg border-2 border-plum bg-nocturne py-3 text-center text-blush placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0 transition ease-in-out ${titleAtMax ? 'wobble' : ''}`}
                placeholder='Enter title...'
                maxLength={maxTitleChars}
                onChange={handleTitleChange}
            />

            <div className='text-white text-2xl pt-20'>and a description too! (if you want...)</div>
            <textarea
                className={`w-[180%] placeholder:text-2xl text-2xl rounded-lg border-2 border-plum bg-nocturne py-3 px-2 text-center text-blush placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0 transition ease-in-out resize-none ${descAtMax ? 'wobble' : ''}`}
                placeholder='Enter description... (optional)'
                maxLength={180}
                rows={1}
                onChange={handleDescChange}
                style={{minHeight: '60px'}}
                onInput={e => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                }}></textarea>

            <div className='absolute bottom-6'>
                {title && (
                    <button
                        style={title.length !== 0 ? mountedStyle : unmountedStyle}
                        onClick={() => {
                            handleFinish(title, description, true);
                        }}>
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            className='cursor-pointer text-blush fa-3x animate-bounce'
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
