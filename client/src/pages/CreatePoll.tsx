import FileUpload from '../components/FileUpload';

import { ChangeEvent } from 'react';

import { useSlideStore } from '../stores/useSlideStore';

export interface SlideProps {
    handleTitle(e: ChangeEvent<HTMLInputElement>): void;
    handleDescription(e: ChangeEvent<HTMLInputElement>): void;
    imageOne: File;
    handleImageOne(): void;
    imageTwo: File;
    handleImageTwo(): void;
}

function Slide({
    handleTitle,
    handleDescription,
    imageOne,
    handleImageOne,
    imageTwo,
    handleImageTwo,
}: SlideProps) {
    return (
        <div className='flex flex-col gap-y-4'>
            <input onChange={handleTitle} placeholder='Enter a title...' />
            <input onChange={handleDescription} placeholder='Enter a description...' />
            <div className='flex gap-x-4'>
                <FileUpload image={imageOne} onChange={handleImageOne} />
                <FileUpload image={imageTwo} onChange={handleImageTwo} />
            </div>
        </div>
    );
}

export default function CreatePoll() {
    const handleSubmit = () => {
        console.log('submitted, for now.');
    };

    useSlideStore(state => state.loadSlides());

    return (
        <div className='flex flex-col gap-y-4 items-center'>
            <form
                className='flex flex-col gap-y-8 h-full items-center'
                onSubmit={handleSubmit}
                encType='multipart/form-data'>
                <div className='flex gap-x-8 h-full'></div>
                <button>Create Poll</button>
            </form>
            <button>Add Slide</button>
        </div>
    );
}
