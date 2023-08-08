import { ChangeEvent } from 'react';
import Slide from './Slide';
import FileUpload from './FileUpload';

type CE = ChangeEvent<HTMLInputElement>;

export interface SlideEditProps {
    handleTitle: (e: CE) => void;
    handleDescription: (e: CE) => void;
    imageOne: File | undefined;
    handleImageOne: (image: File) => void;
    handleImageOneCaption: (e: CE) => void;
    imageTwo: File | undefined;
    handleImageTwo: (image: File) => void;
    handleImageTwoCaption: (e: CE) => void;
}

export default function SlideEdit({
    handleTitle,
    handleDescription,
    imageOne,
    handleImageOne,
    handleImageOneCaption,
    imageTwo,
    handleImageTwo,
    handleImageTwoCaption,
}: SlideEditProps) {
    return (
        <Slide>
            <input onChange={handleTitle} placeholder='Enter a title...' />
            <input onChange={handleDescription} placeholder='Enter a description...' />
            <div className='flex gap-x-8'>
                <div className='aspect-square w-96'>
                    <FileUpload image={imageOne} onChange={handleImageOne} />
                    <input onChange={handleImageOneCaption} />
                </div>
                <div className='text-xs'>VS</div>
                <div className='aspect-square w-96'>
                    <FileUpload image={imageTwo} onChange={handleImageTwo} />
                    <input onChange={handleImageTwoCaption} />
                </div>
            </div>
        </Slide>
    );
}
