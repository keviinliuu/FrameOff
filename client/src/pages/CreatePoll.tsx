import FileUpload from '../components/FileUpload';

import { useState, FormEvent } from 'react';
import axios from 'axios';

export interface ImageData {
    url: string;
    caption?: string;
    votes?: number;
}

export interface SlideData {
    slideTitle?: string;
    slideDescription?: string;
    imageOne: ImageData;
    imageTwo: ImageData;
}

function CreateSlide() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageOne, setImageOne] = useState<File>();
    const [imageTwo, setImageTwo] = useState<File>();
    
    return (
        <div className='flex flex-col gap-y-4'>
            <div className='flex gap-x-4'>
                <FileUpload image={imageOne} onChange={(image: File) => setImageOne(image)}/>
                <FileUpload image={imageTwo} onChange={(image: File) => setImageTwo(image)}/>
            </div>
        </div>
    )
}

export default function CreatePoll() {
    const slides: {
        display: JSX.Element;
        data: SlideData;
    }[] = [];

    const handleSubmit = () => {
        console.log('submitted, for now.');
    };

    return (
        <div className='flex flex-col gap-y-4 items-center'>
            <form
                className='flex flex-col gap-y-8 h-full items-center'
                onSubmit={handleSubmit}
                encType='multipart/form-data'>
                <div className='flex gap-x-8 h-full'>{slides.map(slide => slide.display)}</div>
                <button>Create Poll</button>
            </form>
            <button onClick={addSlide}>Add Slide</button>
        </div>
    );
}
