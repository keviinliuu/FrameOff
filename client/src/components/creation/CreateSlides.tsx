import { useSlideStore } from '../../stores/useSlideStore';
import { SlideData } from '../../data/types';
import { CE } from '../../data/types';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import SlideEdit from '../slide/SlideEdit';
import FinishPopup from '../elements/FinishPopup';
import SlidePicker from '../voting/SlidePicker';
interface CreateSlidesProps {
    pollTitle: string;
    setFinishPoll: React.Dispatch<React.SetStateAction<boolean>>;
}

const intersectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

export default function CreateSlides({ pollTitle, setFinishPoll }: CreateSlidesProps) {
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
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCount, setActiveCount] = useState(1);
    const [finish, setFinish] = useState(false);
    const navigate = useNavigate();

    const observer = useRef<IntersectionObserver | null>(null);
    const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (!entry.intersectionRatio) {
                entry.target.scrollIntoView({ behavior: 'smooth' });
            }
            if (entry.intersectionRatio >= 1.0) {
                setActiveIndex(getSlide(entry.target.id)?.index ?? 0);
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

    const handleDeleteSlide = () => {
        const curIndex = activeIndex;
        const target = document.getElementById(getSlideFromIndex(curIndex)!._id);

        if (target) {
            deleteSlideByIndex(curIndex);
            setActiveCount(getSlideCount());
        }

        if (curIndex != 0) {
            document.getElementById(getSlideFromIndex(curIndex - 1)?._id!)?.scrollIntoView();
            setActiveIndex(curIndex - 1);
        } else {
            document.getElementById(getSlideFromIndex(curIndex)?._id!)?.scrollIntoView();
        }

        setTimeout(() => {
            if(target) {
                setSlidesDisplay(slidesDisplay.filter(slide => slide.key !== target.id))
            }
        }, 700)
    };

    const handleFinish = async () => {
        setFinishPoll(true);
        await generateSlideImages();
        await uploadPoll();
        navigate('/share');
    };

    useLayoutEffect(() => {
        slidesDisplay.forEach(slide =>
            observer.current?.observe(document.getElementById(slide.key as string)!),
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
        setActiveCount(getSlideCount());
        setActiveIndex(activeIndex + 1);
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
            <FinishPopup
                open={finish}
                onClose={() => setFinish(false)}
                onFinish={handleFinish}></FinishPopup>

            <div className='absolute flex flex-row w-full top-0 left-0 right-0 justify-center items-center p-8 pb-0'>
                <div className='flex flex-col gap-x-2 md:gap-x-0 gap-y-1 md:gap-y-4 items-center pt-8 md:pt-4'>
                    <div className='sm:hidden text-moonbeam text-xl'>Cooking up</div>
                    <div className='text-2xl md:text-5xl text-blush text-center'>{pollTitle}</div>
                </div>
                <button
                    onClick={() => {
                        setFinish(true);
                    }}
                    className='absolute right-4 sm:top-6 md:translate-y-0 md:right-10 transition ease-in-out delay-150 duration-300 enabled:hover:scale-105 flex h-10 md:h-12 p-4 bg-blush text-midnight gap-x-3 items-center rounded-lg disabled:opacity-30 select-none'
                    disabled={!slidesAreValid}>
                    <FontAwesomeIcon icon={faCheck} size='xl' className='self-center' />
                    <p className='hidden md:flex items-center text-md md:text-2xl align-middle translate-y-0.5'>
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
            <div className='absolute flex bottom-0 left-0 right-0 justify-center p-4 md:p-8 pt-0 text-xs md:text-lg'>
                <FontAwesomeIcon
                    className='text-blush cursor-pointer'
                    icon={faCirclePlus}
                    size='3x'
                    onClick={handleCreateSlide}
                />
            </div>
            <SlidePicker activeIndex={activeIndex} activeCount={activeCount} scrollTo={scrollTo} />
            <div className='flex absolute bottom-0 left-0 p-4 md:p-8 text-3xl md:text-5xl'>
                <button onClick={handleDeleteSlide}>
                    <FontAwesomeIcon
                        className={`text-blush ${activeCount > 1 ? 'cursor-pointer' : 'opacity-30'}`}
                        icon={faTrashCan}
                    />
                </button>
            </div>
        </div>
    );
}
