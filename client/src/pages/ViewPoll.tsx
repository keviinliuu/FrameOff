import { useSlideStore } from '../stores/useSlideStore';
import { useEffect } from 'react';
import SlideView from '../components/SlideView';

export interface ViewPollProps {
    _id: string;
}

export default function ViewPoll({ _id }: ViewPollProps) {
    const loadSlides = useSlideStore(state => state.loadSlides);
    const slides = useSlideStore(state => state.slides);
    useEffect(() => {
        loadSlides(_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only execute once on mount
    }, []);
    return (
        <div className='flex flex-col gap-y-6'>
            {slides.map(slide => (
                <SlideView
                    key={slide.id}
                    title={slide.slideTitle}
                    description={slide.slideDescription}
                    imageOne={slide.image1}
                    imageTwo={slide.image2}
                />
            ))}
        </div>
    );
}
