import { ImageData } from '../data/types';
import Slide from './Slide';

export interface SlideViewProps {
    title: string | undefined;
    description: string | undefined;
    imageOne: ImageData;
    imageTwo: ImageData;
}

export default function SlideView({ title, description, imageOne, imageTwo }: SlideViewProps) {
    return (
        <Slide>
            {title && <div className='text-lg'>{title}</div>}
            {description && <div className='text-sm'>{description}</div>}
            <div className='flex gap-x-8'>
                <div className='flex flex-col gap-y-4'>
                    <img src={imageOne.url} className='aspect-square w-96' />
                    {imageOne.caption && <div className='text-sm'>{imageOne.caption}</div>}
                </div>
                <div className='flex flex-col gap-y-4'>
                    <img src={imageTwo.url} className='aspect-square w-96' />
                    {imageTwo.caption && <div className='text-sm'>{imageTwo.caption}</div>}
                </div>
            </div>
        </Slide>
    );
}
