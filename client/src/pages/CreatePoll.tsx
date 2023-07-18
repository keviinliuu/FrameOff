import FileUpload from '../components/FileUpload';

import { useState, FormEvent } from 'react';

export default function CreatePoll() {
    const [image, setImage] = useState<File>();
    const handleImage = (image: File) => setImage(image);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) return;
        const imageData = new FormData(e.currentTarget);
        console.log(imageData);
    };

    return (
        <form
            className='flex flex-col gap-y-8 h-full'
            onSubmit={handleSubmit}
            encType='multipart/form-data'>
            <FileUpload image={image} onChange={handleImage} />
            <button>Create Poll</button>
        </form>
    );
}
