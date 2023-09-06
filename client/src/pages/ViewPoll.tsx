import { useSlideStore } from '../stores/useSlideStore';
import { useRef, useState, useEffect, useCallback } from 'react';
import SlideView from '../components/SlideView';
import { useParams } from 'react-router-dom';
import Logo from '../components/Logo.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronUp,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
export interface ViewPollProps {
    _id: string;
    title: string;
    
}

const intersectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

export default function ViewPoll() {
    const { _id } = useParams<{_id: string}>();
    const loadSlides = useSlideStore(state => state.loadSlides);
    const slides = useSlideStore(state => state.slides);
    const pollTitle = useSlideStore(state => state.pollTitle);
    const pollDescription = useSlideStore(state => state.pollDescription);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const getSlide = useSlideStore(state => state.getSlide);
    const getSlideCount = useSlideStore(state => state.getSlideCount);
    const getSlideFromIndex = useSlideStore(state => state.getSlideFromIndex);
    const slideRefs = useRef<HTMLDivElement[]>([]);
    const observer = useRef<IntersectionObserver | null>(null);
    const addNode = useCallback((node: HTMLDivElement) => {
        slideRefs.current.push(node);
        observer.current?.observe(node);
        setActiveCount(getSlideCount());
    }, []);
    const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
        console.log(`len ${entries.length}`)
        var entry = entries[entries.length-1]
        console.log(`ratio ${entry.intersectionRatio}`)
        //if (!entry.intersectionRatio) entry.target.scrollIntoView();
        if (entry.intersectionRatio >= 1.0) {
            console.log(getSlide(entry.target.id)?.index)
            setActiveIndex(getSlide(entry.target.id)?.index ?? 0);
            setActiveCount(getSlideCount());
        }
    };
    const scrollTo = (i: number) => {
        const id = getSlideFromIndex(i)?._id;
        slideRefs.current.find(slideRef => slideRef.id === id)?.scrollIntoView();
    };
    useEffect(() => {
        console.log(`${_id}`);
        if (_id !== undefined) {
            loadSlides(_id);
            setActiveCount(slides.length);
        }
        if (!observer.current)
            observer.current = new IntersectionObserver(intersectionHandler, intersectionOptions);
        return () => observer.current?.disconnect();
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
                    <div className='snap-start snap-always grid min-h-full w-screen place-items-center'
                    ref={addNode}
                    key={slide._id}
                    id={slide._id}>
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
            <div className='flex flex-col fixed top-1/2 left-0 items-center -translate-y-1/2'>
                <div className='flex flex-col gap-y-3 items-center p-24'>
                    <FontAwesomeIcon
                        className='text-neutral-400 cursor-pointer'
                        icon={faChevronUp}
                        size='2xl'
                        onClick={() => scrollTo(activeIndex - 1)}
                    />
                    <div className='text-blush text-3xl tracking-widest'>
                        {activeIndex + 1}/{activeCount}
                    </div>
                    <FontAwesomeIcon
                        className='text-neutral-400 cursor-pointer'
                        icon={faChevronDown}
                        size='2xl'
                        onClick={() => scrollTo(activeIndex + 1)}
                    />
                </div>
            </div>
        </div>
    );
}
