import { ImageData, VotedEnum } from '../data/types';
import Slide from './Slide';
import VoteImage from './VoteImage';

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
            <div className='flex justify-between'>
                <div className='flex flex-col gap-y-4 items-center'>
                    <VoteImage imgUrl={imageOne.url as string} voteEnum={ VotedEnum.IMAGE1 } onVote = {s => console.log(s + "image 1")} />
                    {imageOne.caption && <div className='text-sm'>{imageOne.caption}</div>}
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <VoteImage imgUrl={imageTwo.url as string} voteEnum={ VotedEnum.IMAGE2 } onVote = {s => console.log(s + "image 2")} />
                    {imageTwo.caption && <div className='text-sm'>{imageTwo.caption}</div>}
                </div>
            </div>
        </Slide>
    );
}
