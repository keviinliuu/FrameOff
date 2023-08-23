import { useSlideStore } from '../stores/useSlideStore';
import { useState, useEffect } from 'react';
import SlideView from '../components/SlideView';
import { useParams } from 'react-router-dom';
import Logo from '../components/Logo.tsx';

export interface ViewPollProps {
    _id: string;
    title: string;
    
}

export default function ViewPoll() {
    const { _id } = useParams<{_id: string}>();
    const loadSlides = useSlideStore(state => state.loadSlides);
    const slides = useSlideStore(state => state.slides);
    const pollTitle = useSlideStore(state => state.pollTitle);
    const pollDescription = useSlideStore(state => state.pollDescription);
    useEffect(() => {
        console.log(`${_id}`);
        if (_id !== undefined) {
            loadSlides(_id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only execute once on mount
    }, []);
    return (
        <div className='flex h-full justify-center'>
            <Logo/>
            <div className='p-8 flex flex-col w-screen positon: absolute gap-y-4 items-center object-center'>
                <div className='text-5xl text-blush'>{pollTitle}</div>
            </div>
            <div className='snap-start snap-y flex flex-col snap-mandatory h-screen w-screen overflow-x-hidden scrollbar-none'>
                {slides.map(slide => (
                    <div className='snap-start snap-always grid min-h-full w-screen place-items-center'>
                        <SlideView
                            key={slide._id}
                            title={slide.slideTitle}
                            description={slide.slideDescription}
                            imageOne={slide.image1}
                            imageTwo={slide.image2}
                            _id={slide._id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
