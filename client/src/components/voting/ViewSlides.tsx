import { useSlideStore } from '../../stores/useSlideStore.ts';
import { useRef, useState, useEffect, useCallback } from 'react';

import SlideView from '../slide/SlideView.tsx';
import SlideViewArchive from '../slide/SlideViewArchive.tsx';

import SlidePicker from './SlidePicker.tsx';

const intersectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

export default function ViewPoll() {
    const slides = useSlideStore(state => state.slides);
    const pollTitle = useSlideStore(state => state.pollTitle);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const getSlide = useSlideStore(state => state.getSlide);
    const getSlideCount = useSlideStore(state => state.getSlideCount);
    const getSlideFromIndex = useSlideStore(state => state.getSlideFromIndex);
    const slideRefs = useRef<HTMLDivElement[]>([]);
    const observer = useRef<IntersectionObserver | null>(null);
    const addNode = useCallback(
        (node: HTMLDivElement) => {
            if (node) {
                slideRefs.current.push(node);
                observer.current?.observe(node);
                setActiveCount(getSlideCount());
            }
        },
        [getSlideCount],
    );

    const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[entries.length - 1];
        if (entry.intersectionRatio >= 1.0) {
            console.log(getSlide(entry.target.id)?.index);
            setActiveIndex(getSlide(entry.target.id)?.index ?? 0);
            setActiveCount(getSlideCount());
        }
    };
    const scrollTo = (i: number) => {
        const id = getSlideFromIndex(i)?._id;
        if (id) {
            setActiveIndex(i);
            slideRefs.current.find(slideRef => slideRef.id === id)?.scrollIntoView();
        }
    };
    useEffect(() => {
        setActiveCount(slides.length);
        if (!observer.current)
            observer.current = new IntersectionObserver(intersectionHandler, intersectionOptions);
        return () => observer.current?.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only execute once on mount
    }, []);
    return (
        <div className='relative flex h-full justify-center'>
            <div className='p-8 flex flex-col w-screen positon: absolute gap-y-4 items-center object-center'>
                <div className='pt-10 text-3xl md:text-5xl text-blush text-center'>{pollTitle}</div>
            </div>
            <div className='snap-start snap-y flex flex-col snap-mandatory h-screen w-screen overflow-x-hidden scrollbar-none scroll-smooth'>
                {slides.map((slide, index) => (
                    <div
                        className='relative snap-start snap-always grid min-h-full w-screen place-items-center'
                        ref={addNode}
                        key={slide._id}
                        id={slide._id}>
                        <SlideView
                            key={slide._id}
                            title={slide.slideTitle}
                            imageOne={slide.image1}
                            imageTwo={slide.image2}
                            _id={slide._id}
                            scrollDown={() => scrollTo(activeIndex + 1)}
                            slideIndex={index}
                            totalSlideCount={activeCount}
                        />
                    </div>
                ))}
                <SlidePicker
                    activeIndex={activeIndex}
                    activeCount={activeCount}
                    scrollTo={scrollTo}
                />
            </div>
        </div>
    );
}
