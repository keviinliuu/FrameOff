import { CE } from '../data/types';
import Logo from '../assets/frameoff-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export interface PollInfoProps {
    handleTitle: (e: CE) => string;
    handleDescription: (e: CE) => string;
}

export default function PollInfo({ handleTitle, handleDescription }: PollInfoProps) {
    const [hasTitleInput, setHasTitleInput] = useState(false);

    const handleTitleChange = (e: CE) => {
        const title = handleTitle(e);
        setHasTitleInput(!!title);
    };

    return (
        <div className='min-h-screen: space-y-20 bg-midnight'>
            <div className='flex'>
                <div className='inline-flex'>
                    <img className='h-10 aspect-{25/6}' src={Logo} />
                </div>
            </div>
            <div className='space-y-4'>
                <div className='flex justify-center gap-y-4 text-white'>
                    Give your duel a title!
                </div>
                <div className='flex justify-center gap-x-8'>
                    <input
                        className=' sm:text-md w-3/5 rounded-lg border-2 border-blush bg-nocturne p-4 text-center text-plum placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0'
                        placeholder='enter title'
                        onChange={(e: CE) => {
                            handleTitleChange(e);
                            handleTitle(e);
                        }}
                    />
                </div>
            </div>
            <div className='space-y-4'>
                <div className='flex justify-center gap-y-4 text-plum'>
                    and a description too! (if you want...)
                </div>
                <div className='flex justify-center gap-x-8'>
                    <input
                        className=' sm:text-md w-3/5 rounded-lg border-2 border-blush bg-nocturne p-4 text-center text-plum placeholder:text-plum focus:border-blush focus:outline-none focus:ring-0'
                        placeholder='enter description'
                        onChange={handleDescription}
                    />
                </div>
            </div>
            <div className='space-y-30 flex justify-center gap-y-4'>
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
