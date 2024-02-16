import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../../index.css';

export interface PollInfoProps {
    handleFinish: (title: string, description: string, finish: boolean) => void;
}

export default function PollInfo({ handleFinish }: PollInfoProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
                className='w-[180%] placeholder:text-2xl text-2xl rounded-lg border-2 border-plum bg-nocturne py-3 text-center text-blush placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0 transition ease-in-out'
                placeholder='Enter title...'
                maxLength={60}
                onChange={e => {
                    setTitle(e.target.value);
                }}
            />
            <div className='text-white text-2xl pt-20'>and a description too! (if you want...)</div>
            <input
                className='w-[180%] placeholder:text-2xl text-2xl rounded-lg border-2 border-plum bg-nocturne py-3 text-center text-blush placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0 transition ease-in-out'
                placeholder='Enter description... (optional)'
                onChange={e => setDescription(e.target.value)}
            />
            <div className={'absolute bottom-6'}>
                {title && (
                    <button
                        style={title.length !== 0 ? mountedStyle : unmountedStyle}
                        onClick={() => handleFinish(title, description, true)}>
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
