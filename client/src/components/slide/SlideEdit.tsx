import { CE } from '../../data/types';
import { useEffect, useState } from 'react';
import { useSlideStore } from '../../stores/useSlideStore';

import Slide from './Slide';
import FileUpload from '../elements/FileUpload';

export interface SlideEditProps {
    _id?: string;
    handleTitle: (e: CE) => void;
    handleImageOne: (image: File) => void;
    handleImageOneCaption: (e: CE) => void;
    handleImageTwo: (image: File) => void;
    handleImageTwoCaption: (e: CE) => void;
}

export default function SlideEdit({
    _id,
    handleTitle,
    handleImageOne,
    handleImageOneCaption,
    handleImageTwo,
    handleImageTwoCaption,
}: SlideEditProps) {
    const maxTitleChars = 50;
    const maxCaptionChars = 30;

    const [imageOne, setImageOne] = useState<File | string>();
    const [imageTwo, setImageTwo] = useState<File | string>();
    const commonInputClass =
        'placeholder:text-center text-center text-blush placeholder:text-plum bg-transparent border-transparent border-b border-transparent focus:border-blush focus:border-b focus:outline-none focus:ring-0 placeholder:text-2xl text-2xl py-1 transition-colors ease-in-out duration-75';

    const [titleAtMax, setTitleAtMax] = useState(false);
    const [captionOneAtMax, setCaptionOneAtMax] = useState(false);
    const [captionTwoAtMax, setCaptionTwoAtMax] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleTitle(e);
        setTitleAtMax(e.target.value.length >= maxTitleChars);
    };

    const handleCapOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageOneCaption(e);
        setCaptionOneAtMax(e.target.value.length >= maxCaptionChars);
    };

    const handleCapTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageTwoCaption(e);
        setCaptionTwoAtMax(e.target.value.length >= maxCaptionChars);
    };

    useEffect(
        () =>
            useSlideStore.subscribe(
                state => state.slides.find(slide => slide._id === _id),
                newState => {
                    if (newState) {
                        const newURLOne = newState!.image1.url;
                        const newURLTwo = newState!.image2.url;
                        if (imageOne !== newURLOne) setImageOne(newURLOne!);
                        if (imageTwo !== newURLTwo) setImageTwo(newURLTwo!);
                    }
                },
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps -- #FIX ME: exhaustive deps
        [],
    );
    return (
        <Slide>
            <input
                className={`sm:hidden text-raspberry w-[30vw] placeholder:text-3xl text-3xl md:mb-6 ${commonInputClass} ${titleAtMax ? 'wobble' : ''}`}
                onChange={handleTitleChange}
                placeholder='Enter title'
                maxLength={maxTitleChars}
            />
            <div className='flex sm:justify-between flex-col md:flex-row sm:h-full w-full gap-y-2 md:gap-x-36 justify-center items-center'>
                <input
                    className={`md:hidden text-raspberry w-2/3 placeholder:text-xl translate-y-1 text-xl ${commonInputClass} ${titleAtMax ? 'wobble' : ''}`}
                    onChange={handleTitleChange}
                    placeholder='Enter title'
                    maxLength={maxTitleChars}
                />
                <div className='flex md:w-[25vw] flex-col gap-y-1 md:gap-y-4 items-center'>
                    <div className='aspect-square w-full sm:h-[25vh] sm:w-[25vh]'>
                        <FileUpload image={imageOne} onChange={handleImageOne} />
                    </div>
                    <input
                        className={`placeholder:text-base text-base md:placeholder:text-2xl md:text-2xl w-[50vw] md:w-[20vw] ${commonInputClass} ${captionOneAtMax ? 'wobble' : ''}`}
                        onChange={handleCapOneChange}
                        placeholder='Enter caption'
                        maxLength={maxCaptionChars}
                    />
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <div className='flex text-xl md:text-3xl items-center text-blush pb-4'>VS</div>
                </div>
                <div className='flex md:w-[25vw] flex-col gap-y-1 md:gap-y-4 items-center'>
                    <div className='aspect-square w-full sm:h-[25vh] sm:w-[25vh]'>
                        <FileUpload image={imageTwo} onChange={handleImageTwo} />
                    </div>
                    <input
                        className={`placeholder:text-base text-base md:placeholder:text-2xl md:text-2xl w-[50vw] md:w-[20vw] ${commonInputClass} ${captionTwoAtMax ? 'wobble' : ''}`}
                        onChange={handleCapTwoChange}
                        placeholder='Enter caption'
                        maxLength={maxCaptionChars}
                    />
                </div>
            </div>
        </Slide>
    );
}
