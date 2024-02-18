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
    const [imageOne, setImageOne] = useState<File | string>();
    const [imageTwo, setImageTwo] = useState<File | string>();
    const commonInputClass =
        'placeholder:text-center text-center text-blush placeholder:text-plum bg-transparent border-transparent border-b border-transparent focus:border-blush focus:border-b focus:outline-none focus:ring-0 placeholder:text-2xl text-2xl py-1';

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
                className={`w-1/3 ${commonInputClass}`}
                onChange={handleTitle}
                placeholder='Enter title... (optional)'
                maxLength={50}
            />
            <div className='flex w-full gap-x-36 justify-center items-center'>
                <div className='flex w-1/4 flex-col gap-y-8 items-center'>
                    <div className='aspect-square w-full'>
                        <FileUpload image={imageOne} onChange={handleImageOne} />
                    </div>
                    <input
                        className={`text-sm' ${commonInputClass}`}
                        onChange={handleImageOneCaption}
                        placeholder='Enter caption... (optional)'
                        maxLength={30}
                    />
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <div className='flex text-3xl items-center text-blush'>VS</div>
                    <input
                        className='placeholder:text-2xl text-2xl w-0 invisible'
                        placeholder='X'
                    />
                </div>
                <div className='flex w-1/4 flex-col gap-y-4 items-center'>
                    <div className='aspect-square w-full'>
                        <FileUpload image={imageTwo} onChange={handleImageTwo} />
                    </div>
                    <input
                        className={`text-sm' ${commonInputClass}`}
                        onChange={handleImageTwoCaption}
                        placeholder='Enter caption... (optional)'
                        maxLength={30}
                    />
                </div>
            </div>
        </Slide>
    );
}
