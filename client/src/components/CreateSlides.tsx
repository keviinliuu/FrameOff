import { useSlideStore } from '../stores/useSlideStore';
import { SlideData } from '../data/types';
import SlideEdit from '../components/slide/SlideEdit';
import { CE } from '../data/types';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import Logo from '../assets/frameoff-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faChevronUp,
    faChevronDown,
    faCirclePlus,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

const intersectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

export default function CreateSlides() {
    // VARIABLES FOR SLIDE CREATION
    const [slidesDisplay, setSlidesDisplay] = useState<JSX.Element[]>([]);
    const slidesAreValid = useSlideStore(state => state.slidesAreValid);
    const addSlide = useSlideStore(state => state.addSlide);
    const editSlide = useSlideStore(state => state.editSlide);
    const getSlide = useSlideStore(state => state.getSlide);
    const getSlideCount = useSlideStore(state => state.getSlideCount);
    const getSlideFromIndex = useSlideStore(state => state.getSlideFromIndex);
    const validateSlides = useSlideStore(state => state.validateSlides);
    const generateSlideImages = useSlideStore(state => state.generateSlideImages);
    const uploadPoll = useSlideStore(state => state.uploadPoll);
    const clearSlides = useSlideStore(state => state.clearSlides);
    const deleteSlideByIndex = useSlideStore(state => state.deleteSlideByIndex);
    const [pollTitle, setPollTitle] = useState('My Awesome Image Duel');
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCount, setActiveCount] = useState(1);

    const observer = useRef<IntersectionObserver | null>(null);
    const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (!entry.intersectionRatio) entry.target.scrollIntoView();
            if (entry.intersectionRatio >= 1.0) {
                setActiveIndex(getSlide(entry.target.id)?.index ?? 0);
                setActiveCount(getSlideCount());
            }
        });
    };
    const scrollTo = (i: number) => {
        const id = getSlideFromIndex(i)?._id;
        if (id) {
            setActiveIndex(i);
            document.getElementById(id!)?.scrollIntoView();
        }
    };
    const handleDeleteSlide = (i: number) => {
        const target = document.getElementById(getSlideFromIndex(i)!._id);
        if (target) {
            observer.current?.unobserve(target);
            setSlidesDisplay(slidesDisplay.filter(slide => slide.key !== target.id));
            deleteSlideByIndex(i);
            setActiveIndex(i === 0 ? i + 1 : i - 1);
        }
    };

    useLayoutEffect(() => {
        slidesDisplay.forEach(
            slide => observer.current?.observe(document.getElementById(slide.key as string)!),
        );
    }, [slidesDisplay]);

    useEffect(() => {
        clearSlides();
        handleCreateSlide();
        if (!observer.current)
            observer.current = new IntersectionObserver(intersectionHandler, intersectionOptions);

        return () => observer.current?.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- #FIXME exhaustive deps
    }, []);

    const handleCreateSlide = () => {
        const newSlide: SlideData = {
            index: 0,
            _id: uuidv4(),
            slideTitle: '',
            slideDescription: '',
            image1: {
                url: null,
                caption: '',
            },
            image2: {
                url: null,
                caption: '',
            },
        };
        addSlide(newSlide);
        const display: JSX.Element = (
            <div
                key={newSlide._id}
                id={newSlide._id}
                className='snap-start snap-always grid min-h-full w-screen place-items-center'>
                <SlideEdit
                    _id={newSlide._id}
                    handleTitle={(e: CE) =>
                        editSlide(newSlide._id!, { slideTitle: e.target.value })
                    }
                    handleDescription={(e: CE) =>
                        editSlide(newSlide._id!, { slideDescription: e.target.value })
                    }
                    handleImageOne={(image: File) => {
                        // TODO: Implement a better way of only updating "url" key.
                        // Currently fetching caption of slide and passing it along to editSlide.
                        const caption = getSlide(newSlide._id!)?.image1.caption;
                        editSlide(newSlide._id!, { image1: { url: image, caption: caption } });
                        validateSlides();
                    }}
                    // TODO: Implement better way of updating only "caption" key.
                    handleImageOneCaption={(e: CE) => {
                        const image = getSlide(newSlide._id!)?.image1.url as File;
                        editSlide(newSlide._id!, {
                            image1: { url: image, caption: e.target.value },
                        });
                    }}
                    handleImageTwo={(image: File) => {
                        const caption = getSlide(newSlide._id!)?.image2.caption;
                        editSlide(newSlide._id!, { image2: { url: image, caption: caption } });
                        validateSlides();
                    }}
                    handleImageTwoCaption={(e: CE) => {
                        const image = getSlide(newSlide._id!)?.image2.url as File;
                        editSlide(newSlide._id!, {
                            image2: { url: image, caption: e.target.value },
                        });
                    }}
                />
            </div>
        );
        setSlidesDisplay(slidesDisplay.concat([display]));
    };
    return (
        <div className='relative flex min-h-screen justify-center'>
            <div className='flex absolute top-0 left-0 right-0 justify-between p-8 pb-0'>
                <div className='inline-flex'>
                    <img className='h-10 aspect-{25/6}' src={Logo} />
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <div className='text-moonbeam text-xl'>Cooking up</div>
                    <div className='text-5xl text-blush'>{pollTitle}</div>
                </div>
                <button
                    className='flex h-12 p-4 bg-blush text-midnight gap-x-3 items-center rounded-lg disabled:opacity-30 select-none'
                    disabled={!slidesAreValid}>
                    <FontAwesomeIcon icon={faCheck} size='xl' className='self-center' />
                    <p className='flex items-center text-2xl align-middle translate-y-0.5'>
                        Finish
                    </p>
                </button>
            </div>
            <div className='snap-start snap-y flex flex-col snap-mandatory h-screen w-screen overflow-x-hidden scroll-smooth'>
                {slidesDisplay ? (
                    slidesDisplay
                ) : (
                    <div>You have no slides! Press the button to create your first slide!</div>
                )}
            </div>
            <div className='absolute flex bottom-0 left-0 right-0 justify-center p-8 pt-0'>
                <FontAwesomeIcon
                    className='text-blush cursor-pointer'
                    icon={faCirclePlus}
                    size='3x'
                    onClick={handleCreateSlide}
                />
            </div>
            <div className='flex flex-col absolute top-1/2 left-0 items-center -translate-y-1/2 select-none'>
                <div className='flex flex-col gap-y-3 items-center p-24'>
                    <FontAwesomeIcon
                        className={`text-neutral-400 ${
                            activeIndex >= 1 ? 'cursor-pointer' : 'opacity-30'
                        }`}
                        icon={faChevronUp}
                        size='2xl'
                        onClick={() => {
                            if (activeIndex >= 1) scrollTo(activeIndex - 1);
                        }}
                    />
                    
                    <div className='flex text-blush text-3xl space-x-2 w-12'>
                        <div className='flex-none w-3'>
                            <span className={`${activeIndex > 8 ? 'ml-[-10px]' : ''}`}>
                                {activeIndex + 1}
                            </span>
                        </div>
                        <div className='flex justify-center w-3'>/</div>
                        <div className='flex-none w-3'>{activeCount}</div>
                    </div>

                    <FontAwesomeIcon
                        className={`text-neutral-400 cursor-pointer ${
                            activeIndex < activeCount - 1 ? 'cursor-pointer' : 'opacity-30'
                        }`}
                        icon={faChevronDown}
                        size='2xl'
                        onClick={() => {
                            if (activeIndex < activeCount - 1) scrollTo(activeIndex + 1);
                        }}
                    />
                </div>
            </div>
            <div className='flex absolute bottom-0 left-0 p-8'>
                <FontAwesomeIcon
                    className={`text-blush ${activeCount > 1 ? 'cursor-pointer' : 'opacity-30'}`}
                    icon={faTrashCan}
                    size='3x'
                    onClick={() => {
                        if (activeCount > 1) handleDeleteSlide(activeIndex);
                    }}
                />
            </div>
        </div>
    );
}
