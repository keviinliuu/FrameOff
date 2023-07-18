import FileUpload from '../components/FileUpload';

import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function CreatePoll() {
    const [image, setImage] = useState<File>();
    // const [imageMessage, setImageMessage] = useState<string>();
    const handleImage = (image: File) => setImage(image);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) return;
        const imageData = new FormData(e.currentTarget);
        await axios
            .post('/uploadimage', imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => console.log(res));
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
