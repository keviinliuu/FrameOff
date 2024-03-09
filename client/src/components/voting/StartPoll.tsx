import { useSlideStore } from '../../stores/useSlideStore.ts';

import '../../index.css';
import React from 'react';

interface StartPollProps {
    onStart: () => void;
}

export default function StartPoll({ onStart }: StartPollProps) {
    const pollTitle = useSlideStore(state => state.pollTitle);
    const pollDescription = useSlideStore(state => state.pollDescription);

    const formatDescriptionForDisplay = (description: string | null) => {
        return description!.split('\n').map((line, index, array) => (
            <React.Fragment key={index}>
                {line}
                {index !== array.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className='relative flex flex-col snap-always snap-start min-h-screen w-fit justify-center gap-y-8 md:gap-y-0'>
            <div className='flex flex-col items-center text-moonbeam md:text-2xl text-center'>
                Time to vote on...
            </div>
            <div className='flex flex-col items-center md:py-10 md:mt-10 px-2 md:px-14'>
                <div className='text-blush text-5xl md:text-8xl text-center px-1 break-words w-fit'>
                    {pollTitle}
                </div>
            </div>
            <div className='flex flex-col items-center py-3 md:py-5 md:mt-10 text-raspberry text-xl md:text-3xl text-center px-5 md:px-20'>
                {formatDescriptionForDisplay(pollDescription)}
            </div>
            <div className='flex justify-center md:pt-12 mt-5'>
                <button
                    className='rounded-md border-2 border-blush text-blush text-2xl md:text-3xl w-32 h-12 pt-0.5 hover:bg-blush hover:text-midnight transition-colors'
                    onClick={onStart}>
                    Start
                </button>
            </div>
        </div>
    );
}
