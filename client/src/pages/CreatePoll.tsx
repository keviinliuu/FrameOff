import { useSlideStore } from '../stores/useSlideStore';
import { SlideData } from '../data/types';
import SlideEdit from '../components/SlideEdit';
import { CE } from '../data/types';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

import Logo from '../assets/frameoff-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faChevronUp,
    faChevronDown,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

export default function CreatePoll() {
    // VARIABLES FOR SLIDE CREATION
    const [slidesDisplay, setSlidesDisplay] = useState<JSX.Element[]>([]);
    const slides = useSlideStore(state => state.slides);
    const slidesAreValid = useSlideStore(state => state.slidesAreValid);
    const addSlide = useSlideStore(state => state.addSlide);
    const editSlide = useSlideStore(state => state.editSlide);
    const getSlide = useSlideStore(state => state.getSlide);
    const validateSlides = useSlideStore(state => state.validateSlides);
    const generateSlideImages = useSlideStore(state => state.generateSlideImages);
    const uploadPoll = useSlideStore(state => state.uploadPoll);
    const [pollTitle, setPollTitle] = useState('My Awesome Image Duel');

    useEffect(() => {
        handleCreateSlide();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- #FIXME exhaustive deps
    }, []);

    const handleCreateSlide = () => {
        // TODO: Handle indeces (slides are displayed in order of index.)
        const newSlide: SlideData = {
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
        const newSlideDisplay: JSX.Element = (
            <div
                key={newSlide._id}
                className='snap-start snap-alway grid min-h-full w-screen place-items-center'>
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
        setSlidesDisplay(slidesDisplay.concat([newSlideDisplay]));
    };
    return (
        <div className='flex h-full justify-center'>
            <div className='flex fixed top-0 left-0 right-0 justify-between p-8 pb-0'>
                <div className='inline-flex'>
                    <img className='h-10 aspect-{25/6}' src={Logo} />
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <div className='text-white text-xl'>Cooking up</div>
                    <div className='text-5xl text-blush'>{pollTitle}</div>
                </div>
                <button className='flex h-fit p-4 bg-blush gap-x-3 items-center rounded-lg font-semibold'>
                    <FontAwesomeIcon icon={faCheck} size='xl' />
                    <p className='flex items-center text-midnight text-xl align-middle'>Finished</p>
                </button>
            </div>
            <div className='snap-start snap-y flex flex-col snap-mandatory h-screen w-screen overflow-x-hidden scrollbar-none'>
                {slidesDisplay ? (
                    slidesDisplay
                ) : (
                    <div>You have no slides! Press the button to create your first slide!</div>
                )}
            </div>
            <div className='fixed flex bottom-0 left-0 right-0 justify-center p-8 pt-0'>
                <FontAwesomeIcon
                    className='text-blush cursor-pointer'
                    icon={faCirclePlus}
                    size='3x'
                    onClick={handleCreateSlide}
                />
            </div>
        </div>
    );
}
