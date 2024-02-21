import { CE } from '../../data/types';
import { useEffect, useState } from 'react';
import { useSlideStore } from '../../stores/useSlideStore';

import Slide from './Slide';
import FileUpload from '../elements/FileUpload';

export interface SlideEditProps {
    _id?: string;
    handleTitle: (e: CE) => void;
    handleDescription: (e: CE) => void;
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
    }

    const handleCapOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageOneCaption(e);
        setCaptionOneAtMax(e.target.value.length >= maxCaptionChars);
    }

    const handleCapTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageTwoCaption(e);
        setCaptionTwoAtMax(e.target.value.length >= maxCaptionChars);
    }

    useEffect(
        () =>
            useSlideStore.subscribe(
                state => state.slides.find(slide => slide._id === _id),
                newState => {
                    const newURLOne = newState!.image1.url;
                    const newURLTwo = newState!.image2.url;
                    if (imageOne !== newURLOne) setImageOne(newURLOne!);
                    if (imageTwo !== newURLTwo) setImageTwo(newURLTwo!);
                },
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps -- #FIX ME: exhaustive deps
        [],
    );
    return (
        <Slide>
            <input
                className={`text-raspberry w-1/3 ${commonInputClass} ${titleAtMax ? 'wobble' : ''}`}
                onChange={handleTitleChange}
                placeholder='Enter title... (optional)'
                maxLength={maxTitleChars}
            />
            <div className='flex w-full gap-x-36 justify-center items-center'>
                <div className='flex w-1/4 flex-col gap-y-8 items-center'>
                    <div className='aspect-square w-full'>
                        <FileUpload image={imageOne} onChange={handleImageOne} />
                    </div>
                    <input
                        className={`w-96 text-sm' ${commonInputClass} ${captionOneAtMax ? 'wobble' : ''}`}
                        onChange={handleCapOneChange}
                        placeholder='Enter caption... (optional)'
                        maxLength={maxCaptionChars}
                    />
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <div className='flex text-3xl items-center text-blush'>VS</div>
                    <input
                        className='placeholder:text-2xl text-2xl w-0 invisible'
                        placeholder='X'
                    />
                </div>
                <div className='flex w-1/4 flex-col gap-y-8 items-center'>
                    <div className='aspect-square w-full'>
                        <FileUpload image={imageTwo} onChange={handleImageTwo} />
                    </div>
                    <input
                        className={`w-96 text-sm' ${commonInputClass} ${captionTwoAtMax ? 'wobble' : ''}`}
                        onChange={handleCapTwoChange}
                        placeholder='Enter caption... (optional)'
                        maxLength={maxCaptionChars}
                    />
                </div>
            </div>
        </Slide>
    );
}
