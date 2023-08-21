import { useSlideStore } from '../stores/useSlideStore';
import { useEffect } from 'react';
import SlideView from '../components/SlideView';
import { useParams } from 'react-router-dom';

export interface ViewPollProps {
    _id: string;
}

export default function ViewPoll() {
    const { _id } = useParams<{ _id: string }>();
    const loadSlides = useSlideStore(state => state.loadSlides);
    const slides = useSlideStore(state => state.slides);
    useEffect(() => {
        console.log(`${_id}`);
        if (_id !== undefined) {
            loadSlides(_id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- #FIX ME: exhaustive deps
    }, []);
    return (
        <div className='flex flex-col h-screen w-screen scroll-auto gap-y-6 overflow-scroll snap-y snap-mandatory'>
            {slides.map(slide => (
                <SlideView
                    key={slide._id}
                    title={slide.slideTitle}
                    description={slide.slideDescription}
                    imageOne={slide.image1}
                    imageTwo={slide.image2}
                    _id={slide._id}
                />
            ))}
        </div>
    );
}
