import Slide from './Slide';
import FileUpload from './FileUpload';
import { CE } from '../data/types';
import { useEffect, useState } from 'react';
import { useSlideStore } from '../stores/useSlideStore';

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
        'placeholder:text-center text-center text-blush placeholder:text-plum bg-transparent border border-transparent focus:outline-none focus:border-transparent';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Need to only subscribe one upon mount.
        [],
    );
    return (
        <Slide>
            <input
                className={`w-1/3 ${commonInputClass}`}
                onChange={handleTitle}
                placeholder='Slide Title (optional)'
            />
            {/* <input
                className='text-sm w-1/3 placeholder:text-center text-center'
                onChange={handleDescription}
                placeholder='Enter a description...'
            /> */}
            <div className='flex gap-x-24 justify-between items-center'>
                <div className='flex flex-col gap-y-4 items-center'>
                    <div className='aspect-square w-96'>
                        <FileUpload image={imageOne} onChange={handleImageOne} />
                    </div>
                    <input
                        className={`text-sm' ${commonInputClass}`}
                        onChange={handleImageOneCaption}
                        placeholder='Caption (optional)'
                    />
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <div className='flex text-xs items-center text-blush'>VS</div>
                    <input className={`${commonInputClass} invisible`} />
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <div className='aspect-square w-96'>
                        <FileUpload image={imageTwo} onChange={handleImageTwo} />
                    </div>
                    <input
                        className={`text-sm' ${commonInputClass}`}
                        onChange={handleImageTwoCaption}
                        placeholder='Caption (optional)'
                    />
                </div>
            </div>
        </Slide>
    );
}
