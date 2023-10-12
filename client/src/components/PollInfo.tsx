import { CE } from '../data/types';
import Logo from '../assets/frameoff-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export interface PollInfoProps {
    handleTitle: (e: CE) => void;
    handleDescription: (e: CE) => void;
}

export default function PollInfo({ handleTitle, handleDescription }: PollInfoProps) {
    const [hasTitleInput, setHasTitleInput] = useState(false);

    const handleTitleChange = (e: CE) => {
        const title = e.target.value;
        setHasTitleInput(!!title);
    };

    return (
        <div className='relative flex flex-col justify-center items-center gap-y-4 min-h-screen w-fit bg-midnight snap-start'>
            <div className='text-white text-2xl'>Give your duel a title!</div>
            <input
                className='w-[150%] placeholder:text-2xl text-2xl rounded-lg border-2 border-plum bg-nocturne py-3 text-center text-blush placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0'
                placeholder='Enter title...'
                onChange={(e: CE) => {z
                    handleTitleChange(e);
                    handleTitle(e);
                }}
            />
            <div className='text-white text-2xl pt-16'>and a description too! (if you want...)</div>
            <input
                className='w-[150%] placeholder:text-2xl text-2xl rounded-lg border-2 border-plum bg-nocturne py-3 text-center text-blush placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0'
                placeholder='Enter description...'
                onChange={handleDescription}
            />
            <div className='absolute bottom-6'>
                {hasTitleInput && (
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        className='cursor-pointer text-blush fa-3x'
                    />
                )}
            </div>
        </div>
    );
}
