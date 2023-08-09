import { useSlideStore } from '../stores/useSlideStore';
import { SlideData } from '../data/types';
import SlideEdit from '../components/SlideEdit';
import { CE } from '../data/types';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function CreatePoll() {
    const [slidesDisplay, setSlidesDisplay] = useState<JSX.Element[]>([]);
    const slides = useSlideStore(state => state.slides);
    const addSlide = useSlideStore(state => state.addSlide);
    const editSlide = useSlideStore(state => state.editSlide);
    const getSlide = useSlideStore(state => state.getSlide);
    const validateSlides = useSlideStore(state => state.validateSlides);

    const printSlides = () => {
        console.log(slides);
    };

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
            <SlideEdit
                key={newSlide._id}
                _id={newSlide._id}
                handleTitle={(e: CE) => editSlide(newSlide._id!, { slideTitle: e.target.value })}
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
                    editSlide(newSlide._id!, { image1: { url: image, caption: e.target.value } });
                }}
                handleImageTwo={(image: File) => {
                    const caption = getSlide(newSlide._id!)?.image2.caption;
                    editSlide(newSlide._id!, { image2: { url: image, caption: caption } });
                }}
                handleImageTwoCaption={(e: CE) => {
                    const image = getSlide(newSlide._id!)?.image2.url as File;
                    editSlide(newSlide._id!, { image2: { url: image, caption: e.target.value } });
                }}
            />
        );
        setSlidesDisplay(slidesDisplay.concat([newSlideDisplay]));
    };
    return (
        <div className='flex flex-col gap-y-8'>
            <button onClick={handleCreateSlide}>Create Slide</button>
            <button onClick={printSlides}>Print Current Slides</button>
            <button
                onClick={() =>
                    validateSlides() ? console.log('Validated!') : console.log('Invalid!')
                }>
                Validate Slides
            </button>
            {slidesDisplay ? (
                slidesDisplay
            ) : (
                <div>You have no slides! Press the button to create your first slide!</div>
            )}
        </div>
    );
}
